import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class PGbmi {

	public static void main(String[] args) throws java.text.ParseException {
		System.out.println("Lab01_Bmi");
		Scanner input = new Scanner(System.in);
		Person P = new Person();
		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		float weight = 0, height = 0;

		// Input - Date [ Current and Pregnant ]
		System.out.println("Enter pregnant date (Day-Month-Year : dd-MM-yyyy)");
		String date = input.next();
		Date pregnant_date = df.parse(date);
		P.setPregnantDate(pregnant_date);

		System.out.println("Enter current date (Day-Month-Year : dd-MM-yyyy)");
		date = input.next();
		Date current_date = df.parse(date);
		P.setCurrentDate(current_date);

		// Input - Weight and Height
		System.out.println("Enter mom's weight [Pregnant] (kg)");
		weight = input.nextFloat();
		P.setMomPregnantWeight(weight);

		// System.out.println("Enter mom's weight [Current] (kg)");
		// weight = input.nextFloat();
		// P.setMomCurrentWeight(weight);

		System.out.println("Enter mom's height (centimeter)");
		height = input.nextFloat();
		P.setMomHeight(height);

		// Output
		System.out.println("Output");
		System.out.println("Mom's body mass index : " + P.getBMI());
		System.out.println("Mom's weight should increase approximately : " + P.getMinIncrementWeight() + "-"
				+ P.getMaxIncrementWeight() + " kilograms.");
		System.out
				.println("Weeks between pregnant date and current date : " + P.getPregDay_and_CurrentDay() + " weeks");

	}
}
