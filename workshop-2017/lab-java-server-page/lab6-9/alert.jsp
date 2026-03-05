<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>ALERT</title>
	<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
	<style>
		.font-ubuntu {
			font-family: 'Ubuntu', sans-serif;
		}

		.center {
			text-align: center;
		}
	</style>
</head>

<body>
	<div class="font-ubuntu center">
		<h2>Target : ${product_name}</h2>
		<h1>${alert}</h1>
		<br>
		<a href="ProductListServlet?categoryid=${category_id}"><button>Back</button></a>
	</div>
</body>

</html>