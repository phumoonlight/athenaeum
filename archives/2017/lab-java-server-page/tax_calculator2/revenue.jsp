<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Lab1-PersonTax</title>
<style>
	body {
		border: solid black 5 px;
	}
</style>
</head>
<body style="text-align: center;">
    <form action="RevenueServlet" method="post">
       Revenue <input type="number" name="revenue" placeholder="revenue"><br>
       Expense <input type="number" name="expense"  placeholder="expense">
        <input type="submit">
    </form>
	revenue = ${revenue} <br>
    expense = ${expense} <br>
    developer tax = ${dev_tax} <br>
    owner tax = ${owner_tax} <br>
    
</body>
</html>