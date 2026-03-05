package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import model.CustomerBean;
import model.OrderBean;

public class AdminDAO {
	static Connection con = null;
	static ResultSet rs = null;
	static PreparedStatement prestm = null;

	public ArrayList<CustomerBean> getCustomer() throws SQLException {
		CustomerBean customerbean = null;
		ArrayList<CustomerBean> customerlist = new ArrayList<CustomerBean>();
		String sql = "SELECT * FROM customers ";
		try {
			con = ConnectionManager.getConnection();
			prestm = con.prepareStatement(sql);
			rs = prestm.executeQuery();
			while (rs.next()) {
				customerbean = new CustomerBean();
				customerbean.setCustomerid(rs.getInt("CustomerID"));
				customerbean.setEmail(rs.getString("Email"));
				customerbean.setName(rs.getString("Name"));
				customerbean.setAddress(rs.getString("Address"));
				customerbean.setPhone(rs.getString("Phone"));
				customerlist.add(customerbean);
			}
			prestm.close();
			con.close();
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return customerlist;
	}
	
	public ArrayList<OrderBean> getOrders() throws SQLException {
		OrderBean obean = null;
		ArrayList<OrderBean> olist = new ArrayList<OrderBean>();
		String sql = "SELECT * FROM orders ";
		try {
			con = ConnectionManager.getConnection();
			prestm = con.prepareStatement(sql);
			rs = prestm.executeQuery();
			while (rs.next()) {
				obean = new OrderBean();
				obean.setCustomerID(rs.getInt("CustomerID"));
				obean.setOrderID(rs.getInt("OrderID"));
				olist.add(obean);
			}
			prestm.close();
			con.close();
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return olist;
	}
}
