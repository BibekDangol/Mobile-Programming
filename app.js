// Travel Nepal - App Logic
// Redesigned for Wireframe Compliance

import { db, ref, set } from './firebase.js';

const STORAGE_KEY = 'travel_nepal_user';

const app = {
    // Global State
    map: null,
    videoStream: null,
    // ... existing init ...

    init: () => {
        // Elements
        app.screens = {
            signin: document.getElementById('signin-screen'),
            signup: document.getElementById('signup-screen'),
            main: document.getElementById('main-app')
        };

        // Check Login
        const user = localStorage.getItem(STORAGE_KEY);
        if (user) {
            app.showMain(JSON.parse(user));
        } else {
            // Ensure sign in is active
            app.screens.signin.classList.add('active');
        }

        // Event Listeners
        document.getElementById('login-form').addEventListener('submit', app.handleLogin);
        document.getElementById('signup-form').addEventListener('submit', app.handleSignup);
        document.getElementById('logout-btn').addEventListener('click', app.handleLogout);
        const saveBtn = document.getElementById('save-profile-btn');
        if (saveBtn) saveBtn.addEventListener('click', app.saveProfile);
    },

    toggleAuth: (target) => {
        // Simple slide transition
        if (target === 'signup') {
            app.screens.signin.classList.remove('active');
            app.screens.signin.classList.add('hidden-left');

            app.screens.signup.classList.remove('hidden-right');
            app.screens.signup.classList.add('active');
        } else {
            app.screens.signup.classList.remove('active');
            app.screens.signup.classList.add('hidden-right');

            app.screens.signin.classList.remove('hidden-left');
            app.screens.signin.classList.add('active');
        }
    },

    handleLogin: (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        if (email) {
            const user = { email, name: email.split('@')[0] };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            app.showMain(user);
        }
    },

    handleSignup: (e) => {
        e.preventDefault();

        const form = document.getElementById('signup-form');
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (!email || !password) {
            alert("Please text inputs");
            return;
        }

        // Sanitize email for DB path (replace . with , or similar)
        const userId = email.replace(/\./g, ',');

        // Write to Realtime Database
        set(ref(db, 'users/' + userId), {
            email: email,
            password: password, // Storing as requested
            joinedAt: new Date().toISOString()
        })
            .then(() => {
                alert("Account Created & Saved to Database!");
                // Proceed to Login/Main
                const user = { email, name: 'New User' };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
                app.showMain(user);
            })
            .catch((error) => {
                console.error("DB Error:", error);
                alert("Error saving data: " + error.message);
            });
    },

    saveProfile: () => {
        const name = document.getElementById('profile-name').value;
        const email = document.getElementById('profile-email').value;
        const phone = document.getElementById('profile-phone').value;

        if (name && email) {
            const user = { name, email, phone };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            alert("Profile Saved!");
        } else {
            alert("Name and Email are required.");
        }
    },

    handleLogout: () => {
        localStorage.removeItem(STORAGE_KEY);
        // Clean up
        app.stopCamera();
        window.location.reload();
    },

    showMain: (user) => {
        // Populate specific fields
        document.getElementById('profile-name').value = user.name || '';
        document.getElementById('profile-email').value = user.email || '';
        document.getElementById('profile-phone').value = user.phone || '';

        // Hide Auth
        app.screens.signin.classList.remove('active');
        app.screens.signup.classList.remove('active');

        // Show Main
        app.screens.main.classList.remove('hidden-right');
        app.screens.main.classList.add('active');
    },

    switchTab: (tabName) => {
        // 1. Update Icons
        const navItems = document.querySelectorAll('.nav-item');
        // Map tab names to nav index: home=0, camera=1, explore=2, profile=3
        const map = { 'home': 0, 'camera': 1, 'explore': 2, 'profile': 3 };

        navItems.forEach(el => el.classList.remove('active'));
        if (navItems[map[tabName]]) navItems[map[tabName]].classList.add('active');

        // 2. Logic Triggers (Camera/Map)
        if (tabName === 'camera') {
            app.startCamera();
        } else {
            app.stopCamera();
        }

        // 3. Update Content
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(t => t.style.display = 'none');

        let targetId = `tab-${tabName}`;
        if (tabName === 'explore') targetId = 'tab-map';

        const target = document.getElementById(targetId);
        if (target) {
            target.style.display = 'block';
        }

        // 4. Map Handling
        if (tabName === 'explore') {
            if (target) target.style.height = '100vh';
            // Wait for display transition to finish before initializing/resizing map
            setTimeout(() => {
                app.initMap();
                if (app.map) {
                    app.map.invalidateSize(); // Force redraw
                }
            }, 300); // Increased delay to ensure container size is stable
        }

    },

    // --- FEATURE: CAMERA ---
    startCamera: async () => {
        const video = document.getElementById('camera-feed');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                app.videoStream = stream;
                video.srcObject = stream;
            } catch (err) {
                console.error("Camera Error:", err);
                alert("Could not access camera. Please allow permissions.");
            }
        }
    },

    stopCamera: () => {
        if (app.videoStream) {
            app.videoStream.getTracks().forEach(track => track.stop());
            app.videoStream = null;
        }
    },

    takePhoto: () => {
        const video = document.getElementById('camera-feed');
        if (!app.videoStream) return;

        // Flash animation
        video.style.opacity = 0;
        setTimeout(() => video.style.opacity = 1, 100);
        alert("Photo captured! (Mock)");
    },

    // --- FEATURE: MAP ---
    initMap: () => {
        if (!app.map) {
            // Kathmandu Coordinates: 27.7172, 85.3240
            app.map = L.map('map-container').setView([27.7172, 85.3240], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(app.map);

            // Add Markers
            L.marker([27.7172, 85.3240]).addTo(app.map).bindPopup('Kathmandu').openPopup();
            L.marker([28.2096, 83.9856]).addTo(app.map).bindPopup('Pokhara');
        } else {
            app.map.invalidateSize(); // Fix gray tiles issue on tab switch
        }
    }
};

// Expose to window for HTML onclicks
window.app = app;
document.addEventListener('DOMContentLoaded', app.init);
