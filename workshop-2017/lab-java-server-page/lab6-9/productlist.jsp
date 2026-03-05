<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="model.ProductBean"%>
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
<meta charset="UTF-8">
<title>Products</title>
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
	ProductBean bean = null;
	ArrayList<ProductBean> list = (ArrayList<ProductBean>) request.getAttribute("productlist");
	%>
	<div class="font-ubuntu">
		<div style="text-align: center;">
			<h1>Products List</h1>
			<table id="table">
				<tr>
					<th>Product Name</th>
					<th>Quantity Per Unit</th>
					<th>Unit Price</th>
					<th>Action</th>
				</tr>
				<% 
				for(int i=0 ; i < list.size( ) ; i++){
					bean = (ProductBean) list.get(i);
				%>
				<tr>
					<td><%= bean.getProductName() %></td>
					<td><%= bean.getQuantityPerUnit() %></td>
					<td><%= bean.getUnitPrice() %></td>
					<td>
						<form action="BuyProductServlet" method="get">
						
							<input style="width: 9%" type="number" name="quantity<%=bean.getProductID() %>" min="0" oninput="this.value = Math.abs(this.value)">
							<input type="submit" value="Purchase">
							<input type="hidden" name="productid" value="<%=bean.getProductID()%>">
							
						</form>
						
						<a href="UpdateProductServlet?productid=<%=bean.getProductID() %>&action=update">update</a>
						<a href="DeleteProductServlet?productid=<%=bean.getProductID() %>&categoryid=<%=bean.getCategoryID() %>">delete</a>
					</td>
				</tr>
				<%
				}
				%>
			</table>
		</div>

	</div>
</body>
</html>