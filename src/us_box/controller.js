// 北美票房排行榜模块
angular.module('douban.us_box',['douban.services.http'])
	   .controller('usBoxController',['$scope','HttpService',function($scope,HttpService){
	   		HttpService.jsonp('http://api.douban.com/v2/movie/us_box',{},function(res){
	   			$scope.data = res;
	   			$scope.$apply();
	   		})
	   		$scope.back = function(){
			history.back();
		}	
	   }])