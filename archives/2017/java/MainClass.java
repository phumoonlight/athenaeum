import java.io.BufferedReader;
import java.io.InputStreamReader;

public class MainClass {

	public static void main(String args[]) {
		try {
		// ประกาศตัวแปร InputStreamReader
		InputStreamReader isr = new InputStreamReader(System.in);
		// ประกาศตัวแปร BufferedReader
		BufferedReader br = new BufferedReader(isr);
		while (true) {
		System.out.print("Radius? ");
		String str = br.readLine(); // รับข้อมูลแล้วเก็บไว้ในตัวแปร String
		double radius;
		try {
		// เปลี่ยนประเภทตัวแปรจาก String เป็น Double
		radius = Double.valueOf(str).doubleValue();
		} catch (NumberFormatException nfe) {
		System.out.println("Incorrect format!");
		continue;
		}
		if (radius <= 0) {
		System.out.println("Radius must be positive!");
		continue;
		}
		double area = Math.PI * radius * radius;
		System.out.println("Area is " + area);
		return;
		}
		} catch (Exception e) {
		e.printStackTrace();
		}
		}
		}

