import java.util.Random;

public class Processing {
	Random rand = new Random();
	
	int RandomNumber() {
		return rand.nextInt((11 - 1) + 1) + 1; // [ max - min + 1 ] + min
	}
}
