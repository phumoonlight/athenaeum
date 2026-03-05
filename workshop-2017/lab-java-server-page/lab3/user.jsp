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
	<title>สรุปการสั้งซื้อ</title>
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
	<br><br>
	<div class="shadow-title font-kanit a-center title-text">
		สรุปผลการซื้อของที่ระลึก
	</div>
	<div class="contentuser1 font-kanit">
	<%
	ArrayList<UserBean> OrderList = (ArrayList<UserBean>) session.getAttribute("OrderList");
	if(OrderList!= null){
		UserBean userbean = (UserBean)OrderList.get(OrderList.size()-1);
	%>
		<div class="contentuser2">
			<div style="margin-left: 50px;">
				<div class="boldtext">ชื่อผู้สั่งซื้อ (Name) :</div><%=userbean.getName() %><br>
				<div class="boldtext">ที่อยู่ (Address) :</div><%=userbean.getAddress() %><br>
				<div class="boldtext">รายการของที่ระลึกที่สั่ง</div>
			</div>
			<div style="margin-left: 100px;">
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
			</div>
			<div style="margin-left: 50px;">
				<div class="boldtext">ราคาของที่ระลึก (Price) :</div><%=userbean.getBaseprice() %> บาท<br>
				<div class="boldtext">ส่วนลด (Discount) :</div><%=userbean.getDiscount() %> บาท<br>
				<div class="boldtext">ค่าจัดส่ง (Delivery Charge) :</div><%=userbean.getDeliverycharge() %> บาท<br>
				<div class="boldtext">ราคาที่ต้องชำระ (Total Price) :</div><%=userbean.getTotalprice() %> บาท<br>
				<div class="boldtext">รับบัตร Memorial of Handshake Photo set :</div><%=userbean.getPhotoset() %> ใบ<br>
			</div>
	<%
	}
	%>
		</div>
	<br>
	<div class="a-center font-kanit">
		<button onclick="window.location.href='order.html'">กลับไปหน้าหลัก</button>
	</div>
	<br>
	</div>
</body>
</html>