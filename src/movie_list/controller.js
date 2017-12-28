// 创建正在上映模块
angular.module('douban.movie_list',['ngRoute','douban.services.http'])
.controller('movieListController',[
	'$scope',
	'$route',
	'$routeParams',
	'HttpService',
	function($scope,$route,$routeParams,HttpService){
		HttpService.jsonp('http://api.douban.com/v2/movie/'+ $routeParams.category,{},function(res){
			$scope.data = res;
			$scope.$apply();
		})
	}])