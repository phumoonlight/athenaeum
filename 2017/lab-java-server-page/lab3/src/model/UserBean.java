package model;

public class UserBean {
	String name;
	String address;
	int notebook;
	int whiteshirt;
	int blackshirt;
	int whitepolo;
	int blackpolo;
	
	int totalprice;
	int deliverycharge;
	int photoset;
	int baseprice;
	int discount;
	
	public UserBean() {
		super();
	}
	public UserBean(String name, String address, int notebook, int whiteshirt, int blackshirt, int whitepolo,
			int blackpolo, int totalprice, int deliverycharge, int photoset, int baseprice, int discount) {
		super();
		this.name = name;
		this.address = address;
		this.notebook = notebook;
		this.whiteshirt = whiteshirt;
		this.blackshirt = blackshirt;
		this.whitepolo = whitepolo;
		this.blackpolo = blackpolo;
		this.totalprice = totalprice;
		this.deliverycharge = deliverycharge;
		this.photoset = photoset;
		this.baseprice = baseprice;
		this.discount = discount;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getNotebook() {
		return notebook;
	}
	public void setNotebook(int notebook) {
		this.notebook = notebook;
	}
	public int getWhiteshirt() {
		return whiteshirt;
	}
	public void setWhiteshirt(int whiteshirt) {
		this.whiteshirt = whiteshirt;
	}
	public int getBlackshirt() {
		return blackshirt;
	}
	public void setBlackshirt(int blackshirt) {
		this.blackshirt = blackshirt;
	}
	public int getWhitepolo() {
		return whitepolo;
	}
	public void setWhitepolo(int whitepolo) {
		this.whitepolo = whitepolo;
	}
	public int getBlackpolo() {
		return blackpolo;
	}
	public void setBlackpolo(int blackpolo) {
		this.blackpolo = blackpolo;
	}
	public int getTotalprice() {
		return totalprice;
	}
	public void setTotalprice(int totalprice) {
		this.totalprice = totalprice;
	}
	public int getDeliverycharge() {
		return deliverycharge;
	}
	public void setDeliverycharge(int deliverycharge) {
		this.deliverycharge = deliverycharge;
	}
	public int getPhotoset() {
		return photoset;
	}
	public void setPhotoset(int photoset) {
		this.photoset = photoset;
	}
	public int getBaseprice() {
		return baseprice;
	}
	public void setBaseprice(int baseprice) {
		this.baseprice = baseprice;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
	}
}
