$(function(){
	$tabClick = $('.j_tab_wrap').find('li');
	$tabClick.bind('click',function(){
		var _index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('.tab_li').eq(_index).addClass('tab_li_active').siblings().removeClass('tab_li_active');
	});
});