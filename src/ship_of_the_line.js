

class cannon_friend{
    constructor(v, comparment_num=0){
        this.cooldown_time = 2000;
        this.can_fire = true;
        this.compatment = comparment_num;
        this._draw(v);
        this.currently_selected = false;
        this.current_target = -1;
    }

    click(){
        if(this.currently_selected)
        {
            // Unselect
            this.unselect();
        }
        else
        {
            // if other cannon is already selected, then unselect that cannon
            // we do this by unselecting all cannons and then selecting this one again
            ship_friend.can1.unselect();
            ship_friend.can2.unselect();

            // Make selected
            this.select();
        }
    }

    set_target(target)
    {
        this.current_target = target;
    }
    remove_target()
    {
        this.current_target = -1;
    }

    select()
    {
        this.cannon_button.style.border = "4px groove red";
        this.currently_selected = true;
    }

    unselect()
    {
        this.cannon_button.style.border = "";
        this.currently_selected = false;
    }

    _draw(v){
        this.cannon_button = document.createElement("cannon");
        this.cannon_button.innerHTML = '<img src="../assets/img/cannon.png" width="180"/>';
        this.body = document.getElementsByTagName("body")[0];
        this.body.appendChild(this.cannon_button);
        this.cannon_button.style.position = "absolute";
        this.cannon_button.style.marginLeft = '38%';
        this.cannon_button.style.marginTop = v;

        // click on cannon stuff
        var t=this;
        this.cannon_button.addEventListener ("click", function(){t.click();});
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

    fire_cannon(trgt_sct=1){
        if (!this.can_fire || this.current_target == -1){
            return;
        }
        else{
            // Take cannon offline for a time.
            this.can_fire = false;
            var t = this;
            this.cannon_timeout_id = setInterval(function(){t._reset_cannon_timeout();}, this.cooldown_time);
        }
        // Cannonball spawn depends on which compartment cannon is in
        if (this.compatment == 0){
            this.ball = this._makecannon_ball('20%','48%');
        }
        else if (this.compatment == 1){
            this.ball = this._makecannon_ball('26%','48%');
        }
        
        this.pos = 0;
        var t = this;
        // this.target = this.current_target;
        this.id = setInterval(function(){t._frame();}, 5);
    }

    _reset_cannon_timeout(){
        clearInterval(this.cannon_timeout_id);
        this.can_fire = true;
    }

    explosion_func(posX,posY){
        this.explosion = document.createElement("explosion");
        this.explosion.innerHTML = '<img src="../assets/img/explosion.gif" />';

        this.body.appendChild(this.explosion);
        this.explosion.style.border = "none";
        this.explosion.style.position = "absolute";
        this.explosion.style.marginLeft = posX;
        this.explosion.style.marginTop = posY;

        // After 0.78 seconds, kill gif element
        var t = this;
        this.id_explos = setInterval(function(){t._kill_explosion();}, 780);
    }

    _kill_explosion(){
        clearInterval(this.id_explos);
        this.explosion.parentNode.removeChild(this.explosion)
    }

    _frame_attack_0(miss=false){
        if (miss)
        {
            var travel_thresh = 500;
        }
        else
        {
            var travel_thresh = 195;
        }
        if (this.pos_att == travel_thresh) {
            clearInterval(this.id_att);
            this.ball_attack.parentNode.removeChild(this.ball_attack);
            if (!miss)
            {
                this.explosion_func('78%',"180");
            }
        }
        else{
            this.pos_att++;
            this.ball_attack.style.left = this.pos_att + "px";
            this.ball_attack.style.top = this.pos_att + "px"; 
        }
    }

    _frame_attack_1(miss=false){
        if (miss)
        {
            var travel_thresh = 550;
        }
        else
        {
            var travel_thresh = 195;
        }
        if (this.pos_att >= travel_thresh) {
            clearInterval(this.id_att);
            this.ball_attack.parentNode.removeChild(this.ball_attack);
            if (!miss)
            {
                this.explosion_func('83%',"200");
            }
        }
        else{
            this.pos_att = this.pos_att + 1.41;
            this.ball_attack.style.right = this.pos_att + "px";
        }
    }

    _frame_attack_2(miss=false){
        if (miss)
        {
            var travel_thresh = -480;
        }
        else
        {
            var travel_thresh = -240;
        }
        if (this.pos_att <= travel_thresh) {
            clearInterval(this.id_att);
            this.ball_attack.parentNode.removeChild(this.ball_attack);
            if (!miss)
            {
                this.explosion_func('80.5%',"350");
            }
        }
        else{
            this.pos_att--;
            this.ball_attack.style.left = this.pos_att + "px";
            this.ball_attack.style.top = this.pos_att + "px"; 
        }
    }

    _frame() {
        if (this.pos > 370) {
            clearInterval(this.id);
            this.ball.parentNode.removeChild(this.ball);
            this.pos_att = 0;
            var t = this;

            // Check if hit or miss. 80% chance to hit
            var miss = (Math.floor((Math.random() * 100) + 1)>=80);

            if (this.current_target == 0)
            {
                this.ball_attack = this._makecannon_ball('3%','70%');
                this.id_att = setInterval(function(){t._frame_attack_0(miss)}, 5);
            }
            else if (this.current_target == 1)
            {
                // Define where the conn ball spawns and call appropiate motion vector function
                this.ball_attack = this._makecannon_ball('12%','95.5%');
                this.id_att = setInterval(function(){t._frame_attack_1(miss)}, 5);
            }
            else if (this.current_target == 2)
            {
                this.ball_attack = this._makecannon_ball('33%','95%');
                this.id_att = setInterval(function(){t._frame_attack_2(miss)}, 5);
            }
            }
        else{
            this.pos = this.pos + 1.41;
            this.ball.style.left = this.pos + "px";
        }
    }
}

class cannon_enemy{
    // Not fixed fully yet!!
    constructor(v, comparment_num=0){
        this.cooldown_time = 2000;
        this.can_fire = true;
        this.compatment = comparment_num;
        this.cannon_button = document.createElement("cannon");
        this.cannon_button.innerHTML = '<img src="../assets/img/cannon_rot.png" height="115"/>';
        this.body = document.getElementsByTagName("body")[0];

        this.body.appendChild(this.cannon_button);
        this.cannon_button.style.border = "none";
        this.cannon_button.style.position = "absolute";
        this.cannon_button.style.marginLeft = v;
        this.cannon_button.style.marginTop = "12%";

        // click on cannon stuff
        this.is_targeted_1 = false;
        this.is_targeted_2 = false;
        var t=this;
        this.cannon_button.addEventListener ("click", function(){t.clicked();});
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

    clicked()
    {
        if (ship_friend.can1.currently_selected)
        {
            

            this.is_targeted_1 = !this.is_targeted_1;
            if (this.is_targeted_1)
            {  
                // Tell cannon 1 that they are aiming at us
                ship_friend.can1.set_target(this.compatment);

                // Draw target
                this.target_1 = document.createElement("crosshair");
                this.target_1.innerHTML = '<img src="../assets/img/crosshair.png" height="60"/>';
                this.body.appendChild(this.target_1);
                this.target_1.style.border = "none";
                this.target_1.style.position = "absolute";
                this.target_1.style.marginLeft = this.cannon_button.style.marginLeft;
                this.target_1.style.marginTop = "12%";
                var t=this;
                this.target_1.addEventListener ("click", function(){t.clicked();});

            }
            else
            {
                // get rid of target 
                ship_friend.can1.remove_target();
                // Undraw target
                this.target_1.parentNode.removeChild(this.target_1);
            }
        }
        if(ship_friend.can2.currently_selected)
        {
            

            this.is_targeted_2 = !this.is_targeted_2;
            if (this.is_targeted_2)
            {
                // Tell cannon 2 that they are aiming at us
                ship_friend.can2.set_target(this.compatment);

                // Draw target
                this.target_2 = document.createElement("crosshair");
                this.target_2.innerHTML = '<img src="../assets/img/crosshair.png" height="60"/>';
                this.body.appendChild(this.target_2);
                this.target_2.style.border = "none";
                this.target_2.style.position = "absolute";
                this.target_2.style.marginLeft = this.cannon_button.style.marginLeft;
                this.target_2.style.marginTop = "13%";
                
                var t=this;
                this.target_2.addEventListener ("click", function(){t.clicked();});
            }
            else
            {
                // get rid of target 
                ship_friend.can2.remove_target();
                this.target_2.parentNode.removeChild(this.target_2);
            }
        }
    }

    fire_cannon(trgt_sct=1){
        if (!this.can_fire){
            return;
        }
        else{
            // Take cannon offline for a time.
            this.can_fire = false;
            var t = this;
            this.cannon_timeout_id = setInterval(function(){t._reset_cannon_timeout();}, this.cooldown_time);
        }
        // Cannonball spawn depends on which compartment cannon is in
        if (this.compatment == 0){
            this.ball = this._makecannon_ball('11%','80%');
        }
        else if (this.compatment == 1){
            this.ball = this._makecannon_ball('11%','83%');
        }
        
        this.pos = 0;
        var t = this;
        this.target = trgt_sct;
        this.id = setInterval(function(){t._frame();}, 5);
    }

    _reset_cannon_timeout(){
        clearInterval(this.cannon_timeout_id);
        this.can_fire = true;
    }

    explosion_func(posX,posY){
        this.explosion = document.createElement("explosion");
        this.explosion.innerHTML = '<img src="../assets/img/explosion.gif" width=130 />';

        this.body.appendChild(this.explosion);
        this.explosion.style.border = "none";
        this.explosion.style.position = "absolute";
        this.explosion.style.marginLeft = posX;
        this.explosion.style.marginTop = posY;

        // After 0.78 seconds, kill gif element
        var t = this;
        this.id_explos = setInterval(function(){t._kill_explosion();}, 780);
    }

    _kill_explosion(){
        clearInterval(this.id_explos);
        this.explosion.parentNode.removeChild(this.explosion)
    }

    _frame_attack_0(miss=false){
        if (miss)
        {
            var travel_thresh = 800;
        }
        else
        {
            var travel_thresh = 300;
        }
        if (this.pos_att >= travel_thresh) {
            clearInterval(this.id_att);
            this.ball_attack.parentNode.removeChild(this.ball_attack);
            if (!miss)
            {
                this.explosion_func('42%',"300");
            }
        }
        else{
            this.pos_att = this.pos_att + 1.41;
            this.ball_attack.style.top = this.pos_att + "px"; 
        }
    }

    _frame_attack_1(miss=false){
        if (miss)
        {
            var travel_thresh = 550;
        }
        else
        {
            var travel_thresh = 195;
        }
        if (this.pos_att <= travel_thresh) {
            clearInterval(this.id_att);
            this.ball_attack.parentNode.removeChild(this.ball_attack);
            if (!miss)
            {
                this.explosion_func('83%',"200");
            }
        }
        else{
            this.pos_att = this.pos_att - 1;
            this.ball_attack.style.left = this.pos_att;
        }
    }

    _frame_attack_2(miss=false){
        if (miss)
        {
            var travel_thresh = -480;
        }
        else
        {
            var travel_thresh = -240;
        }
        if (this.pos_att <= travel_thresh) {
            clearInterval(this.id_att);
            this.ball_attack.parentNode.removeChild(this.ball_attack);
            if (!miss)
            {
                this.explosion_func('80.5%',"350");
            }
        }
        else{
            this.pos_att--;
            this.ball_attack.style.left = this.pos_att + "px";
            this.ball_attack.style.top = this.pos_att + "px"; 
        }
    }

    _frame() {
        if (this.pos < -180) {
            clearInterval(this.id);
            this.ball.parentNode.removeChild(this.ball);
            this.pos_att = 0;
            var t = this;

            // Check if hit or miss. 80% chance to hit
            var miss = (Math.floor((Math.random() * 100) + 1)>=80);

            if (this.target == 0)
            {
                this.ball_attack = this._makecannon_ball('3%','45%');
                this.id_att = setInterval(function(){t._frame_attack_0(miss)}, 5);
            }
            else if (this.target == 1)
            {
                // Define where the conn ball spawns and call appropiate motion vector function
                this.ball_attack = this._makecannon_ball('26%','66.5%');
                //this._makecannon_ball('400','1280');
                this.pos_att = '1280';
                this.id_att = setInterval(function(){t._frame_attack_1(miss)}, 5);
            }
            else if (this.target == 2)
            {
                this.ball_attack = this._makecannon_ball('33%','95%');
                this.id_att = setInterval(function(){t._frame_attack_2(miss)}, 5);
            }
            }
        else{
            this.pos = this.pos - 1.41;
            this.ball.style.top = this.pos + "px";
        }
    }
}


class ship_friend{
    constructor(){
        this._draw();
        this.can1 = new cannon_friend('18%',0);
        this.can2 = new cannon_friend('25%',1); 
    }
    _draw(){
        var ship_img = document.createElement('img'); 
        ship_img.style.left = left_x;
        ship_img.style.top = top_y;
        ship_img.style.height = game_height;
        ship_img.style.width = game_width - game_width * enemy_border_percent_x; 
        ship_img.style.position = 'absolute';
        ship_img.src = '../assets/img/small_boat_rot.png';
        document.getElementById('body').appendChild(ship_img); 
    }
    fire_cannons(){
        this.can1.fire_cannon(0);
        this.can2.fire_cannon(1);
    }
}


class ship_enemy{
    constructor(){
        this._draw();
        this.can1 = new cannon_enemy("82.5%",0);
        this.can2 = new cannon_enemy("79%",1);
    }
    _draw() {
        var ship_img = document.createElement('img'); 
        ship_img.style.left = right_x - (game_width*enemy_border_percent_x);
        ship_img.style.top = top_y;
        ship_img.style.height = top_y + (game_height * enemy_border_percent_y);
        ship_img.style.width = game_width * enemy_border_percent_x; 
        ship_img.style.position = 'absolute';
        ship_img.src = '../assets/img/small_boat.png';
        document.getElementById('body').appendChild(ship_img); 
    }

    fire_cannons(){
        //this.can1.fire_cannon(0);
        this.can2.fire_cannon(1);
    }
}

