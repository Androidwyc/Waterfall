$(window).on('load',function() {
	waterfull('main' ,'box');
	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	window.onscroll=function(){
        if(checkscrollside()){
            $.each( dataInt.data, function( index, value ){
                var $oPin = $('<div>').addClass('box').appendTo( $( "#main" ) );
                var $oBox = $('<div>').addClass('pic').appendTo( $oPin );
                $('<img>').attr('src','./images/' + $( value).attr( 'src') ).appendTo($oBox);
            });
            waterfull('main' ,'box');
        };
    }
})

function waterfull(){
	//获取box元素
	var $boxs = $('#main>div');
	//获取第一个box元素的宽，包括padding值
	var w = $boxs.eq(0).outerWidth();
	//获取显示列数
	var cols = Math.floor($(window).width() / w);
	//设置main的宽度
	$('#main').width(w * cols).css('margin','0 auto');
	var hArr = [];
	//遍历box元素
	$boxs.each(function(index , val){
		$(val).css('position','');
		//console.log(index);
		var h = $boxs.eq(index).outerHeight();
		if(index < cols){
			//算出高度
			hArr[index] = h ;
		}else{
			//求出前6个值的最小值
			var minH = Math.min.apply(null, hArr);
			//求出最小值的索引值
			var minHindex = $.inArray(minH,hArr);
			//设置第7张图片的位置
			$(val).css({
				'position' : 'absolute' ,
				'top' : minH +'px',
				'left' : minHindex * w +'px'
			})
			// console.log(val);
			hArr[minHindex] += $boxs.eq(index).outerHeight();
		}
	})
	// console.log(hArr)
}
function checkscrollside(){
	var $lastBox = $('#main>div').last();
	// console.log($lastBox);
	var lastBoxDis =$lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
	var scrollTop =$(window).scrollTop();
	var docH = $(window).height();
	return(lastBoxDis<scrollTop+docH)?true:false;
}