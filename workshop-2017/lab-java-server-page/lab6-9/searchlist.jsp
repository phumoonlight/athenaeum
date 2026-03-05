<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="model.OrderSearchBean"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>SearchResult</title>
<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
<style>
#table {
	font-family: 'Ubuntu', sans-serif;
	border-collapse: collapse;
	width: 100%;
}
#table td, #table th {
	border: 1px solid #ddd;
	padding: 8px;
	text-align: center;
}
#table tr:nth-child(even) {
	background-color: #f2f2f2;
}
#table tr:hover {
	background-color: #ddd;
}
#table th {
	padding-top: 12px;
	padding-bottom: 12px;
	text-align: center;
	background-color: #047ac9;
	color: white;
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
<a href="CategoryListServlet">Home</a>
	<%
	OrderSearchBean bean = null;
	ArrayList<OrderSearchBean> list = (ArrayList<OrderSearchBean>) request.getAttribute("searchlist");
	%>
	<div class="font-ubuntu">
		<div style="text-align: center;">
			<h1>Search Result [ keyword: ${keyword} ]</h1>
			<table id="table">
				<tr>
					<th>Order ID</th>
					<th>Order Date</th>
					<th>Customer ID</th>
					<th>Customer Name</th>
					<th>Total Price</th>
				</tr>
				<% 
				for(int i=0 ; i < list.size( ) ; i++){
					bean = (OrderSearchBean) list.get(i);
				%>
				<tr>
					<td><%= bean.getOrderid() %></td>
					<td><%= bean.getOrderdate() %></td>
					<td><%= bean.getCustomerid() %></td>
					<td><%= bean.getCustomername() %></td>
					<td><%= bean.getTotalprice() %></td>
				</tr>
				<%
				}
				%>
			</table>
		</div>
	</div>
</body>
</html>