<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<!-- Custom Theme files -->
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
<!-- Custom Theme files -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords"
	content="Flat Purple Login Form Responsive, Login form web template, Sign up Web Templates, Flat Web Templates, Login signup Responsive web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
<link
	href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
	rel='stylesheet' type='text/css'>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<h1>Invalid Login! Please Try Again</h1>
<div class="login">
		<div class="buttons">
			<ul>
				<li><a class="face" href="#"><span class="face"></span>Login to Facebook</a></li>
			</ul>
		</div>
		<form action="LoginServlet" method="post">
			<input type="text" name="user" placeholder="Username" required> 
			<input type="password" name="pass" placeholder="Password" required>
			<br><br>
			<label class="hvr-sweep-to-bottom"> <input type="submit" value="login"></label>
		</form>
	</div>
</body>
</html>