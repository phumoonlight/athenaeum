<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="model.CategoryBean"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Categories</title>
<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
<style>
.column {
	float: left;
	width: 48%;
	padding: 10px;
}

.row:after {
	content: "";
	display: table;
	clear: both;
}

.font-ubuntu {
	font-family: 'Ubuntu', sans-serif;
}

.description {
	color: black;
	text-decoration: none;
}
</style>
</head>
<body>
	<%
		ArrayList<CategoryBean> list = (ArrayList<CategoryBean>) request.getAttribute("categorylist");
		CategoryBean bean;
	%>
	<div class="font-ubuntu" style="text-align: center;">
		<h1>Categories List</h1>
		<h3>Search</h3>
		<form action="SearchServlet" method="get">
			<input type="text" name="searchkey"> 
			<input type="submit" value="Search"> 
			<input type="reset" value="Clear">
		</form>
		<h3>Add Product</h3>
		<a href="AddProductServlet?action=add"><button>Add product</button></a>

		<div class="row">
			<%
				for(int i=0 ; i < list.size() ; i++) {
					bean = (CategoryBean) list.get(i);
				%>
			<div class="column">
				<a class="description" href="ProductListServlet?categoryid=<%=bean.getCategoryID() %>"> 
					<img src="data:image/jpeg;base64,<%= bean.getImgData() %>"><br> 
					<strong><%= bean.getCategoryName() %></strong><br> 
					<%= bean.getDescription() %><br>
				</a>
			</div>
			<%
				}
				%>
		</div>
	</div>
</body>
</html>