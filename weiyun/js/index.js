window.onload = function() {
	var content=document.getElementById('content');
	var movePic=document.getElementById('movePic');
	var checkAll=document.getElementById('checkAll');
	var breadcrumb=document.getElementById('breadcrumb');
	var breadcrumbSpan=breadcrumb.getElementsByTagName('span')[0];
	var breadcrumbFirst=document.getElementById('first');
	var alert=document.getElementById('alert');
	var meun=document.getElementById('meun');
	var shu=document.getElementById('shu');
	var shuPic=document.getElementById('shuPic');
	var shuBtn=shu.getElementsByTagName('button');
	var divElement=[];
	var currentPid = 0;
	var on=false;
	var shuId=null;
	var arr1={
			'fileclass':['移动','重命名','删除','复制'],
			'pic':['移动','重命名','删除','复制','粘贴'],
			'doc':['重新加载','另存','打印','检查原代码','检查']
		}
	var num=-1;
	document.addEventListener('contextmenu',function(e){
		var obj=arr1[this.index];
		num=-1;
		create(obj,e);
	});
	document.addEventListener('click',function(){
		meun.style.display='none';
	});
	document.index='doc'
	function create(a,e){
		// e.cancelBubble=true;
//			e.stopPropagation();
		meun.innerHTML='';
		meun.style.display='block';
		meun.style.left=e.clientX+window.pageXOffset +'px';
		meun.style.top=e.clientY+window.pageYOffset +'px';
		for (var i = 0; i < a.length; i++) {
			var li=document.createElement('li');
			li.innerHTML=a[i];
			meun.appendChild(li);
		}
		e.preventDefault();
	}

	//指定id找到当前id元素的datas的信息  参数id:点击元素的id
	function getSelf(id){
		for (var i = 0; i < datas.length; i++) {
			if( datas[i].id==id){
				return datas[i]
			}
		}
	}

//	根据指定id获取当前id下面的一级子数据 参数id：当前元素的id
	function getSiblingId(id){
		var arr=[];
		for (var i = 0; i < datas.length; i++) {
			if(datas[i].pid==id){
				arr.push(datas[i])
			}
		}
		return arr;
	}
//	根据指定id获取当前id下面的子孙级的数据  参数id：当前元素的id   
//	参数level:指的是带有level的元素距离指定id获取子孙级的元素的层级是level层
	function getAllChildren(id, level) {
	    var arr = [];
	    var level = level || 0;
	    var children = getSiblingId(id);
	    for (var i=0; i<children.length; i++) {
	        children[i].level = level;
	        arr.push( children[i] );
	        arr = arr.concat( getAllChildren(children[i].id, level+1) );

	    }
	    return arr;
	}
	//找到当前页面所选中的所有按钮
	function getcheck(){
		var arr=[];
		for (var i = 0; i < divElement.length; i++) {
			if(divElement[i].checked){
				arr.push(divElement[i])
			}
    	}
		return arr
	}
	//指定一个数据的父id，找到这个数据父级的数据信息 参数pid：当前元素的父id
	function getparent(pid){
		for (var i = 0; i < datas.length; i++) {
			if(datas[i].id==pid){
				return datas[i];
			}
		}
	}
	//指定一个数据的父id，找到这个数据 祖先的数据信息 参数id：当前元素的父id
	function getAllparent(id){
		var arr=[];
		if(!getparent(id).pid){
			arr.push(getparent(id));
			return arr
		}
		arr.push(getparent(id));
		return arr.concat(getAllparent(getparent(id).pid))
	}
	//找到最大的id
	function getMaxId(){
		var a=0;
		for (var i = 0; i < datas.length; i++) {
			if(datas[i].id>a){
				a=datas[i].id;
			}
		};
		return a;
	}
//  找到没有选中的的元素
	function getNochecked(){
		var arr=[];
		for (var i = 0; i <divElement.length; i++) {
			if(!divElement[i].checked){
				arr.push(divElement[i])
			}
		}
		return arr
	}
	
//	创建content下的元素
	content.style.height='450px'
	function createElement(data){
        var div=document.createElement('div');
        div.fileId = data.id;
//      div.style.zIndex=10;
        div.pId=data.pid;
        div.className='file';
        div.index='fileclass';
        var check=document.createElement('span');
        check.className='checkbox';
        div.appendChild(check);
        var img=document.createElement('div');
        img.className='image image-'+data.type;
        div.appendChild(img);
        var tip=document.createElement('div');
        tip.className='name';
        tip.innerHTML=data.name;
        div.appendChild(tip);

        div.oncontextmenu=function(e){
			var obj=arr1[div.index];
			create(obj,e);
			console.log(create(obj,e))
			num=-1;
		};
        div.onmouseover=function(){
        	if(this.checked){
        		div.className='file file-checked';
        	}else{
        		div.className='file file-hover';
        	}
        	
        }
        div.onmouseout=function(){
        	if(this.checked){
        		div.className='file file-checked';
        	}else{
        		div.className='file';
        	}
        }
        div.onclick=function(e){
        	if(on) return;
        	e.cancelBubble=true;
        	content.innerHTML='';
        	divElement=[];
        	currentPid=div.fileId
        	for (var i = 0; i < getSiblingId(div.fileId).length; i++) {
        		createElement(getSiblingId(div.fileId)[i]);
        	}
        	crumbs(div.fileId)
        	checkAll.checked=false;
        }
         div.onmousedown=function(e){
        	e.cancelBubble=true;
        	var onOff=true;
        	// var divCheckedMove=null;
        	var movePic=document.createElement('div');
        	movePic.className='movePic';
        	movePic.style.zIndex=-1;
        	var span=document.createElement('span');
        	span.innerHTML=1
        	movePic.appendChild(span);
        	var arr=getNochecked();
        	if(!div.checked){
        		for (var i = getcheck().length-1; i >=0 ; i--) {
        			getcheck()[i].className='file';
        			getcheck()[i].checked=false;
        			
        		}
        		var box1=document.createElement('div');
        		box1.style.cssText='left:0;top:0;';
				movePic.appendChild(box1);
        	}else{
        		for (var i = 0; i < getcheck().length; i++) {
        			var box1=document.createElement('div');
					box1.style.left=i*5+'px';
					box1.style.top=i*5+'px';
					box1.style.zIndex= getcheck().length-i;
					movePic.appendChild(box1);
        		}
        	}
			content.appendChild(movePic);
			var disX=e.clientX-div.offsetLeft;
			var disY=e.clientY-div.offsetTop;
			document.onmousemove=function(e){
				movePic.style.display='block';
				div.className='file file-checked';
				div.checked=true;
				on=true;
				var l=e.clientX-disX+10;
				var t=e.clientY-disY+10;
				if(l<0){
					l=0;
				}else if(l>content.offsetWidth-movePic.offsetWidth){
					l=content.offsetWidth-movePic.offsetWidth;
				}
				if(t<0){
					t=0;
				}else if(t>content.offsetHeight-movePic.offsetHeight){
					t=content.offsetHeight-movePic.offsetHeight;
				}
				movePic.style.left=l+'px';
				movePic.style.top=t+'px';
				
				for (var i = 0; i < divElement.length; i++) {
					for (var j = 0; j < getcheck().length; j++) {
						if(getcheck()[j]==divElement[i]){
							onOff=false;
						}
					}
					if(onOff){
						divElement[i].onmouseup=function(e){
							e.cancelBubble=true;
							setTimeout(function(){
								on=false;
							},100)
							document.onmousemove=null;
							document.onmouseup=null;
							for (var i = 0; i < divElement.length; i++) {
								divElement[i].onmouseup=null;
							}
							content.removeChild(movePic);
							for (var i = 0; i < datas.length; i++) {
								for (var j = 0; j < getcheck().length; j++) {
									if(getcheck()[j].fileId==datas[i].id){
										datas[i].pid=this.fileId;
									}
								}
							}
							for (var j = 0; j < getcheck().length; j++) {
								content.removeChild(getcheck()[j]);
							}
						}
					}else{
						onOff=true;;
					}
				}
			}
			document.onmouseup=function(e){
				setTimeout(function(){
					on=false;
				},100)
				document.onmousemove=null;
				document.onmouseup=null;
				content.onmouseup=null;
				content.removeChild(movePic);
				checkAll.checked=getcheck().length==divElement.length;
			}
			
			
			return false;
        }
        check.onclick=function(e){
        	e.cancelBubble=true;
        	if(div.checked){
        		div.className='file file-hover';
        		div.checked=false;
        	}else{
        		div.className='file file-checked';
        		div.checked=true;
        	}
			checkAll.checked=getcheck().length==divElement.length;
        }
        check.onmouseup=function(e){
        	e.cancelBubble=true;
        }
        check.onmousedown=function(e){
        	e.cancelBubble=true;
        }
        content.appendChild(div);
        divElement.push(div)
	}
	//初始化
	for (var i = 0; i < getSiblingId(0).length; i++) {
		createElement(getSiblingId(0)[i]);
	}
	//全选
	checkAll.onclick=function(e){
		e.cancelBubble=true;
		for (var i = 0; i < divElement.length; i++) {
			if(this.checked){
				divElement[i].className='file file-checked';
			}else{
				divElement[i].className='file';
			}
			divElement[i].checked=this.checked;
		}
	}
	
	
	
	//创建面包屑导航obj:点击元素
	function crumbs(obj){
		var a=document.createElement('a');
		a.index=obj;
		a.innerHTML='》'+getSelf(obj).name;
		breadcrumbSpan.appendChild(a);
	}
	breadcrumbSpan.onclick=function(e){
		// e.cancelBubble=true;
		breadcrumbSpan.innerHTML='';
		checkAll.checked=false;
		currentPid = e.target.index;
		for (var i = getAllparent(currentPid).length-1; i >=0; i--) {
			 crumbs(getAllparent(currentPid)[i].id)
			 
		};
		/////////////////////content的内容///////////////
		content.innerHTML='';
        divElement=[];
		for (var i = 0; i < getSiblingId(e.target.index).length; i++) {
    		createElement(getSiblingId(e.target.index)[i]);
    	}
	}
	//点击breadcrumb的第一个回到开始页面
	breadcrumbFirst.onclick=function(e){
		// e.cancelBubble=true;
		breadcrumbSpan.innerHTML='';
		content.innerHTML='';
		checkAll.checked=false;
		currentPid = 0;
		for (var i = 0; i < getSiblingId(0).length; i++) {
			createElement(getSiblingId(0)[i]);
		}
	}
	var tools=document.getElementById('tools');
	var btn=tools.getElementsByTagName('button');
	//新建文件夹点击按钮
	btn[5].onclick=function(e){
		e.cancelBubble=true;
		newFn()
	}
	btn[5].onmousedown=function(e){
		e.cancelBubble=true;
	}
	//新建文件夹的函数
	function newFn(){
		var div=document.createElement('div');
        div.className='file';
        div.onmouseover=function(e){
        	// e.cancelBubble=true;
    		div.className='file file-hover';
        }
        div.onmouseout=function(e){
        	// e.cancelBubble=true;
    		div.className='file';
        }

        var img=document.createElement('div');
        img.className='image image-folder';
        div.appendChild(img);

        var input=document.createElement('input');
        input.type = 'text';
		input.className = 'import';

        div.appendChild(input);
        content.appendChild(div);
       	input.focus();
        input.onblur=function(){
        	if(this.value==''){
        		content.removeChild(this.parentNode);
        	}else{
        		var onOff=true;
				for (var i = 0; i < getSiblingId(currentPid).length; i++) {
					if(getSiblingId(currentPid)[i].name==input.value){
						onOff=false;
					}
				};
				if(onOff){
			    	datas.push({
			            id: getMaxId() + 1,
			            pid: currentPid,
			            name: input.value,
			            type: 'folder'
			        });
			        content.removeChild(this.parentNode);
			        createElement(datas[datas.length-1]);
		        }else{
		        	content.removeChild(this.parentNode);
		        	popup('文件夹名冲突')
		        }
	        }
	    }
	    input.onkeydown=function(e){
	    	if(e.which==13){
	    		this.blur();
	    	}
	    }
	    input.onclick=function(e){
	    	e.cancelBubble=true;
	    }
	}
	
	//重命名
	btn[3].onclick=function(e){
		// e.cancelBubble=true;
		if(getcheck().length==1){
			var input=document.createElement('input');
	        input.type = 'text';
			input.className = 'import';
			input.value=getSelf(getcheck()[0].fileId).name;
			getcheck()[0].appendChild(input);
			input.focus();

			input.onblur=function(){

				if(this.value==''){
					popup('命名不能为空',function(){
						setTimeout(function(){
				    		alert.style.display='none';
				    	},1500)
					})
	        	}else{
	        		var onOff=true;
					for (var i = 0; i < getSiblingId(currentPid).length; i++) {
						if(getSiblingId(currentPid)[i].name==input.value  && getSiblingId(currentPid)[i].name!=getSelf(getcheck()[0].fileId).name){
							onOff=false;
						}
					};
	        		if(onOff){
	        			getcheck()[0].children[2].innerHTML=input.value;
	        			getSelf(getcheck()[0].fileId).name=input.value;
	        			getcheck()[0].className='file';
	        			getcheck()[0].checked=false;
	        		}else{
	        			popup('文件夹名冲突',function(){
							setTimeout(function(){
					    		alert.style.display='none';
					    	},1500)
						})
	        		}
	        		input.parentNode.removeChild(input);
	        	}
			}
			input.onkeydown=function(e){
	    		if(e.which==13){
		    		this.blur();
		    	}
		    }
			input.onclick=function(e){
				e.cancelBubble=true;
			}
		}else{
			popup('请选择一个文件夹',function(){
				setTimeout(function(){
		    		alert.style.display='none';
		    	},1500)
			})
		}
	}
	//弹出框的封装函数
	function popup(a,callback){
		alert.style.display='block';
		alert.innerHTML='';
		var div=document.createElement('div');
		div.innerHTML=a;
		div.className='alertChild';
		alert.appendChild(div)
    	if(callback && typeof callback=='function'){
    		callback()
    	}
	}
	//删除
	function del(){
		var arr=[];
		for (var i = getcheck().length-1; i >=0; i--) {
			arr=arr.concat(getAllChildren(getcheck()[i].fileId));
			for (var j = datas.length-1; j >=0; j--) {
				if(getcheck()[i].fileId==datas[j].id){
					datas.splice(j,1);
				}
			}
			var b=getcheck()[i];
			content.removeChild(getcheck()[i]);
			getcheck()[i].checked=false;
			for (var j = 0; j < divElement.length; j++) {
				if(divElement[j]==b){
					divElement.splice(j,1)
				}
			};
		};
		for (var i = datas.length-1; i>=0;i--) {
			for (var j = 0; j < arr.length; j++) {
				if (arr[j].id==datas[i].id) {
					datas.splice(i,1);
					break;
				} 
			}
		}
	}
	btn[4].onclick=function(e){
		e.cancelBubble=true;
		if(getcheck().length>0){
			popup('确定删除',function(){
				var btn=document.createElement('button');
				btn.innerHTML='确定';
				btn.className='alertBtn';
				alert.appendChild(btn);
				btn.onclick=function(){
					del();
					alert.style.display='none';
				}
				var btn1=document.createElement('button');
				btn1.innerHTML='取消';
				btn1.onclick=function(){
					alert.style.display='none';
					for (var i = 0; i < divElement.length; i++) {
						divElement[i].checked=false;
						divElement[i].className='file'
			    	}
				}
				btn1.className='alertBtn';
				alert.appendChild(btn1)
			})
		}else{
			popup('请选择删除文件夹',function(){
				setTimeout(function(){
		    		alert.style.display='none';
		    	},1500)
			})
		}
		
	}
// 绘制方框

	content.onmousedown=function(e){
		e.cancelBubble=true;
		var disX=e.clientX;
		var disY=e.clientY;

		var div=document.createElement('div');
		div.className='box';
		div.style.top='0px';
		div.style.left='0px';
		content.appendChild(div);
		document.onmousemove=function(e){
			var height=e.clientY-disY;
			var width=e.clientX-disX;
			div.style.width = Math.abs(width) + 'px';
			div.style.height=Math.abs(height) + 'px';
			div.style.top=Math.min(e.clientY-content.offsetTop+window.pageYOffset,disY-content.offsetTop+window.pageYOffset)+'px';
			div.style.left=Math.min(e.clientX-content.offsetLeft+window.pageXOffset,disX-content.offsetLeft+window.pageXOffset)+'px';
			var divFloder=document.querySelectorAll('#content .file');
			for (var i = 0; i < divFloder.length; i++) {
				moveChecked(div,divFloder[i]);
				checkAll.checked=getcheck().length==divElement.length;
			};
		}						   
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			content.removeChild(div);
			div=null;
		}
		// return false;
	}
	function moveChecked(obj1,obj2){
		var L1 = obj1.offsetLeft;
	    var R1 = L1 + obj1.offsetWidth;
	    var T1 = obj1.offsetTop;
	    var B1 = T1+ obj1.offsetHeight;
	
	    var L2 = obj2.offsetLeft;
	    var R2 = L2 + obj2.offsetWidth;
	    var T2 = obj2.offsetTop;
	    var B2 = T2 + obj2.offsetHeight;
	
	    if ( R1 > L2 && L1 < R2 && B1 > T2 && T1 < B2 ) {
	        obj2.className= 'file file-checked';
	        obj2.checked=true;
	    } else {
	        obj2.className = 'file';
	        obj2.checked=false;
	    }
	}
	//移动到
	btn[2].onclick=function(){
		if(getcheck().length>0){
			shu.style.display='block';
			shuPic.innerHTML='';
			var allChlid= getAllChildren(0)
			for (var i = 0; i < allChlid.length; i++) {
				var li=document.createElement('li');
				var str1=0;
				for (var j = 0; j < allChlid[i].level; j++) {
					str1+=20;
				};
				li.innerHTML=allChlid[i].name;
				li.style.textIndent=str1+'px';
				shuPic.appendChild(li)
			};
		}else{
			popup('请选择文件夹',function(){
				setTimeout(function(){
		    		alert.style.display='none';
		    	},1500)
			})
		}
	}
	shuPic.onclick=function(e){
		if(e.target.tagName.toLowerCase()=='li'){
			for (var i = 0; i < shuPic.children.length; i++) {
				shuPic.children[i].style.backgroundColor='';
			};
			e.target.style.backgroundColor='red';
			for (var i = 0; i < datas.length; i++) {
				if(e.target.innerHTML==datas[i].name){
					shuId=datas[i].id;
				}
			};
		}
	}
	shuBtn[0].onclick=function(){
		for (var j = 0; j < datas.length; j++) {
			for (var i = 0; i < getcheck().length; i++) {
				if( getcheck()[i].fileId==datas[j].id){
					datas[j].pid=shuId
					if(datas[j].pid==datas[j].id){
						popup('请选择移动到',function(){
							setTimeout(function(){
					    		alert.style.display='none';
					    	},1500)
						})
						return;
					}
				}
			};
		};
		content.innerHTML='';
		for (var i = 0; i < getSiblingId(currentPid).length; i++) {
			createElement(getSiblingId(currentPid)[i]);
		}
		shu.style.display='none';
	}
	shuBtn[1].onclick=function(){
		shu.style.display='none';
		for (var i = 0; i < divElement.length; i++) {
			divElement[i].checked=false;
			divElement[i].className='file'
    	}
	}
}
