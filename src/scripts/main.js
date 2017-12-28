'use strict'

// 创建模块
var douban = angular.module('douban',[
	'ngRoute',
	'douban.movie_list',
	'douban.details',
	'douban.search',
	'douban.us_box'
	]);
// 配置路由
douban.config(['$routeProvider',function($routeProvider){
			$routeProvider
			.when('/index',{templateUrl:'/views/index/view.html'})
			.when('/search',{
				templateUrl:'/views/search/view.html',
				controller: 'searchController'
			})
			.when('/about',{templateUrl:'/views/about/view.html'})
			.when('/us_box',{
				templateUrl:'/views/us_box/view.html',
				controller: 'usBoxController'
			})
			.when('/:category',{
				templateUrl:'/views/movie_list/view.html',
				controller: 'movieListController'
			})
			.when('/details/:id',{
				templateUrl:'/views/details/view.html',
				controller: 'detailsController'
			})
			.otherwise({redirectTo:'/index'})
		}]);
// 控制器
douban.controller('doubanController',['$scope','HttpService',function($scope,HttpService){
		
}])