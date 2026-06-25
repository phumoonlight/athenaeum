package Lab05;

public class Shop {
	public static void main(String[] args) {
		Mainboard m = new Mainboard("asus", "i7", "8Gb");
		Ram r = new Ram("kinston", "ddr3", "1Gb");
		Cpu c = new Cpu("intel", "2.8", "4.0", "8mb", "8000");
		VGACard v = new VGACard("GeForce", "8GB GDDR5", "3072", "1038", "1250");
		Computer com = new Computer(c, v, r, m);
		System.out.println(com.toString());
		
		Mainboard m2 = new Mainboard("dell", "i5", "8Gb");
		Ram r2 = new Ram("kinston", "ddr3", "8Gb");
		Cpu c2 = new Cpu("intel", "2.8", "4.0", "8mb", "6700");
		VGACard v2 = new VGACard("GeForce", "8GB GDDR5", "3072", "1038", "1250");
		Computer com2 = new Computer(c2, v2, r2, m2);
		System.out.println(com2.toString());
	}
}
