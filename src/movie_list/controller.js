// 电影列表模块
angular.module('douban.movie_list',['ngRoute','douban.services.http','douban.services.pagination'])
.controller('movieListController',[
	'$scope',
	'$route',
	'$routeParams',
	'HttpService',
	'Pagination',
	function($scope,$route,$routeParams,HttpService,Pagination){
		$scope.total = 0;
		$scope.currentPage = parseInt($routeParams.page);
		var count = 10;
		var start = count * ($scope.currentPage - 1);
		HttpService.jsonp('http://api.douban.com/v2/movie/'+ $routeParams.category,
			{count:count,start:start},
			function(res){
			$scope.data = res;
			$scope.total = Math.ceil(res.total / count);
			Pagination.pagination($scope.currentPage,$scope.total,5,$scope)
			$scope.$apply();
		})
		$scope.$watch('currentPage',function(now,old){
			$route.updateParams({page:$scope.currentPage})
		})
		$scope.getpage = function($event){
			$scope.currentPage = parseInt($event.target.innerHTML)
		}
		$scope.back = function(){
			history.back();
		}			
	}])