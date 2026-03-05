package cs.mju.mvc.service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import cs.mju.mvc.model.UserBean;

public class LoginDAO {
	static Connection currentCon = null;
	static ResultSet rs = null;

	public static UserBean login(String userName, String password) throws SQLException {

		Statement stmt = null; 
		UserBean userBean = null;
		String searchQuery = "SELECT FirstName,PostalCode,LastName FROM `employees` WHERE FirstName='"+userName+"'";

		try {
			currentCon = ConnectionManager.getConnection();
			stmt = currentCon.createStatement(); 
			rs = stmt.executeQuery(searchQuery); 
			if (rs.next()) {
				String user = rs.getString("FirstName");
				String pass = rs.getString("PostalCode");
				String lastname = rs.getString("LastName");
				
				if(userName.equals(user) && password.equals(pass)) {
					userBean = new UserBean();
					userBean.setUsername(user);
					userBean.setPassword(pass);
					userBean.setLastname(lastname);
				}	
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			rs.close();
			stmt.close();
			currentCon.close();
		}
		return userBean;
	}
}