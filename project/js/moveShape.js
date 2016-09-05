//获取对象的属性
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
//封装选择器
/*
* selector: #id     id选择器带#号
		    .class  class选择器带 . 号
			tagName 标签选择器什么都不用带
* context：代表在那个元素下寻找
*/
function $(selector,context){
	//获取selector的第一个元素
	var firstChar = selector.charAt();
	//如果有context则参数等于context否则等于document
	context = context || document;
	//如果带#号选择Id选择器
	if( firstChar === "#" ){
		return document.getElementById(selector.slice(1));
	}else if( firstChar === "." ){//如果带 . 选择class选择器
		return context.getElementsByClassName(selector.slice(1));
	}else{//如果什么都没有带则选择tagname选择器
		return context.getElementsByTagName(selector);
	}
}
//抖动函数
/*
 * obj:对象
 * attr：对象的属性
 * speed:抖动的幅度
*/
function shake(obj,attr,speed,callback){
	clearInterval(obj[attr]);
	speed = speed || 30; //如果speed没有传参，给默认值为30
	var arr = [];
	//得到一堆正负数
	for( var i = speed; i > 0; i-=2 ){
		arr.push(i,-i);
	}
	//最后向数组插入0
	arr.push(0);
	//声明一个索引作为数组的下标
	var index = 0;
	//获取起始位置
	var startPlace = parseFloat(getStyle(obj,attr));
	//开启定时器
	obj[attr] = setInterval(function (){
		obj.style[attr] = startPlace + arr[index] + "px";
		index++;
		//当index等于length的时候，清除定时器
		if( index === arr.length ){
			clearInterval(obj[attr]);
			if (typeof callback=='function') {
				callback();
			};
		};
	},30);
}

/* obj:对象
 * attr：对象的属性
 * endPlace：每次移动的最终地点
 * durationTime：话费时间
 * fx:运动的形式
 * callback：回调函数
 * */
function doMove(obj,attr,endPlace,durationTime, fx,callback){
	//清除定时器（清除挂在obj下的定时器）每次执行都先清除，保证每次只有一个定时器再跑
	clearInterval(obj[attr]);
	
	//声明起始位置
	var startPlace=parseFloat(getStyle(obj,attr));
	//声明起始时间（时间戳）
	var startTime=new Date().getTime();
	//声明要走的距离  
	//count（每次移动的的距离）=endPlace（每次最终位置）-stratPlace（每次的起始位置）
	//距离差=最终位置-起始位置
	var count=endPlace-startPlace;
	//走完距离差所持续的时间（花费时间）
	var duration = durationTime;
	//开启定时器。代表每30MS走一次，通过定时器去计算每次移动的距离
	obj[attr]=setInterval(function(){
		//获取时间差
		var time=new Date().getTime()-startTime;
		//判断时间差是否大于花费时间，如果大于证明每一次移动的距离已走完
		if(time>duration){
			time=duration;
			clearInterval(obj[attr]);
		}
		/*获取每30MS的总距离
		var value=startPlace+count/duration*time
		*/
		//运动的形式
		var value=Tween[fx](time, startPlace, count, duration);
		//判断是用淡化的效果还是移动移开的效果
		if(attr == 'opacity'){
			value = value;
		}else{
			value = value + 'px';
		}
		//将每次获取每30MS的总距离给元素
		obj.style[attr]=value;
		if(time==duration){
			clearInterval(obj[attr]);
			//回调函数，如果添加回调函数则执行回调函数
			if(typeof callback=='function'){
				callback();
			}
		}
	},50);
}
////////////////////////////////////////////////////
//下面是动画在运动时的曲线，是以什么方式来运动的
/*
* t : time 已过时间
* b : begin 起始值
* c : count 总的运动值
* d : duration 持续时间
*
* 曲线方程
*
* http://www.cnblogs.com/bluedream2009/archive/2010/06/19/1760909.html
* */

//Tween.linear();

var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){//*
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}