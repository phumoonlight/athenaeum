<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="model.ProductBean"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Report</title>
	<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
	<style>
		.content {
			max-width: 350px;
			margin: auto;
			background: rgb(245, 245, 245);
			border-radius: 2.5px;
			padding: 10px;
		}

		.font-ubuntu {
			font-family: 'Ubuntu', sans-serif;
		}
		.ml-75{
			margin-left: 75px;
		}
		.ml-25{
			margin-left: 25px;
		}
		.back {
		color: black;
		text-decoration: underline;
		font-size: 150%;
		}
	</style>
</head>
<body>

	<a href="CategoryListServlet">Home</a>
	<div class="font-ubuntu">
		<div class="content">
			<h1 style="text-align: center;">Transaction Report</h1>

			<h3 class="ml-25">Customer Name</h3>
				<div class="ml-75">${customer_name}</div>

			<h3 class="ml-25">Order ID</h3>
				<div class="ml-75">${order_id}</div>

			<h3 class="ml-25">Product</h3>
				<div class="ml-75">${product_name}</div>
			
			<h3 class="ml-25">Amount</h3>
				<div class="ml-75">${quantity}</div>

			<h3 class="ml-25">Total Price</h3>
				<div class="ml-75">${total_price}</div>
			<br>
			<br>
			<br>
			<br>
			<br>
			<a class="back" href="ProductListServlet?categoryid=${category_id}">Back</a>
		</div>
	</div>
</body>

</html>