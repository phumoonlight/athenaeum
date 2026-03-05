package model;

public class OrderSearchBean {
	int orderid;
	java.sql.Timestamp orderdate;
	String customerid;
	String customername;
	double totalprice;
	public int getOrderid() {
		return orderid;
	}
	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}
	public java.sql.Timestamp getOrderdate() {
		return orderdate;
	}
	public void setOrderdate(java.sql.Timestamp orderdate) {
		this.orderdate = orderdate;
	}
	public String getCustomerid() {
		return customerid;
	}
	public void setCustomerid(String customerid) {
		this.customerid = customerid;
	}
	public String getCustomername() {
		return customername;
	}
	public void setCustomername(String customername) {
		this.customername = customername;
	}
	public double getTotalprice() {
		return totalprice;
	}
	public void setTotalprice(double totalprice) {
		this.totalprice = totalprice;
	}
	
}
