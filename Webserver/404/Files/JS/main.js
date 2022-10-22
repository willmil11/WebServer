console.info("[JS] Js loaded !");

document.body.style.backgroundColor = "rgb(0, 255, 240)"

let button = document.getElementById("main_pagebtn");
let cropbox = document.getElementById("cropbox");

cropbox.style.backgroundColor = "white";
cropbox.style.borderRadius = "15%"
cropbox.style.width = "400px";

button.style.backgroundColor = "black";
button.style.color = "white";
button.style.border = "none"

button.onmouseover = function(){
button.style.background.color = "rgb(255, 85, 85)"
}

button.onmouseleave = function(){
button.style.background.color = "black";
}

button.onclick = function(){
    location.reload();
}