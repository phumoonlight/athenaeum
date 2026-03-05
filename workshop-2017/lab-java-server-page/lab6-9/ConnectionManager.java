package service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionManager {
	static Connection con;
	public static Connection getConnection() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String url = "jdbc:mysql://localhost:3306/northwind";
			String jdbcutf8 = "?useUnicode=true&characterEncoding=UTF-8";
			String user = "root";
			String psswd = "";
			con = DriverManager.getConnection(url + jdbcutf8, user, psswd);
			
		} catch (SQLException ex) {
			ex.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return con;
	}
}