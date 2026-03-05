package Lab05;

public class Mainboard {
	String brand;
	String cpuType;
	String maxMemory;

	public void process() {
		System.out.println("รองรับการประมวลผล");
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getCpuType() {
		return cpuType;
	}

	public void setCpuType(String cpuType) {
		this.cpuType = cpuType;
	}

	public String getMaxMemory() {
		return maxMemory;
	}

	public void setMaxMemory(String maxMemory) {
		this.maxMemory = maxMemory;
	}

	public String toString() {
		return "Mainboard [brand=" + brand + ", cpuType=" + cpuType + ", maxMemory=" + maxMemory + "]";
	}

	public Mainboard(String brand, String cpuType, String maxMemory) {
		super();
		this.brand = brand;
		this.cpuType = cpuType;
		this.maxMemory = maxMemory;
	}
}
