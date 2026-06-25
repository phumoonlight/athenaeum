package model;

import java.sql.Blob;

public class CategoryBean {
	int categoryid;
	String categoryname;
	
	public CategoryBean() {
		super();
	}

	public CategoryBean(int categoryid, String categoryname, Blob picture, String imgData) {
		super();
		this.categoryid = categoryid;
		this.categoryname = categoryname;
	}

	public int getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(int categoryid) {
		this.categoryid = categoryid;
	}

	public String getCategoryname() {
		return categoryname;
	}

	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}
}
