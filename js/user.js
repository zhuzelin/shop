// 判断用户是否登录
$.ajax({
	type:'get',
	async: false,
	url:`${APP.baseUrl}/employee/checkRootLogin`,
	success: function (response) {
		if (response.error) {
			location.href = 'login.html';
		}
	}
});


$(function () {
	/*
		查询用户 展示用户
	*/

	$.ajax({
		type: 'get',
		url: `${APP.baseUrl}/user/queryUser`,
		data: {
			page: 1,
			pageSize: 100
		},
		success: function (response) {
			console.log(response);
			// 拼接数据
			var html = template('userTpl', response);
			// 渲染数据
			$('#userBox').append(html);
		}
	});

	// 更改用户的状态
	$('#userBox').on('click', '.changeStatus', function () {

		// 获取用户ID
		var id = $(this).data('user-id');

		// 获取用户当前状态
		var isDelete = $(this).data('user-isdelete');

		$.ajax({
			type: 'post',
			url: `${APP.baseUrl}/user/updateUser`,
			data: {
				id: id,
				isDelete: isDelete == 1 ? 0 : 1
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

})