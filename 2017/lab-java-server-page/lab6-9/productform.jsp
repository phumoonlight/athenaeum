<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="model.CategoryBean"%>
<%@ page import="model.SupplierBean"%>
<%@ page import="model.ProductBean"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>FORM</title>
	<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
	<style>
		.content {
			max-width: 500px;
			margin: auto;
			background: white;
			padding: 10px;
		}

		.font-ubuntu {
			font-family: 'Ubuntu', sans-serif;
		}
</style>
</head>
<%
	String action = (String) request.getAttribute("action");
	ArrayList<CategoryBean> categorylist = (ArrayList<CategoryBean>) request.getAttribute("categorylist");
	ArrayList<SupplierBean> supplierlist = (ArrayList<SupplierBean>) request.getAttribute("supplierlist");
%>

<body>
	<a href="CategoryListServlet">Home</a>
	<div class="font-ubuntu">
		<div class="content">
			<%
				if (action.equals("add")) {
			%>
			<h1>Add Product Form</h1>

			<form action="AddProductServlet" method="post">

				Product Name <input type="text" name="productname" required><br>

				Select Category <select name="categoryid" required>
					<option value="">Select</option>
					<%
						CategoryBean categorybean;
							for (int i = 0; i < categorylist.size(); i++) {
								categorybean = (CategoryBean) categorylist.get(i);
					%>
					<option value="<%=categorybean.getCategoryID()%>">
						<%=categorybean.getCategoryName()%>
					</option>
					<%
						}
					%>
				</select>
				<br>

				Select Supplier <select name="supplierid" required>
					<option value="">Select</option>
					<%
						SupplierBean supplierbean;
							for (int i = 0; i < supplierlist.size(); i++) {
								supplierbean = (SupplierBean) supplierlist.get(i);
					%>
					<option value="<%=supplierbean.getSupplierID()%>">ID:
						<%=supplierbean.getSupplierID()%>
						<%=supplierbean.getCompanyName()%>
					</option>
					<%
						}
					%>
				</select>
				<br>

				Quantity / Unit <input type="text" name="quantity" required><br>
				Unit Price <input type="number" name="price" required min="0" oninput="this.value = Math.abs(this.value)" step="any"><br>
				Units In Stock <input type="number" name="stock" required min="0" oninput="this.value = Math.abs(this.value)"><br>
				Units On Order <input type="number" name="order" required min="0" oninput="this.value = Math.abs(this.value)"><br>
				ReorderLevel <input type="number" name="level" required><br>
				<table>
					<tr>
						<td>Discontinued </td>
						<th>
						<input type="radio" name="discon" value="0" checked> 0
  						<input type="radio" name="discon" value="1"> 1
  						</th>
  					</tr>
  				</table>
				<br>
				<br>
				<br>
				<br>
				<br>
				<input type="submit" value="Submit"> 
				<input type="reset" value="Clear">
			</form>
			<%
				}
			%>

			<%
				if (action.equals("update")) {
					ProductBean productbean = (ProductBean) request.getAttribute("productbean");
			%>
			<h1>Update Product Form</h1>

			<form action="UpdateProductServlet?productid=<%=productbean.getProductID() %>" method="post">

				Product Name <input type="text" name="productname" required value="<%=productbean.getProductName()%>"><br>

				Select Category <select name="categoryid" required>
					<option value="">Select</option>
					<%
						CategoryBean categorybean;
						for (int i = 0; i < categorylist.size(); i++) {
							categorybean = (CategoryBean) categorylist.get(i);
							if(productbean.getCategoryID()==categorybean.getCategoryID()){		
					%>
					<option value="<%=categorybean.getCategoryID()%>" selected>
						<%=categorybean.getCategoryName()%>
					</option>
					<%
							}else {
					%>
					<option value="<%=categorybean.getCategoryID()%>">
						<%=categorybean.getCategoryName()%>
					</option>
					<%
							}
						}
					%>
				</select><br>

				Select Supplier <select name="supplierid" required>
					<option value="">Select</option>
					<%
						SupplierBean supplierbean;
						for (int i = 0; i < supplierlist.size(); i++) {
							supplierbean = (SupplierBean) supplierlist.get(i);
							if(productbean.getSupplierID()==supplierbean.getSupplierID()){
					%>
					<option value="<%=supplierbean.getSupplierID()%>" selected>ID:
						<%=supplierbean.getSupplierID()%>
						<%=supplierbean.getCompanyName()%>
					</option>
					<%
							}else {
					%>
					<option value="<%=supplierbean.getSupplierID()%>">ID:
						<%=supplierbean.getSupplierID()%>
						<%=supplierbean.getCompanyName()%>
					</option>
					<%
							}
						}
					%>
				</select><br>

				Quantity / Unit <input type="text" name="quantity" required value="<%=productbean.getQuantityPerUnit()%>"><br>
				Unit Price <input step="any" type="number" name="price" required value="<%=productbean.getUnitPrice()%>"><br>
				Units In Stock <input type="number" name="stock" required value="<%=productbean.getUnitsInStock()%>"><br>
				Units On Order <input type="number" name="order" required value="<%=productbean.getUnitsOnOrder()%>"><br>
				ReorderLevel <input type="number" name="level" required value="<%=productbean.getReorderLevel()%>"><br>

				Discontinued <select name="discon" required>
					<option value="">Select</option>
					<option value="0">0</option>
					<option value="1">1</option>
				</select><br>
				<br>
				<br>
				<br>
				<br>
				<input type="submit" value="Submit"> <input type="reset" value="Clear">
			</form>
			<%
				}
			%>
		</div>
	</div>
</body>

</html>