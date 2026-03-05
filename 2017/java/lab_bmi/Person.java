import java.util.Date;

public class Person {

	float pregnant_weight;
	float height;
	Date pregnant_date, current_date;
	float bmi = getBMI();

	// Processing
	float getBMI() {
		return this.pregnant_weight / ((this.height/100) * (this.height/100));
	}

	long getPregDay_and_CurrentDay() {
		return (current_date.getTime() - pregnant_date.getTime()) / (1000 * 60 * 60 * 24 * 7);
	}

	double getMaxIncrementWeight() {
		long weeks = getPregDay_and_CurrentDay();
		if (bmi < 18.5) {
			if (weeks <= 13) {
				return 0.2307 * weeks;
			} else {
				weeks = weeks - 13;
				return 3 + (weeks * 0.58);
			}
		} else if (bmi < 25.0) {
			if (weeks <= 13) {
				return 0.2307 * weeks;
			} else {
				weeks = weeks - 13;
				return 3 + (weeks * 0.45);
			}
		} else if (bmi < 30) {
			if (weeks <= 13) {
				return 0.2307 * weeks;
			} else {
				weeks = weeks - 13;
				return 3 + (weeks * 0.32);
			}
		} else {
			if (weeks <= 13) {
				return 0.2307 * weeks;
			} else {
				weeks = weeks - 13;
				return 3 + (weeks * 0.27);
			}
		}
	}

	double getMinIncrementWeight() {
		long weeks = getPregDay_and_CurrentDay();
		if (bmi < 18.5) {
			if (weeks <= 13) {
				return 0.1538 * weeks;
			} else {
				weeks = weeks - 13;
				return 2 + (weeks * 0.45);
			}
		} else if (bmi < 25.0) {
			if (weeks <= 13) {
				return 0.1538 * weeks;
			} else {
				weeks = weeks - 13;
				return 2 + (weeks * 0.36);
			}
		} else if (bmi < 30) {
			if (weeks <= 13) {
				return 0.1538 * weeks;
			} else {
				weeks = weeks - 13;
				return 2 + (weeks * 0.23);
			}
		} else {
			if (weeks <= 13) {
				return 0.1538 * weeks;
			} else {
				weeks = weeks - 13;
				return 2 + (weeks * 0.18);
			}
		}
	}

	// Getter & Setter
	void setPregnantDate(Date date) {
		pregnant_date = date;
	}

	Date getPregnantDate() {
		return pregnant_date;
	}

	void setCurrentDate(Date date) {
		current_date = date;
	}

	Date getCurrentDate() {
		return current_date;
	}

	void setMomHeight(float h) {
		height = h;
	}

	float getMomHeight() {
		return height;
	}

	// void setMomCurrentWeight(float w) {
	// current_weight = w;
	// }

	// float getMomCurrentWeight() {
	// return current_weight;
	// }

	void setMomPregnantWeight(float w) {
		pregnant_weight = w;
	}

	float getMomPregnantWeight() {
		return pregnant_weight;
	}

}
