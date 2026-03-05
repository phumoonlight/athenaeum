package cs.mju.mvc.model;

public class UserBean {
	String username;
	String password;
	String lastname;
	
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public UserBean(String username, String password, String lastname) {
		super();
		this.username = username;
		this.password = password;
		this.lastname = lastname;
	}
	public UserBean() {}
	
	public String toString() {
		return "UserBean [username=" + username + ", password=" + password + ", lastname=" + lastname + "]";
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}




