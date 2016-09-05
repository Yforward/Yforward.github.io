 window.onload=function(){
 	var nav=document.getElementById('nav');
	var navLiA=nav.getElementsByTagName('a');
 	var prev=document.getElementById('prev');
	var next=document.getElementById('next');
	var contentBottom=document.getElementById('contentBottom');
	var impressum=document.getElementById('impressum');
	var ImpressumWarp=document.getElementById('ImpressumWarp');
	var preloaderWarp=document.getElementById('preloaderWarp');
	var loadingBar=document.getElementById('loadingBar');
	var loadingtext=document.getElementById('loadingtext');
	var details=document.getElementById('details');
	var detailsPre=details.querySelector('a.prev');
	var detailsNext=details.querySelector('a.next');
	var close=document.getElementById('close');
	var detailsContentPic=document.getElementById('detailsContentPic');
	var detailsContentPicUl=detailsContentPic.getElementsByTagName('ul')[0];
	var page=document.getElementById('page');
	var pageSpan=page.getElementsByTagName('span');
	var jobsLeft=document.getElementById('jobsLeft');
	var jobsLeftItem=jobsLeft.querySelectorAll('.jobsLeftItem');
	var jobsLeftItemShow=jobsLeft.querySelectorAll('.jobsLeftItemShow');
	var loadingText=document.getElementById('loadingText');
	var timer=null;
	var timer1=null;
	var timer2=null;
	var onOff=true;
	var Number=0;
	//刷新滚动条到顶部
	setTimeout(function(){
		window.scrollTo(0,0);
	},30)
	//数据渲染
	crearePic();
	//导航点击
	for (var i = 0; i < navLiA.length; i++) {
		navClick(i);
	}
	//屏二的翻页
	contentBottom.children[0].style.cssText='top:0;left:0;z-index: 5;';
	next.onclick=function(){
		if(next.index) return;
		next.index=1;
		var nextTag=showEle(contentBottom).nextElementSibling;
		if(nextTag==null){
			nextTag=contentBottom.children[0];
		}
		nextTag.style.cssText='top:0;left:900px;z-index: 1;';
		doMove(showEle(contentBottom),'left','-900',300, 'linear',function(){
			showEle(contentBottom).style.zIndex=1;
		})
		doMove(nextTag,'left','0',300, 'linear',function(){
			nextTag.style.zIndex=5;
			next.index=0;
		})
	}
	prev.onclick=function(){
		if(prev.index) return;
		prev.index=1;
		var prevTag=showEle(contentBottom).previousElementSibling;
		if(prevTag==null){
			prevTag=contentBottom.children[contentBottom.children.length-1];
		}
		prevTag.style.cssText='top:0;left:-900px;z-index: 1;';
		doMove(showEle(contentBottom),'left','900',300, 'linear',function(){
			showEle(contentBottom).style.zIndex=1;
		})
		doMove(prevTag,'left','0',300, 'linear',function(){
			prevTag.style.zIndex=5;
			prev.index=0;
		})
	}
	//公司信息的简介
	impressum.onclick=function(){
		ImpressumWarp.style.display='block'
	}
	ImpressumWarp.children[0].onclick=function(){
		ImpressumWarp.style.display='none'
	}
	//加载页面
	// timer2=setInterval(function(){
	// 	var num=parseInt(getComputedStyle(loadingBar).backgroundPositionY);
	// 	var numLength=parseInt(getComputedStyle(loadingBar).height);
	// 	loadingText.innerHTML=parseInt((numLength-num)/numLength*100)+'%';
	// 	console.log(numLength,num)
	// 	if(numLength-num==numLength){
	// 		clearInterval(timer2)
	// 	}
	// },30)
	// doMove(loadingBar,'backgroundPositionY',0,3000, 'linear',function(){
	// 	setTimeout(function(){
	// 		preloaderWarp.style.display='none';
	// 		document.body.style.overflow='auto';
	// 	},500)
	// })
 	var num1=0;
 	for (var i = 0; i < dataImg.length; i++) {
 		var img=document.createElement('img');
 		img.src=dataImg[i];
 		img.onload=function(){
 			num1++;
 			var progress=num1/dataImg.length;
 			var numLength=parseInt(getComputedStyle(loadingBar).height);
			loadingText.innerHTML=parseInt(progress*100)+'%';
			loadingBar.style.backgroundPositionY=(numLength-progress*numLength)+'px';
			console.log(-numLength+progress*numLength)
			if(num1>=dataImg.length){
				setTimeout(function(){
					preloaderWarp.style.display='none';
					document.body.style.overflow='auto';
				},500)
			}
 		}
 	};
	
	//滚轮事件
	window.onscroll=function(){
		var t=window.pageYOffset;
		if(t>=0&&t<1000){
			clear()
			navLiA[0].className='active';
		}
		if(t>=1000&&t<2000){
			clear()
			navLiA[1].className='active';
		}
		if(t>=2000&&t<3000){
			clear()
			navLiA[2].className='active';
		}
		if(t>=3000&&t<4000){
			clear()
			navLiA[3].className='active';
		}
		if(t>=4000&&t<5000){
			clear()
			navLiA[4].className='active';
		}
		if(t>=5000&&t<6000){
			clear()
			navLiA[5].className='active';
		}
		if(t>=6000&&t<7000){
			clear()
			navLiA[6].className='active';
		}
	}
	//点击close关闭details详情页
	close.onclick=function(){
		clearInterval(timer1)
		showEle(detailsContentPicUl).style.cssText='top:0;left:0;z-index: 1;';
		detailsContentPicUl.children[0].style.cssText='top:0;left:0;z-index: 5;';
		pag();
		var contentMainLi=document.getElementById('contentMainLi');
		contentMainLi.style.display='none';
		contentBottom.style.top='0';
		details.style.display='none';
		allLi(1);
		Number=0;
		onOff=true;
	}
	//details详情页图片自动播放
	detailsContentPicUl.children[0].style.cssText='top:0;left:0;z-index: 5;';
	for (var i = 0; i < detailsContentPicUl.children.length; i++) {
		detailsContentPicUl.children[i].setAttribute('num',i+1)
	}
	function play(){
		var nextTag=showEle(detailsContentPicUl).nextElementSibling;
		if(nextTag==null){
			nextTag=detailsContentPicUl.children[0];
		}
		nextTag.style.cssText='top:0;left:701px;z-index: 1;';
		doMove(showEle(detailsContentPicUl),'left','-701',300, 'linear',function(){
			showEle(detailsContentPicUl).style.zIndex=1;
		})
		doMove(nextTag,'left','0',300, 'linear',function(){
			nextTag.style.zIndex=5;
			detailsNext.index=0;
			pag();
		})
		
	}
	
	detailsContentPic.onmouseover=function(){
		clearInterval(timer1)
	}
	detailsContentPic.onmouseout=function(){
		timer1=setInterval(play,1000);
	}
	//详情页点击播放
	detailsNext.onclick=function(){
		if(detailsNext.index) return;
		detailsNext.index=1;
		var nextTag=showEle(detailsContentPicUl).nextElementSibling;
		if(nextTag==null){
			nextTag=detailsContentPicUl.children[0];
		}
		nextTag.style.cssText='top:0;left:701px;z-index: 1;';
		doMove(showEle(detailsContentPicUl),'left','-701',300, 'linear',function(){
			showEle(detailsContentPicUl).style.zIndex=1;
		})
		doMove(nextTag,'left','0',300, 'linear',function(){
			nextTag.style.zIndex=5;
			detailsNext.index=0;
			pag();
		})
	}
	detailsPre.onclick=function(){
		if(detailsPre.index) return;
		detailsPre.index=1;
		var prevTag=showEle(detailsContentPicUl).previousElementSibling;
		if(prevTag==null){
			prevTag=detailsContentPicUl.children[detailsContentPicUl.children.length-1];
		}
		prevTag.style.cssText='top:0;left:-701px;z-index: 1;';
		doMove(showEle(detailsContentPicUl),'left','701',300, 'linear',function(){
			showEle(detailsContentPicUl).style.zIndex=1;
		})
		doMove(prevTag,'left','0',300, 'linear',function(){
			prevTag.style.zIndex=5;
			detailsPre.index=0;
			pag();
		})
	}
	//jobsLeft的点击事件
	for (var i = 0; i < jobsLeftItem.length; i++) {
		jobsLeftItem[i].onclick=function(){
			if(this.nextElementSibling.style.display=='block'){
				this.nextElementSibling.style.display='none';
				this.className='jobsLeftItem';
			}else{
				for (var i = 0; i < jobsLeftItem.length; i++) {
					jobsLeftItem[i].nextElementSibling.style.display='none';
					jobsLeftItem[i].className='jobsLeftItem';
				}
				this.nextElementSibling.style.display='block';
				this.className='jobsLeftItem active';
			}
			
			
		}
	}
	//详情页的页眉
	function pag(){
		pageSpan[0].innerHTML=showEle(detailsContentPicUl).getAttribute('num');
		pageSpan[1].innerHTML=detailsContentPicUl.children.length;
	} 
	//清除所有导航的class
	function clear(){
		for (var i = 0; i < navLiA.length; i++) {
			 navLiA[i].className='';
		}
	}
	//初始化创建屏二所有的li
	function crearePic(){
		for (var i = 0; i < dataTop.length; i++) {
			var contentMain=document.createElement('div');
			contentMain.className='contentMain';
			
			var contentMainTop=document.createElement('ul');
			contentMainTop.className='contentMainTop';
			contentMain.appendChild(contentMainTop);
			
			var contentMainLi=document.createElement('div');
			contentMainLi.className='contentMainLi';
			contentMainLi.id='contentMainLi';
			contentMain.appendChild(contentMainLi);
			
			var contentMainBottom=document.createElement('ul');
			contentMainBottom.className='contentMainBottom';
			contentMain.appendChild(contentMainBottom);
			
			contentBottom.appendChild(contentMain);
			createLi(i,contentMainTop,dataTop);
			createLi(i,contentMainBottom,dataBottom);
		}
	}
	//创建屏二所有的li
	function createLi(i,parent,data){
		'use strict'
		for (var j = 0; j <data[i].img.length; j++) {
			var li=document.createElement('li');
			li.innerHTML=`<a href="javaScript:;">
							<img src="${data[i].img[j]}" width="179" height="166"/>
								<span class="contentMainSpan1">${data[i].title[j]}</span>
								<span class="contentMainSpan2">${data[i].tips[j]}</span>
							</a>`;
			parent.appendChild(li);
			li.onclick=function(){
				var contentMainLi=document.getElementById('contentMainLi');
				if(onOff){
					contentMainLi.style.display='block';
					contentBottom.style.top='-230px';
					details.style.display='block';
					allLi(0.2);
					onOff=false;
					pag();
					timer1=setInterval(play,1000);
				}else{
					showEle(detailsContentPicUl).style.cssText='top:0;left:0;z-index: 1;';
					detailsContentPicUl.children[0].style.cssText='top:0;left:0;z-index: 5;';
					pag();
					contentMainLi.style.display='none';
					contentBottom.style.top='0';
					details.style.display='none';
					allLi(1);
					Number=0;
					onOff=true;
					clearInterval(timer1)
				}
				
			}
			hover(li);
		}
	}
	//鼠标移入移出的状态用于屏二
	function hover(ele){
		var contentMainImg=ele.getElementsByTagName('img')[0];
		var contentMainSpan=ele.getElementsByTagName('span');
		ele.onmouseover=function(){
			contentMainImg.style.display='none';
			contentMainSpan[0].style.display='block';
			contentMainSpan[1].style.display='block';
		}
		ele.onmouseout=function(){
			contentMainImg.style.display='block';
			contentMainSpan[0].style.display='none';
			contentMainSpan[1].style.display='none';
		}
	}
	//显示当前框显示的图片
	function showEle(obj){
		var max=0;
		var ele=null;
		for (var i = 0; i < obj.children.length; i++) {
			var Index=parseFloat(getComputedStyle(obj.children[i]).zIndex);
			if(Index>max){
				max=Index;
				ele=obj.children[i]
			}
		}
		return ele;
	}
	//导航点击
	function navClick(a){
		navLiA[a].onclick=function(){
			clearInterval(timer)
			var self=window.pageYOffset;
			var num=0;
			timer=setInterval(function(){
				if(a*1000-self>0){
					num+=100;
					if(num>=a*1000-self){
						num=a*1000-self;
						clearInterval(timer)
					}
				}else{
					num-=100;
					if(num<=a*1000-self){
						num=a*1000-self;
						clearInterval(timer)
					}
				}
				window.scrollTo('0',num+self)
			},50)
		}
	}
	//找到屏二下的li
	function allLi(num){
		var allLi=contentBottom.getElementsByTagName('li');
		for (var i = 0; i < allLi.length; i++) {
			allLi[i].style.opacity=num;
		}
	}
}
