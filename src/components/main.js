'use strict'

// 创建模块
var douban = angular.module('douban',[
	'ngRoute',
	'douban.movie_list',
	'douban.details',
	'douban.search',
	'douban.us_box',
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
			.when('/details/:id',{
				templateUrl:'/views/details/view.html',
				controller: 'detailsController'
			})
			.when('/:category/:page',{
				templateUrl:'/views/movie_list/view.html',
				controller: 'movieListController'
			})
			.otherwise({redirectTo:'/index'})
		}]);
// 控制器
douban.controller('doubanController',['$scope','$location',function($scope,$location){
		// 底部导航切换
		$scope.$local = $location;
		$scope.$watch('$local.path()',function(now,old){
			if(now == '/about'){
				$scope.path = 'about';
			}else if(now == '/search' || now.startsWith('/details') && old == '/search'){
				$scope.path = 'search';
			}else{
				$scope.path = 'index';
			}
		})
}])