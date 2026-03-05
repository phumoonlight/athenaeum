package Lab05;

public class Cpu {
	String brand, clock, turbo, cacheL3, mark3D;

	public void process() {
		System.out.println("การประมวลผลหลัก");
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getClock() {
		return clock;
	}

	public void setClock(String clock) {
		this.clock = clock;
	}

	public String getTurbo() {
		return turbo;
	}

	public void setTurbo(String turbo) {
		this.turbo = turbo;
	}

	public String getCacheL3() {
		return cacheL3;
	}

	public void setCacheL3(String cacheL3) {
		this.cacheL3 = cacheL3;
	}

	public String getMark3D() {
		return mark3D;
	}

	public void setMark3D(String mark3d) {
		mark3D = mark3d;
	}

	public Cpu(String brand, String clock, String turbo, String cacheL3, String mark3d) {
		super();
		this.brand = brand;
		this.clock = clock;
		this.turbo = turbo;
		this.cacheL3 = cacheL3;
		mark3D = mark3d;
	}

	public String toString() {
		return "Cpu [brand=" + brand + ", clock=" + clock + ", turbo=" + turbo + ", cacheL3=" + cacheL3 + ", mark3D="
				+ mark3D + "]";
	}
}