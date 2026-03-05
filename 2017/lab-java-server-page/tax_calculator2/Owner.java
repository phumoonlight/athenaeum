package model;

public class Owner implements Person {
	private long revenue;
	private long expense;

	public Owner(long revenue, long expense) {
		super();
		this.revenue = revenue;
		this.expense = expense;
	}

	@Override
	public long getTax() {
		long tax = 0;
		long[] threshold = { 150000, 150000, 200000, 250000, 250000, 1000000, 3000000 };
		int i = 0;
		// -------------------------------------------------------------
		while (true) {
			if (i > 6)
				break;
			revenue = revenue - threshold[i];
			if (revenue < 0) {
				revenue = revenue + threshold[i];
				tax = (long) (tax + (revenue * (i * 0.05)));
				return (long) (tax - expense * 0.1);
			}
			if (i != 0)
				tax = (long) (tax + (threshold[i] * (i * 0.05)));
			i++;
		}
		// -------------------------------------------------------------
		return (long) (tax - expense * 0.1);
	}

	@Override
	public long getRevenue() {
		return revenue;
	}

	@Override
	public long getExpense() {
		return expense;
	}

	public static class Builder {
		private long revenue;
		private long expense;


		public Builder setRevenue(long revenue) {
			this.revenue = revenue;
			return this;
		}

		public Builder setExpense(long expense) {
			this.expense = expense;
			return this;
		}

		public Owner build() {
			return new Owner(revenue, expense);
		}

	}
}
