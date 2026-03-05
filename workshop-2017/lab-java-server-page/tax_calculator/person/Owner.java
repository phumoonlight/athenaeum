package person;

public class Owner implements Person {
	long tax = 0;
	long[] threshold = { 150000, 150000, 200000, 250000, 250000, 1000000, 3000000 };
	
	@Override
	public long getTax(long revenue, long expense) {
		int i = 0;
		// -------------------------------------------------------------
		while (true) {
			if (i > 6)
				break;
			revenue = revenue - threshold[i];
			if (revenue < 0) {
				revenue = revenue + threshold[i];
				tax = (long) (tax + (revenue * (i * 0.05)));
				return (long) (tax - expense*0.1);
			}
			if (i != 0)
				tax = (long) (tax + (threshold[i] * (i * 0.05)));
			i++;
		}
		// -------------------------------------------------------------
		return (long) (tax - expense*0.1);
	}

	@Override
	public long getTax(long revenue) {
		// TODO Auto-generated method stub
		return 0;
	}
}
