
var hotbar = document.getElementById("hotbar");
hotbar.style.left = (right_x - left_x) * .5;
hotbar.style.bottom = 3 * top_y ;

var shoot_button = document.getElementById("shoot");
shoot_button.addEventListener ("click", function(){can1.fire_cannon();});




// IGNORE HERE DOWN

// BUTTONS

// var hotbar = document.createElement("div");
// hotbar.setAttribute("class", "w3-bar w3-black");
// hotbar.setAttribute("id", "hotbar");
// hotbar.style.background = "red";
// hotbar.style.marginLeft = "20px";
// hotbar.style.marginTop = "20px";

// var button_shoot = document.createElement("div");
// button_shoot.setAttribute("class", "w3-bar-item w3-hover-red");
// button_shoot.setAttribute("id", "shoot");
// button_shoot.innerHTML("shoot");
// hotbar.appendChild(button_shoot);

// var button_repair = document.createElement("div");
// button_repair.setAttribute("id", "w3-bar-item w3-hover-red");
// button_repair.setAttribute("id", "repair");
// button_repair.innerHTML("repair");
// hotbar.appendChild(button_repair);

// var button_abandon = document.createElement("div");
// button_abandon.setAttribute("id", "w3-bar-item w3-hover-red");
// button_repair.setAttribute("id", "abandon");
// button_abandon.innerHTML("abandon");
// hotbar.appendChild(button_abandon);


// var button = document.createElement("button");
// button.innerHTML = "Do Something";
// button.style.marginTop = "20px";
// button.style.lineHeight = "60px";
// button.style.fontWeight = "bold";
// button.style.padding = "0 40px";
// button.style.background = "salmon";
// button.style.border = "none";
// button.style.position = "absolute";

// var body = document.getElementsByTagName("body")[0];
// body.appendChild(button);

// 3. Add event handler
// button.addEventListener ("click", function() {
//   alert("did something");
// });


// var div = document.createElement("div");
// div.style.width = "100px";
// div.style.height = "100px";
// div.style.background = "red";
// div.style.color = "white";
// div.innerHTML = "Hello";

// document.getElementById("main").appendChild(div);
// <body>
// <div id="main"></div>
// </body>
