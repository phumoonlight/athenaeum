import java.util.*;

public class Person {

	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		Circus circus = new Circus();
		Zoo zoo = new Zoo();
		System.out.println("Lab04 - Contents : Modifiers");
		System.out.println("Proposition - Zoo and Circus");
		System.out.print("Choice - 1 for Zoo / 2 for Circus : ");
		int Choice = input.nextInt();

		switch (Choice) {
		case 1:
			zoo.Zoo();
			break;
		case 2:
			circus.Circus();
			break;
		}
	}
}
