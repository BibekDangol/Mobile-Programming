
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getDatabase, ref, set, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB6dK5_5moIOoNxPijBW74ZCiUum6pYlgg",
    authDomain: "week6-21f15.firebaseapp.com",
    projectId: "week6-21f15",
    storageBucket: "week6-21f15.firebasestorage.app",
    messagingSenderId: "496904444902",
    appId: "1:496904444902:web:3500c7ecf0f63fddf15427"
  };

  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    console.log(db);

document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;

  if (!name || !email) {
    alert("Please fill all fields");
    return;
  }

  const usersRef = ref(db, "users");
  const newUser = push(usersRef);

  set(newUser, { name, email });

  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput").value = "";
});


const usersRef = ref(db, "users");

onValue(usersRef, (snapshot) => {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  const data = snapshot.val();

  if (!data) return;

  Object.keys(data).forEach((id) => {
    const user = data[id];

    tableBody.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="editUser('${id}', '${user.name}', '${user.email}')">Edit</button>
          <button onclick="deleteUser('${id}')">Delete</button>
        </td>
      </tr>
    `;
  });
});

window.editUser = function(id, name, email) {
  const newName = prompt("Edit Name:", name);
  const newEmail = prompt("Edit Email:", email);

  if (newName && newEmail) {
    update(ref(db, "users/" + id), {
      name: newName,
      email: newEmail
    });
  }
};

window.deleteUser = function(id) {
  if (confirm("Are you sure?")) {
    remove(ref(db, "users/" + id));
  }
};
