$(function () {

	/*
		1.发送ajax请求 请求一级分类的数据
		2.将数据渲染到页面中
	*/

	

	// 当前页
	var page = 1;
	// 每页显示多少条数据
	var pagesize = 5;
	// 总页数
	var totalPage = 0;

	// 获取数据
	getData ();

	// 当上一页按钮被点击的时候
	$('#prev').on('click', function () {

		page--;

		if (page < 1) {
			page = 1;
			alert('已经是第一页了')
			return;
		}

		// 获取数据
		getData ();

	});

	// 当下一页按钮被点击的时候
	$('#next').on('click', function () {

		page++;

		if (page > totalPage) {
			page = totalPage;
			alert('已经没有更多数据了');
			return;
		}

		// 获取数据
		getData ();

	});

	// 获取数据
	function getData () {

		$.ajax({
			url: `${APP.baseUrl}/category/queryTopCategoryPaging`,
			type: 'get',
			data: {
				page: page,
				pageSize: pagesize
			},
			success: function (response) {
				console.log(response)
				if (response.error) {
					location.href='login.html';
				}else{
					var html = template('categoryFirstTpl', response);
					$('#categoryFirstBox').html(html);
				}

				// 计算总页数
				totalPage = Math.ceil(response.total / pagesize);
			}
		});

	}

	// 当添加分类的保存按钮被点击的时候
	$('#addCategoryFirst').on('click', function () {
		// 获取用户输入的分类名称
		var categoryName = $.trim($('#categoryName').val());

		// 如果用户没有输入分类名称
		if (!categoryName) {
			alert('请输入分类名称');
			return;
		}

		$.ajax({
			url: `${APP.baseUrl}/category/addTopCategory`,
			type: 'post',
			data: {
				categoryName
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