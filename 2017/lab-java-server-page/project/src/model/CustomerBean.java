package model;

public class CustomerBean {
	int customerid;
	String email;
	String password;
	String address;
	String name;
	String phone;

	public CustomerBean() {
	}

	public CustomerBean(int customerid, String email, String password, String address, String name, String phone) {
		super();
		this.customerid = customerid;
		this.email = email;
		this.password = password;
		this.address = address;
		this.name = name;
		this.phone = phone;
	}

	public int getCustomerid() {
		return customerid;
	}

	public void setCustomerid(int customerid) {
		this.customerid = customerid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
