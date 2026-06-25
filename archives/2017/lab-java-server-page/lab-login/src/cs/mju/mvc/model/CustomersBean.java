package cs.mju.mvc.model;

public class CustomersBean {
	String customerid;
	String companyname;
	String contactname;
	String contacttitle;
	String address;
	String city;
	String region;
	String postalcode;
	String country;
	String phone;
	String fax;
	
	public CustomersBean() {}
	public CustomersBean(String customerid, String companyname, String contactname, String contacttitle, String address,
			String city, String region, String postalcode, String country, String phone, String fax) {
		super();
		this.customerid = customerid;
		this.companyname = companyname;
		this.contactname = contactname;
		this.contacttitle = contacttitle;
		this.address = address;
		this.city = city;
		this.region = region;
		this.postalcode = postalcode;
		this.country = country;
		this.phone = phone;
		this.fax = fax;
	}
	@Override
	public String toString() {
		return "CustomersBean [customerid=" + customerid + ", companyname=" + companyname + ", contactname="
				+ contactname + ", contacttitle=" + contacttitle + ", address=" + address + ", city=" + city
				+ ", region=" + region + ", postalcode=" + postalcode + ", country=" + country + ", phone=" + phone
				+ ", fax=" + fax + "]";
	}
	public String getCustomerid() {
		return customerid;
	}
	public void setCustomerid(String customerid) {
		this.customerid = customerid;
	}
	public String getCompanyname() {
		return companyname;
	}
	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}
	public String getContactname() {
		return contactname;
	}
	public void setContactname(String contactname) {
		this.contactname = contactname;
	}
	public String getContacttitle() {
		return contacttitle;
	}
	public void setContacttitle(String contacttitle) {
		this.contacttitle = contacttitle;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public String getPostalcode() {
		return postalcode;
	}
	public void setPostalcode(String postalcode) {
		this.postalcode = postalcode;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	
}
