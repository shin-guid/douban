'use strict'

var http = angular.module('douban.services.http',[])
	http.service('HttpService',['$window','$document',function($window,$document){
		this.jsonp = function(url,data,callback){
			// 回调函数名随机后缀
			var fnSuffix = Math.random().toString().replace('.','');
			// 回调函数名
			var cbFuncName = 'json_cb' + fnSuffix;
			$window[cbFuncName] = function(data){
				callback(data);
				$document[0].body.removeChild(script);
			};
			var queryString = (url.indexOf('?')== -1) ? '?' : '';
			for(var key in data){
				queryString += key + '=' + data[key] + '&';
			}
			queryString += 'callback=' + cbFuncName;
			// 在页面追加script节点 
			var script = $document[0].createElement('script');
			script.src = url + queryString;
			$document[0].body.appendChild(script);
		}
	   }])
