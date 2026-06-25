package person;

public class Developer implements Person {
	long tax = 0;
	long[] threshold = { 150000, 150000, 200000, 250000, 250000, 1000000, 3000000 };

	@Override
	public long getTax(long revenue) {
		int i = 0;
		// -------------------------------------------------------------
		while (true) {
			if (i > 6)
				break;
			revenue = revenue - threshold[i];
			if (revenue < 0) {
				revenue = revenue + threshold[i];
				tax = (long) (tax + (revenue * (i * 0.05)));
				return tax;
			}
			if (i != 0)
				tax = (long) (tax + (threshold[i] * (i * 0.05)));
			i++;
		}
		// -------------------------------------------------------------
		return tax;
	}

	@Override
	public long getTax(long revenue, long expense) {
		// TODO Auto-generated method stub
		return 0;
	}

}
