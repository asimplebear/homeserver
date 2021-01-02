
window.onload = function go() {
 ctx = document.getElementById('cc').getContext('2d');
 ctx.canvas.width = 400; ctx.canvas.height = 400;
 ctx.translate(200, 200);
 ctx.rotate(2*Math.PI * 1.75);
 ctx.save();
 cycle();
}


function cycle() {

var i;
var now; var hour; var minute; var second;


 ctx.clearRect(-200, -200, 400, 400);

 now = new Date();
 hour = now.getHours();
  //military to 12-hour
  hour = hour >= 12 ? hour - 12 : hour;
 minute = now.getMinutes();
 second = now.getSeconds();


 //hour hand
 ctx.beginPath();/////

 ctx.save();
 ctx.rotate(hour * 2*Math.PI / 12);
 //adjust by minute. stupid without this
 ctx.rotate(minute * 2*Math.PI / (60*12));
 ctx.beginPath();
 ctx.moveTo(0,0);
ctx.strokeStyle = "#00FF00";
 ctx.lineTo(90, 0);
 ctx.stroke();
 //arrow-head
 ctx.beginPath();
 ctx.lineTo(70, -30);
 ctx.lineTo(70, 30);
 ctx.lineTo(90, 0);
 ctx.fillStyle = "#00FF00";
 ctx.fill();
 ctx.restore();


 //minutehand
 ctx.save();
 ctx.rotate(minute * 2*Math.PI / 60);
 //fine adjust by the second
 //optional if prefer minute "jerk"
 ctx.rotate(second * 2*Math.PI / (60*60));
 ctx.beginPath();
 ctx.moveTo(0,0);
 ctx.strokeStyle = "#0000FF";
 ctx.lineTo(160, 0);
 ctx.stroke();
 //arrow-head
 ctx.beginPath();
 ctx.lineTo(140, -30);
 ctx.lineTo(140, 30);
 ctx.lineTo(160, 0);
 ctx.fillStyle = "#0000FF";
 ctx.fill();
 ctx.restore();


 //second hand
 ctx.save();
 ctx.rotate(second * 2*Math.PI / 60);
 ctx.beginPath();
 ctx.moveTo(0,0);
 ctx.lineTo(135, 0);
 ctx.stroke();
 ctx.beginPath();
 ctx.moveTo(130, 0);
 ctx.arc(135, 0, 10, Math.PI, 0);
 ctx.stroke();
 ctx.moveTo(145, 0);
 ctx.beginPath();
 ctx.arc(155, 0, 10, 0, Math.PI);
 ctx.moveTo(155, 0);
 ctx.lineTo(180, 0);
 ctx.stroke();
 ctx.restore();


 //clock face
 ctx.save()
 ctx.beginPath();
 ctx.arc(0, 0, 200, 0, 2*Math.PI);
 ctx.stroke();
 ctx.beginPath();
 ctx.arc(0,0,5,0,2*Math.PI);
 ctx.fill();
 for (i=0; i<12; i++) {
  ctx.moveTo(190, 0);
  ctx.lineTo(200, 0);
  ctx.stroke();
  ctx.rotate(2*Math.PI / 12);
 }
 ctx.restore();


 window.requestAnimationFrame(cycle);

}
go();

