var num = 1 / window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width,initial-scale='+num+',minimum-scale='+num+',maximum-scale='+num+',user-scalable=no" />')
var fz = document.documentElement.clientWidth /36;
document.getElementsByTagName("html")[0].style.fontSize = fz + "px";
window.onload = function () {
	 var f1Box = document.querySelector("#f1Box");
	 var f1BoxMain=document.querySelector("#f1BoxMain");
	 var startPoint = 0;
	 var translateX = 0;
	 var startX=0;
	 f1Box.addEventListener(
	 	"touchstart",
		function (e){
			startPoint = e.changedTouches[0].pageX;
		}
	 );
	  f1Box.addEventListener(
	 	"touchmove",
		function (e){
			var nowPoint = e.changedTouches[0].pageX;
			var dis = nowPoint - startPoint;
			translateX = startX + dis;
			if(translateX>0){
				translateX=0;
			}else if(translateX<(f1Box.clientWidth - f1BoxMain.offsetWidth)){
				translateX=f1Box.clientWidth - f1BoxMain.offsetWidth;
			}
			f1BoxMain.style.left= translateX+"px";
		}
	 );
	  f1Box.addEventListener(
		"touchend",
		function (){
			startX=translateX;
		}
	  );
};