// 页码模块
var page = angular.module('douban.services.pagination',[])
page.service('Pagination',['$compile','$document',function($compile,$document){
	this.pagination = function(currentpage,total,show,$scope){
		var start = currentpage - Math.floor(show/2)
		start = (currentpage >= total - Math.floor(show/2)) ? (total - Math.floor(show/2)*2) : start; 
		start = start < 1 ? 1 : start;
		var end = start + show;
		end = end > total ? (total + 1) : end;
		var str = '';
		str += '<li ng-click="currentPage=1">首页</li>';
		str += '<li ng-click="currentPage=currentPage-1"><i class="fa fa-arrow-left"></i></li>';
		for(var i = start; i < end; i++){
			if(i == currentpage){
				str += '<li class="current" ng-click="getpage($event)">'+ i +'</li>'
			}else{
				str += '<li ng-click="getpage($event)">'+ i +'</li>'
			}
		}
		str += '<li ng-click="currentPage=currentPage+1"><i class="fa fa-arrow-right"></i></li>';
		str += '<li ng-click="currentPage=total">末页</li>';
		// str = "'" + str + "'"
		var $html = $compile(str)($scope);
		var ul = $document[0].getElementById('pagination');
		ul.innerHTML = '';
		for(var i = 0; i < $html.length;i++){
			ul.appendChild($html[i]);
		}		
	}
}])