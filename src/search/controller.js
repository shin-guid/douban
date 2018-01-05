// 搜索模块
angular.module('douban.search',['douban.services.http','douban.services.pagination'])
.controller('searchController',[
	'$scope',
	'HttpService',
	'$timeout',
	'Pagination',
	function($scope,HttpService,$timeout,Pagination){
	var that = this;
	$scope.searchText = '';	
	$scope.total = 0;
	$scope.currentPage = 1;
	var count = 10;
	var start = count * ($scope.currentPage - 1);
	$scope.search = function($event){
		if(that.stopPropagation){
			$event.stopPropagation();
		}
		$scope.loading = true;
		HttpService.jsonp('http://api.douban.com/v2/movie/search',
			{
				q : '{'+ $scope.searchText +'}',
				count: count,
				start: start
			},
			function(res){
				$scope.data = res;
				$scope.total = Math.ceil(res.total / count);
				Pagination.pagination($scope.currentPage,$scope.total,5,$scope);
				$scope.loading = false;
				$scope.$apply();
			})

	}
	$scope.$watch('currentPage',function(now,old){
		if(now !== old){
			start = count * ($scope.currentPage - 1);
			HttpService.jsonp('http://api.douban.com/v2/movie/search',
			{
				q : '{'+ $scope.searchText +'}',
				count: count,
				start: start
			},
			function(res){
				$scope.data = res;
				$scope.total = Math.ceil(res.total / count);
				Pagination.pagination($scope.currentPage,$scope.total,5,$scope);
				$scope.loading = false;
				$scope.$apply();
			})
		}
	})
	$scope.getpage = function($event){
			$scope.currentPage = parseInt($event.target.innerHTML)
		}	
	$scope.showbtn = false;
	$scope.show = function(){
		$timeout(function(){
			$scope.showbtn = true;
		},25)
	}
	$scope.hide = function(){
		$timeout(function(){
			$scope.showbtn = false;
		},25)
	}

}])