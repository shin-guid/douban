// 搜索模块
angular.module('douban.search',['douban.services.http'])
.controller('searchController',['$scope','HttpService',function($scope,HttpService){
	$scope.searchText = '';	
	$scope.search = function(){
		$scope.loading = true;
		HttpService.jsonp(
			'http://api.douban.com/v2/movie/search',
			{
				q : '{'+ $scope.searchText +'}'
			},
			function(res){
				$scope.data = res;
				$scope.loading = false;
				$scope.$apply();
			})
	}	
}])