// 北美票房排行榜模块
angular.module('douban.us_box',['douban.services.http'])
	   .controller('usBoxController',['$scope','HttpService',function($scope,HttpService){
	   	$scope.loading = true;
	   	$scope.title = '加载中';
	   		HttpService.jsonp('http://api.douban.com/v2/movie/us_box',{},function(res){
	   			$scope.data = res;
	   			$scope.title = res.title;
	   			$scope.loading = false;
	   			$scope.$apply();
	   		})
	   		$scope.back = function(){
			history.back();
		}	
	   }])