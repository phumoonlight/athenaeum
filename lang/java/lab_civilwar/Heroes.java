import java.util.Random;

public class Heroes {
	Random rand = new Random();
	private int staticPower = 0;

	void GeneratePower() {
		staticPower = rand.nextInt((100 - 50) + 1) + 50; // [ max - min + 1 ] + min
	}

	int Power() {
		return staticPower;
	}

	String Name() {
		return "MarvelHeroes";
	}

	String Ultimate() {
		return "Default Utimate";
	}
}
