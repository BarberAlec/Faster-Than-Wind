// This file draws some ships

make_our_ship();
make_enemy_ship();
make_cannon('19%');
make_cannon('26%');

// fire_cannon()

// can1 = new my_cannon('18%');
// can2 = new my_cannon('25%');
// can1.draw();
// can2.draw();

function make_our_ship() {
    base_image_rot = new Image();
    base_image_rot.src = '../assets/img/small_boat_rot.png';
    base_image_rot.onload = function () {
        ctx.drawImage(base_image_rot, left_x, top_y, right_x - left_x-(right_x - left_x) * enemy_border_percent_x, bottom_y - top_y);
    }
}

function make_enemy_ship() {
    base_image = new Image();
    base_image.src = '../assets/img/small_boat.png';
    base_image.onload = function () {
        ctx.drawImage(base_image, right_x, top_y, -(right_x - left_x) * enemy_border_percent_x,
            (bottom_y - top_y) * enemy_border_percent_y);
    }
}

function make_cannon(topMargin) {
    var cannon_button = document.createElement("cannon");
    cannon_button.innerHTML = '<img src="../assets/img/cannon.png" width="180"/>';

    //cannon_button = '../assets/img/small_cannon.png';
    var body = document.getElementsByTagName("body")[0];

    body.appendChild(cannon_button);
    cannon_button.style.border = "none";
    cannon_button.style.position = "absolute";
    cannon_button.style.marginLeft = '38%';
    cannon_button.style.marginTop = topMargin;
}   

function makecannon_ball(topMargin,leftMargin){
    var ball = document.createElement("cannon_ball");
    ball.innerHTML = '<img src="../assets/img/cannon_ball.png" width="25"/>';

    var body = document.getElementsByTagName("body")[0];

    body.appendChild(ball);
    ball.style.border = "none";
    ball.style.position = "absolute";
    ball.style.marginLeft = leftMargin;
    ball.style.marginTop = topMargin;
    return ball
}

function fire_cannon(){
    ball = makecannon_ball('20%','48%')
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (pos > 370) {
            clearInterval(id);
            ball.parentNode.removeChild(ball)
            ball_attack = makecannon_ball('3%','70%')
            var pos_att = 0;
            var id_att = setInterval(frame_attack, 5);
            function frame_attack(){
                if (pos_att == 195) {
                    clearInterval(id_att);
                    ball_attack.parentNode.removeChild(ball_attack)
                }
                else{
                    pos_att++;
                    ball_attack.style.left = pos_att + "px";
                    ball_attack.style.top = pos_att + "px"; 
                }
            }

        }
        else{
            pos = pos + 1.41; 
            //ball.style.top = pos + "px"; 
            ball.style.left = pos + "px"; 
        }
    }
}

// class my_cannon{
//     constructor(v){
//         this.margin = v;
//     }
//     draw(){
//         var cannon_button = document.createElement("cannon");
//         cannon_button.innerHTML = '<img src="../assets/img/small_cannon.png" width="130"/>';
//         var body = document.getElementsByTagName("body")[0];

//         body.appendChild(cannon_button);
//         cannon_button.style.border = "none";
//         cannon_button.style.position = "absolute";
//         cannon_button.style.marginLeft = '40%';
//         cannon_button.style.marginTop = this.margin;
//     }
    

// }