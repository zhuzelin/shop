$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});

// 允许cookie的写入与发送
$.ajaxSetup({crossDomain: true, xhrFields: {withCredentials: true}});

// 全局配置
var APP = {
	// 接口的基础路径
	baseUrl: 'http://fullstack.net.cn:3000'
};

$.fn.serializeToJson = function () {

	var formAry = this.serializeArray();

	// var result = {username:'zhangsan', password:123123}
	var result = {};

	formAry.forEach(function (item) {
		result[item.name] = item.value;
	});

	return result;

}

// 获取地址栏中的参数
function getUrlParams (name) {
	
	var search = location.search.slice(1);
	var ary1 = search.split('&');

	for (var i = 0; i < ary1.length; i++) {
		var ary2 = ary1[i].split('=');
		if (ary2[0] == name) {
			return ary2[1];
		}
	}

	return -1;

}