<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="model.UserBean"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<link rel="icon" href="img/favicon.jpg">
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/style.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kanit">
<title>Administrator</title>
<style>
		#customers {
    		font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    		border-collapse: collapse;
    		width: 100%;
		}
		#customers td, #customers th {
    		border: 1px solid #ddd;
    		padding: 8px;
    		text-align: center;
		}

		#customers tr:nth-child(even){background-color: #f2f2f2;}

		#customers tr:hover {background-color: #ddd;}

		#customers th {
    		padding-top: 12px;
    		padding-bottom: 12px;
    		text-align: left;
    		background-color: #047ac9;
    		color: white;
    		text-align: center;
		}
	</style>
</head>
<body>
	<table id="customers">
		<tr>
			<th>Name</th>
			<th>Address</th>
			<th>Orders</th>
			<th>Base Price</th>
			<th>Discount</th>
			<th>Delivery Charge</th>
			<th>Total Price</th>
			<th>Photo set</th>
		</tr>
		<%
			ArrayList<UserBean> OrderList = (ArrayList<UserBean>) session.getAttribute("OrderList");
			if (OrderList != null) {
				UserBean userbean;
				for (int i = 0; i < OrderList.size(); i++) {
					userbean = (UserBean) OrderList.get(i);
		%>
		<tr>
			<td><%=userbean.getName() %></td>
			<td><%=userbean.getAddress() %></td>
			<td>
			<%
			if(userbean.getNotebook()>0){
			%>
			- สมุดโน้ตที่ระลึก จำนวน <%=userbean.getNotebook() %> เล่ม<br>
			<%
			} 
			if(userbean.getWhiteshirt()>0){
			%>
			- เสื้อยืดสีขาว จำนวน <%=userbean.getWhiteshirt() %> ตัว<br>
			<%
			}
			if(userbean.getBlackshirt()>0){
			%>
			- เสื้อยืดสีดำ จำนวน <%=userbean.getBlackshirt() %> ตัว<br>
			<%
			}
			if(userbean.getWhitepolo()>0){
			%>
			- เสื้อโปโลสีขาว จำนวน <%=userbean.getWhitepolo() %> ตัว<br>
			<%
			}
			if(userbean.getBlackpolo()>0){
			%>
			- เสื้อโปโลสีดำ จำนวน <%=userbean.getBlackpolo() %> ตัว<br>
			<%
			}
			%>
			</td>
			<td><%=userbean.getBaseprice() %></td>
			<td><%=userbean.getDiscount() %></td>
			<td><%=userbean.getDeliverycharge() %></td>
			<td><%=userbean.getTotalprice() %></td>
			<td><%=userbean.getPhotoset() %></td>
		</tr>
	
		<%
            }
        }
    %>
    </table>
    <br><br>
    <div class="a-center font-kanit">
		<button onclick="window.location.href='order.html'">กลับไปหน้าหลัก</button>
	</div>
	<br><br>
</body>
</html>