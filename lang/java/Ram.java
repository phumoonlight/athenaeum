package Lab05;

public class Ram {
	String brand, ramType, size;

	public void process() {
		System.out.println("หน่วยความจาสารอง");
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getRamType() {
		return ramType;
	}

	public void setRamType(String ramType) {
		this.ramType = ramType;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String toString() {
		return "Ram [" + (brand != null ? "brand=" + brand + ", " : "")
				+ (ramType != null ? "ramType=" + ramType + ", " : "") + (size != null ? "size=" + size : "") + "]";
	}

	public Ram(String brand, String ramType, String size) {
		super();
		this.brand = brand;
		this.ramType = ramType;
		this.size = size;
	}
}
