package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.CustomerBean;
import service.ConnectionManager;

public class RegisterDAO {
	static Connection con = null;
	static ResultSet rs = null;
	static PreparedStatement prestm = null;
	
	public static int register(String email, String password, String name, String address, String phone) throws SQLException {
		int addresult = 0;
		String sql = "SELECT * FROM customers WHERE email = ?";
		try {
			//connection and prepare-statement
			con = ConnectionManager.getConnection();
			prestm = con.prepareStatement(sql);
			int i = 0;
			prestm.setString(++i, email);
			//execute sql
			rs = prestm.executeQuery();
			if (rs.next()) {
				
			}else {
				addresult = insert(email, password, name, address, phone);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			prestm.close();
			con.close();
			rs.close();
		}
		return addresult;
	}
	
	public static int insert(String email, String password, String name, String address, String phone) throws SQLException {
		int addresult = 0;
		String sql = "INSERT INTO customers (Name,password,email,address,phone) VALUES (?,?,?,?,?)";
		try {
			//connection and prepare-statement
			con = ConnectionManager.getConnection();
			prestm = con.prepareStatement(sql);
			int i = 0;
			prestm.setString(++i, name);
			prestm.setString(++i, password);
			prestm.setString(++i, email);
			prestm.setString(++i, address);
			prestm.setString(++i, phone);
			//execute sql
			addresult = prestm.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			prestm.close();
			con.close();
			rs.close();
		}
		return addresult;
	}
}
