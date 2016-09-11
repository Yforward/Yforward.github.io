$(
	function(){
		var search=window.location.search.split('=')[1];
		var hashP=window.location.hash.split('=')[1];
		var wrap=$('#wrap');
		var left=$('.left',wrap)[0];
		var leftUl=$('ul',left)[0];
		var select=$('#select');
		for (var i = 0; i < aData.list.length; i++) {
			var li=$('<li>');
			var a=$('<a>');
			a.href='index.html?s='+aData.list[i].lx;
			if(aData.list[i].lx==search){
				a.href += '#page='+Math.ceil((Number(hashP)+1)/2);
			}
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
		var rightDiv=$('.info',right)[0];
		var oImg=$('img',right)[0];
		oImg.src=aData[search].img;
		details();
		window.onhashchange=function(){
			rightDiv.innerHTML='';
			details();
		}
		function details(){
			var hash=window.location.hash.split('=')[1];
			var search=window.location.search.split('=')[1];
			var h2=$('<h2>');
			h2.innerHTML=aData[search].text[hash].zw;
			append(h2,rightDiv);
			var div=$('<div>');
			div.className='h'
			var arr=['gs','xz','gz','dd','jy','xl','rs','dy','sj','lx'];
			var arr1=['招聘公司：','公司性质：','职位性质：','工作地点：','工作经验：','学历要求：','招聘人数：','薪资待遇：','发布日期：','招聘类型：']
			for (var i = 0; i < 10; i++) {
				var span=$('<span>');
				if(i%2==0){
					span.className='l';
				}
				span.innerHTML=arr1[i]+aData[search].text[hash][arr[i]];
				if(arr[i]=='sj'){
					span.innerHTML=arr1[i]+aData.date(aData[search].text[hash][arr[i]],1);
				}
				append(span,div);
			}
			append(div,rightDiv);
			var dl=$('<dl>');
			var dt=$('<dt>');
			dt.innerHTML=aData[search].text[hash].info[0].t;
			append(dt,dl);
			for (var i = 0; i < aData[search].text[hash].info[0].l.length; i++) {
				var dd=$('<dd>');
				dd.innerHTML= aData[search].text[hash].info[0].l[i];
				append(dd,dl);
			}
			append(dl,rightDiv);
			var dl=$('<dl>');
			var dt=$('<dt>');
			dt.innerHTML=aData[search].text[hash].info[1].t;
			append(dt,dl);
			var dd=$('<dd>');
			dd.innerHTML= aData[search].text[hash].info[1].l;
			append(dd,dl);
			append(dl,rightDiv);
			var p=$('<p>');
			p.innerHTML='有意者请投递简历至 '+aData.email;
			append(p,rightDiv);
		}
	}
)