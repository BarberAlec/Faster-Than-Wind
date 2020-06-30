

class cannon_friend{
    constructor(v){
        this.margin = v;
        this.cannon_button = document.createElement("cannon");
        this.cannon_button.innerHTML = '<img src="../assets/img/cannon.png" width="180"/>';
        this.body = document.getElementsByTagName("body")[0];

        this.body.appendChild(this.cannon_button);
        this.cannon_button.style.border = "none";
        this.cannon_button.style.position = "absolute";
        this.cannon_button.style.marginLeft = '38%';
        this.cannon_button.style.marginTop = this.margin;
    }
    _makecannon_ball(topMargin,leftMargin){
        var ball = document.createElement("cannon_ball");
        ball.innerHTML = '<img src="../assets/img/cannon_ball.png" width="25"/>';
    
        this.body.appendChild(ball);
        ball.style.border = "none";
        ball.style.position = "absolute";
        ball.style.marginLeft = leftMargin;
        ball.style.marginTop = topMargin;
        return ball
    }

    fire_cannon(){
        this.ball = this._makecannon_ball('20%','48%')
        this.pos = 0;
        var t = this;
        this.id = setInterval(function(){t._frame();}, 5);
    }

    _frame_attack(){
        if (this.pos_att == 195) {
            clearInterval(this.id_att);
            this.ball_attack.parentNode.removeChild(this.ball_attack)
        }
        else{
            this.pos_att++;
            this.ball_attack.style.left = this.pos_att + "px";
            this.ball_attack.style.top = this.pos_att + "px"; 
        }
    }

    _frame() {
        if (this.pos > 370) {
            clearInterval(this.id);
            this.ball.parentNode.removeChild(this.ball)
            this.ball_attack = this._makecannon_ball('3%','70%')
            this.pos_att = 0;
            var t = this;
            this.id_att = setInterval(function(){t._frame_attack()}, 5);
        }
        else{
            this.pos = this.pos + 1.41;
            this.ball.style.left = this.pos + "px";
        }
    }
}

class ship_friend{
    constructor(){
        this._draw();
    }
    _draw(){
        var base_image = new Image();
        base_image.src = '../assets/img/small_boat_rot.png';
        base_image.onload = function () {
            ctx.drawImage(base_image, left_x, top_y, right_x - left_x-(right_x - left_x) * enemy_border_percent_x, bottom_y - top_y);
        }
    }
}

class ship_enemy{
    constructor(){
        this._draw()
    }
    _draw(){
        var base_image = new Image();
        base_image.src = '../assets/img/small_boat.png';
        base_image.onload = function () {
            ctx.drawImage(base_image, right_x, top_y, -(right_x - left_x) * enemy_border_percent_x,
            (bottom_y - top_y) * enemy_border_percent_y);
        }
    }
}

