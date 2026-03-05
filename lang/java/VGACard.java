package Lab05;

public class VGACard {
	String brand, vram, pixelShader, coreSpeed, memorySpeed;

	public void process() {
		System.out.println("แสดงภาพ");
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getVram() {
		return vram;
	}

	public void setVram(String vram) {
		this.vram = vram;
	}

	public String getPixelShader() {
		return pixelShader;
	}

	public void setPixelShader(String pixelShader) {
		this.pixelShader = pixelShader;
	}

	public String getCoreSpeed() {
		return coreSpeed;
	}

	public void setCoreSpeed(String coreSpeed) {
		this.coreSpeed = coreSpeed;
	}

	public String getMemorySpeed() {
		return memorySpeed;
	}

	public void setMemorySpeed(String memorySpeed) {
		this.memorySpeed = memorySpeed;
	}

	public String toString() {
		return "VGACard [" + (brand != null ? "brand=" + brand + ", " : "")
				+ (vram != null ? "vram=" + vram + ", " : "")
				+ (pixelShader != null ? "pixelShader=" + pixelShader + ", " : "")
				+ (coreSpeed != null ? "coreSpeed=" + coreSpeed + ", " : "")
				+ (memorySpeed != null ? "memorySpeed=" + memorySpeed : "") + "]";
	}

	public VGACard(String brand, String vram, String pixelShader, String coreSpeed, String memorySpeed) {
		super();
		this.brand = brand;
		this.vram = vram;
		this.pixelShader = pixelShader;
		this.coreSpeed = coreSpeed;
		this.memorySpeed = memorySpeed;
	}
}
