// 详情模块
angular.module('douban.details',['douban.services.http'])
	   .controller('detailsController',[
	   	'$scope',
	   	'HttpService',
	   	'$location',
	   	function($scope,HttpService,$location){
	   		$scope.loading = true;
	   		$scope.title = '加载中';
	   		var detailsUrl = $location.$$url;
	   		var id = detailsUrl.replace('/details/','');
	   		// jsonp请求
	   		HttpService.jsonp('http://api.douban.com/v2/movie/subject/'+id,{},function(res){
	   			$scope.data = res;
	   			$scope.title = res.title;
	   			$scope.bgImage = res.images.large;
	   			$scope.fixedbg = {
	   				'background-image' : 'url('+ $scope.bgImage +')'
	   			}
	   			$scope.loading = false;
	   			$scope.$apply();
	   		})
	   		$scope.back = function(){
			history.back();
		}	
	   }])