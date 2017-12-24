'use strict'

// 创建模块
var douban = angular.module('douban',['ngRoute']);
// 配置路由
douban.config(['$routeProvider',function($routeProvider){

}]);
// 控制器
douban.controller('doubanController',['$scope',function($scope){
	$scope.text = '豆瓣电影在这里';
}])
