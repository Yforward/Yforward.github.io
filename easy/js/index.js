$(function(){
	var keyWord='';
	var prepage=20;
	var page=1;
	var pages = 0;
	$('#nav li').on('click',function(){
		$('#nav li').removeClass('active');
		$(this).addClass('active');
	})
	$('#serach').on(
		'submit',
		function(){
			keyWord=$('#text').val();
			page=1;
			if(keyWord){
				if($('#nav li').eq(0).hasClass('active')){
					requestBook();
				}else if($('#nav li').eq(1).hasClass('active')){
					requestSubjects()
				}else if($('#nav li').eq(2).hasClass('active')){
					requestMusic()
				}
				
			}
			return false;
		}
	)
	function requestBook(){
		$.getJSON(
			'https://api.douban.com/v2/book/search?q=' + keyWord +　'&callback=?&start=' + (prepage * (page - 1)) + '&count=' + prepage,
			function(data){
				//渲染结果头部
				pages = Math.ceil( data.total / prepage );
                $('#resultHead').html(
                    template('templateResultHead', {
                        keyword: keyWord,   //搜索关键字
                        total: data.total,  //搜索的总记录条数
                        prepage: prepage,    //每页显示的条数
                        page: page,
                        pages: pages
                    })
                );
				//渲染结果列表
                $('.list').html(
                    template('templateResultList', {
                        books: data.books
                    })
                )
                //渲染分页
                var pageLimit = getPageLimit(pages, 7, page);
                $('.pagesFooter').html(
                    template('templagePages', {
                        pageLimit: pageLimit,
                        page: page
                    })
                )
                //点击每一页
                $('.pagesFooter .pageList').on('click', function() {
                	document.body.scrollTop = document.documentElement.scrollTop = 0;
                    page = parseInt($(this).attr('_page'));
                    requestBook();
                })
                $('.nextPage').on('click', function() {
                	document.body.scrollTop = document.documentElement.scrollTop = 0;
                	page++;
                	if(page>pages){
                		page=1
                	}
                    requestBook();
                })
                $('.prevPage').on('click', function() {
                	document.body.scrollTop = document.documentElement.scrollTop = 0;
                    page--;
                	if(page<1){
                		page=pages
                	}
                    requestBook();
                })

			}
		)
	}
	function requestSubjects(){
		$.getJSON(
			'https://api.douban.com/v2/movie/search?q=' + keyWord +　'&callback=?&start=' + (prepage * (page - 1)) + '&count=' + prepage,
			function(data){
				//渲染结果头部
				pages = Math.ceil( data.total / prepage );
                $('#resultHead').html(
                    template('templateResultHead', {
                        keyword: keyWord,   //搜索关键字
                        total: data.total,  //搜索的总记录条数
                        prepage: prepage,    //每页显示的条数
                        page: page,
                        pages: pages
                    })
                );
				//渲染结果列表
                $('.list').html(
                    template('templateResultList1', {
                        subjects: data.subjects
                    })
                )
                //渲染分页
                var pageLimit = getPageLimit(pages, 7, page);
                $('.pagesFooter').html(
                    template('templagePages', {
                        pageLimit: pageLimit,
                        page: page
                    })
                )
                //点击每一页
                $('.pagesFooter .pageList').on('click', function() {
                	document.body.scrollTop = document.documentElement.scrollTop = 0;
                    page = parseInt($(this).attr('_page'));
                    requestSubjects();
                })
                $('.nextPage').on('click', function() {
                	document.body.scrollTop = document.documentElement.scrollTop = 0;
                	page++;
                	if(page>pages){
                		page=1
                	}
                    requestSubjects();
                })
                $('.prevPage').on('click', function() {
                	document.body.scrollTop = document.documentElement.scrollTop = 0;
                    page--;
                	if(page<1){
                		page=pages
                	}
                    requestSubjects();
                })

			}
		)
	}
	function requestMusic(){
		$.getJSON(
			'https://api.douban.com/v2/music/search?q=' + keyWord +　'&callback=?&start=' + (prepage * (page - 1)) + '&count=' + prepage,
			function(data){
				//渲染结果头部
				pages = Math.ceil( data.total / prepage );
                $('#resultHead').html(
                    template('templateResultHead', {
                        keyword: keyWord,   //搜索关键字
                        total: data.total,  //搜索的总记录条数
                        prepage: prepage,    //每页显示的条数
                        page: page,
                        pages: pages
                    })
                );
				//渲染结果列表
                $('.list').html(
                    template('templateResultList2', {
                        musics: data.musics
                    })
                )
                //渲染分页
                var pageLimit = getPageLimit(pages, 7, page);
                $('.pagesFooter').html(
                    template('templagePages', {
                        pageLimit: pageLimit,
                        page: page
                    })
                )
                //点击每一页
                $('.pagesFooter .pageList').on('click', function() {
                	document.body.scrollTop = document.documentElement.scrollTop = 0;
                    page = parseInt($(this).attr('_page'));
                    requestMusic();
                })
                $('.nextPage').on('click', function() {
                	document.body.scrollTop = document.documentElement.scrollTop = 0;
                	page++;
                	if(page>pages){
                		page=1
                	}
                    requestMusic();
                })
                $('.prevPage').on('click', function() {
                	document.body.scrollTop = document.documentElement.scrollTop = 0;
                    page--;
                	if(page<1){
                		page=pages
                	}
                    requestMusic();
                })

			}
		)
	}
	function getPageLimit(pages, showpages, page) {
        //计算当前页左偏移量
        var offsetLeft = Math.floor( showpages / 2 );
        //根据偏移量计算start
        var start = Math.max(1, page - offsetLeft);
        //根据start和showpages计算出end
        var end = Math.min(pages, start + showpages - 1);
        //根据end和showpages计算start：避免显示的页码数小于要显示的showpages
        start = Math.max(1, end - showpages + 1);
        return {
            start: start,
            end: end
        }
    }
})
