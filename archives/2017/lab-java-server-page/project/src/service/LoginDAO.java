package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.CustomerBean;
import service.ConnectionManager;

public class LoginDAO {
	static Connection con = null;
	static ResultSet rs = null;
	static PreparedStatement prestm = null;

	public static CustomerBean login(String email, String password) throws SQLException {
		CustomerBean customerbean = null;
		String sql = "SELECT * FROM customers WHERE email = ? AND password = ?";
		try {
			//connection and prepare-statement
			con = ConnectionManager.getConnection();
			prestm = con.prepareStatement(sql);
			int i = 0;
			prestm.setString(++i, email);
			prestm.setString(++i, password);
			//execute sql
			rs = prestm.executeQuery();
			if (rs.next()) {
				customerbean = new CustomerBean();
				customerbean.setCustomerid(rs.getInt("CustomerID"));
				customerbean.setEmail(rs.getString("Email"));
				customerbean.setName(rs.getString("Name"));
				customerbean.setPassword(rs.getString("Password"));
				customerbean.setAddress(rs.getString("Address"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			prestm.close();
			con.close();
			rs.close();
		}
		return customerbean;
	}
}
