package model;

public class ProductBean {
	int productid;
	String productname;
	int categoryid;
	double unitprice;
	int unitsinstock;
	int unitsonorder;
	String detail;
	String imgData;
	
	int graphicid;
	int processorid;
	float distance_between_target;
	
	public ProductBean() {
		super();
	}
	public int getProductid() {
		return productid;
	}
	public void setProductid(int productid) {
		this.productid = productid;
	}
	public String getProductname() {
		return productname;
	}
	public void setProductname(String productname) {
		this.productname = productname;
	}
	public int getCategoryid() {
		return categoryid;
	}
	public void setCategoryid(int categoryid) {
		this.categoryid = categoryid;
	}
	public double getUnitprice() {
		return unitprice;
	}
	public void setUnitprice(double unitprice) {
		this.unitprice = unitprice;
	}
	public int getUnitsinstock() {
		return unitsinstock;
	}
	public void setUnitsinstock(int unitsinstock) {
		this.unitsinstock = unitsinstock;
	}
	public int getUnitsonorder() {
		return unitsonorder;
	}
	public void setUnitsonorder(int unitsonorder) {
		this.unitsonorder = unitsonorder;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getImgData() {
		return imgData;
	}
	public void setImgData(String imgData) {
		this.imgData = imgData;
	}
	public int getGraphicid() {
		return graphicid;
	}
	public void setGraphicid(int graphicid) {
		this.graphicid = graphicid;
	}
	public int getProcessorid() {
		return processorid;
	}
	public void setProcessorid(int processorid) {
		this.processorid = processorid;
	}
	public float getDistance_between_target() {
		return distance_between_target;
	}
	public void setDistance_between_target(float distance_between_target) {
		this.distance_between_target = distance_between_target;
	}
}
