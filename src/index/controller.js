angular.module('douban.slider',[])
.controller('sliderController',['$scope','$interval',function($scope,$interval){
	var img = document.getElementsByClassName('banner-img')[0];
	var points = document.getElementsByClassName('focus-btn')[0].children;
	var index = 0;
	var width = img.offsetWidth;
	// 添加过渡
	function addTransition(){
		img.style.transition = 'all .5s'
		img.style.webkitTransition = 'all .5s'
	}
	// 移除过渡
	function removeTransition(){
		img.style.transition = null
		img.style.webkitTransition =  null	
	}
	// 滚动
	function scroll(){
		index++
		addTransition();
		img.style.left = -index*100 + '%';
		for(var i = 0; i < points.length;i++){
			points[i].classList.remove('active');
		}
		if(index > 0 && index < 7){
			points[index-1].classList.add('active');
		}else if(index >= 7){
			points[0].classList.add('active');
		}else{
			points[5].classList.add('active');
		}	
	}var timer = null;
	// 自动轮播
	timer = $interval(scroll,2000)
	// 添加监听过渡结束事件
	img.addEventListener('transitionend',function(){
		if(index >= 6){
			removeTransition();
			img.style.left = 0;
			index = 0;
		}else if(index <= 0){
			removeTransition();
			img.style.left = -index*700 + '%';
			index = 6;
		}
	},false)

	// 滑动轮播图
	var banner_box = document.getElementsByClassName('banner')[0];
	var startX = 0,moveX = 0,step = 0;
	// touchstart
	banner_box.addEventListener('touchstart',function(e){
		$interval.cancel(timer)
		// 清除上一次滑动添加的过渡，防止不跟手
		removeTransition();
		startX = e.touches[0].clientX;
	})
	// touchmove
	banner_box.addEventListener('touchmove',function(e){
		moveX = e.touches[0].clientX;
		step = moveX - startX;
		img.style.left = -index*width/8 + step + 'px';
	})
	// touchend
	banner_box.addEventListener('touchend',function(e){
		if(step < width/10*0.33333 && step > -width/10*0.33333){
			addTransition();
			img.style.left = -index*100 + '%';
		}else if(step > 0){
			index = index - 2;
			scroll();
		}else{
			scroll();
		}
		timer = $interval(scroll,2000)
	})
}])