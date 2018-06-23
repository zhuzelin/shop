$(function () {
	// 获取二级分类页面的数据
	$.ajax({
		url: `${APP.baseUrl}/category/querySecondCategoryPaging`,
		type: 'get',
		data: {
			page: 1,
			pageSize: 10
		},
		success: function (response) {
			console.log(response);
			var html = template('categorySecondTpl', {
				list: response,
				api: APP.baseUrl
			});
			$('#categorySecondBox').html(html);
		}
	});

	// 获取一级分类数据 渲染在弹出框中
	$.ajax({
		url: `${APP.baseUrl}/category/queryTopCategoryPaging`,
		type: 'get',
		data: {
			page:1,
			pageSize: 100000
		},
		success: function (response) {
			console.log(response);
			var html = template('categoryFirstTpl', response);
			$('#categoryFirstBox').html(html);
		}
	});

	var brandLogo = '';

	// 文件上传第三步 插件调用
	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	    	console.log(data);
	    	// 存储图片地址
	    	brandLogo = data._response.result.picAddr;
	    	// 拼接图片url
	    	var imgUrl= APP.baseUrl + data._response.result.picAddr;
	    	// 将图片渲染到页面中
	     	$("#imgPreview").attr("src",imgUrl);
	    }
	});

	// 当添加二级分类按钮被点击的时候
	$('#save').on('click', function () {
			
		// 获取二级分类名称
		var brandName = $('#brandName').val();
		// 获取所属一级分类ID
		var categoryId = $('#categoryFirstBox').val();

		var hot = 1;

		$.ajax({
			type: 'post',
			url: `${APP.baseUrl}/category/addSecondCategory`,
			data: {
				brandName,
				categoryId,
				brandLogo,
				hot
			},
			success: function (response) {
				if (response.success) {
					location.reload();
				}else {
					alert(response.message);
				}
			}
		})

	});

});