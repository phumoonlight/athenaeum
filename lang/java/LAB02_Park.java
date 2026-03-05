import java.util.*;

public class LAB02_Park {

	public static void main(String[] args) {

		System.out.println("Calculating Parking Cost Program");
		System.out.println("Instruction :");
		System.out.println("\t 1.Using integer only");
		System.out.println("\t 3.If you type data as overscale or underscale of the data, the program recognizes you want to get the data as backward or forward.\n");
		System.out.println("\t The Data scale is below:");
		System.out.println("\t\t- Days of Month: 1-31 or 30 (April,June,September and November) or 29(leap year February) or 28(February)");
		System.out.println("\t\t- Month: 1-12\n\t\t- Hour: 0-23\n\t\t- Minute: 0-59");

		Scanner input = new Scanner(System.in);
		
		System.out.println("Parking-in Date");
		System.out.print("Enter days of month: ");
		int d = input.nextInt();
		System.out.print("Enter number of month: ");
		int m = input.nextInt();
		System.out.print("Enter year: ");
		int y = input.nextInt();
		System.out.print("Enter hour: ");
		int hrs = input.nextInt();
		System.out.print("Enter minute: ");
		int min = input.nextInt();

		Date D1 = new Date(y - 1900, m - 1, d, hrs, min);

		System.out.format("%te %tB, %tY %tl:%tM %tp\n", D1, D1, D1, D1, D1, D1);
		
		System.out.println("\nParking-out Date");
		System.out.print("Enter days of month: ");
		d = input.nextInt();
		System.out.print("Enter number of month: ");
		m = input.nextInt();
		System.out.print("Enter year: ");
		y = input.nextInt();
		System.out.print("Enter hour: ");
		hrs = input.nextInt();
		System.out.print("Enter minute: ");
		min = input.nextInt();

		Date D2 = new Date(y - 1900, m - 1, d, hrs, min);

		System.out.format("%te %tB, %tY %tl:%tM %tp\n", D2, D2, D2, D2, D2, D2);

		long dif_min = (D2.getTime() - D1.getTime()) / 60000;
		int payBaht = 0;

		System.out.format("First and Last Date is Different for %d minutes\n", dif_min);

			if (dif_min >= 1440) {
				payBaht += 200 * (dif_min/1440);
				dif_min %= 1440;
			}
			
			if (dif_min > 360) 
				payBaht += 200;
			else if (dif_min > 210) 
				payBaht += 100;
			else if (dif_min > 150) 
				payBaht += 40;
			else if (dif_min > 90) 
				payBaht += 30;
			else if (dif_min > 30) 
				payBaht += 20;
			else if (dif_min > 8) 
				payBaht += 10;
			
				
		if (payBaht > 0)
			System.out.println("You must pay " + payBaht + " Baht for parking cost");
		else
			System.out.println("You don't pay any cost.");
	}
}