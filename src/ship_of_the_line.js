
draw_ship(ctx,50,50,100,100)

make_base();

function make_base()
{
  base_image = new Image();
  base_image.src = '../assets/small_boat.png';
  base_image.onload = function(){
    ctx.drawImage(base_image, 0, 0);
  }
}

function draw_ship(context, cx, cy, rx, ry){
    context.save(); // save state
    context.beginPath();

    context.translate(cx-rx, cy-ry);
    context.scale(rx, ry);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);

    context.restore(); // restore to original state
    context.stroke();
}