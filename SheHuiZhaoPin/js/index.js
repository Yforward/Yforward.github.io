$(
	function(){
		if(window.location.search==''){
			window.location.search='?s=sh'
		}
		var search=window.location.search.split('=')[1];
		var wrap=$('#wrap');
		var left=$('.left',wrap)[0];
		var leftUl=$('ul',left)[0];
		var select=$('#select');
		for (var i = 0; i < aData.list.length; i++) {
			var li=$('<li>');
			var a=$('<a>');
			a.href='index.html?s='+aData.list[i].lx;
			a.innerHTML=aData.list[i].text;
			append(a,li);
			append(li,leftUl);
		}
		var leftUlLi=$('li',leftUl);
		if(search=='sh'){
			leftUlLi[0].className='focus';
		}else{
			leftUlLi[1].className='focus';
		}
		var right=$('#right');
		var rightDiv=$('div',right);
		var oImg=$('img',rightDiv[0])[0];
		oImg.src=aData[search].img;
		function tiao(i){
			var p=$('<p>');
			p.className='zp';
			var span=$('<span>');
			var a=$('<a>');
			a.href="content.html?s="+search+"#p="+i;
			a.innerHTML='★ 职位需求：'+aData[search].text[i].zw;
			append(a,span);
			append(span,p);
			var span=$('<span>');
			span.innerHTML='需求人数：'+aData[search].text[i].rs+'名';
			append(span,p);
			var span=$('<span>');
			span.className='date';
			span.innerHTML=aData.date(aData[search].text[i].sj,1);
			append(span,p);
			append(p,rightDiv[1]);
			var p=$('<p>');
			p.className='yq';
			var str='';
			for (var j = 0; j < aData[search].text[i].info[0].l.length; j++) {
				str+=aData[search].text[i].info[0].l[j];
			}
			var str1=str.substring(0,100)
			p.innerHTML=str1+'···[<a href="content.html?s='+search+'#p='+i+'">查看详情</a>]';
			append(p,rightDiv[1]);
		}
		for (var i = 1; i <= Math.ceil(aData[search].text.length/2); i++) {
			var span=$('<span>');
			if(i==1){
				span.className='focus';
			}
			var a=$('<a>');
			a.href='javascript:;';
			a.innerHTML=i;
			append(a,span);
			append(span,select);
			span.index=i;
			span.onclick=function(){
				window.location.hash='#page='+this.index;
				num=this.index;
			}
		}
		var pre=$('.prev')[0];
		var next=$('.next')[0];
		var num=0
		pre.onclick=function(){
			num--;
			if(num<=0){
				num=select.children.length
			}
			window.location.hash='#page='+num;
		}
		next.onclick=function(){
			num++;
			if(num>select.children.length){
				num=1;
			}
			window.location.hash='#page='+num;
		}
		if(window.location.hash==''){
			tiao(0);
			tiao(1);
		}else{
			judge();
			
		}
		window.onhashchange=function(){
			judge();
		}
		function judge(){
			var hash=window.location.hash.split('=')[1];
			num=hash;
			rightDiv[1].innerHTML='';
			for (var i = 0; i < select.children.length; i++) {
				select.children[i].className='';
			}
			select.children[hash-1].className='focus';
			if(hash>0&&hash<=select.children.length){
				var n=(hash-1)*2;
				for (var i = n; i < hash*2; i++) {
					tiao(n);
					if(n<aData[search].text.length-1){
						n++;
					}else{
						break;
					}
				}
			}
		}
	}
)
