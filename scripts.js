// 1. Changing Image
function changeImage() {
    const img = document.getElementById("myImage");
    img.src = "asdas.jpg";
    img.alt = "New Image";
}

// 2. Changing Background
function changeBackground() {
    const div = document.getElementById("myDiv");
    div.style.backgroundColor = "lightblue";
    document.getElementById("demo").style.display = "block";
}

// 3. Control Statements
function toggleParagraph() {
    const dem = document.getElementById("demo5");
    
    if (dem.style.display === "none" || dem.style.display === "") {
        dem.style.display = "block"; 
    } else {
        dem.style.display = "none";  
    }
}

// 4. Variable and Operators
function calculate(){
    let x = 5;
    let y = 6;
    let z = x + y;
    // return z;
    document.getElementById("demo6").innerHTML = "The result is: " + z;
}
// window.calculate = calculate;
