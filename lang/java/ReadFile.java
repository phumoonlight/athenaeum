import java.io.*;
import java.util.*;

public class ReadFile {

	public static void main(String[] args) throws Exception {

		FileInputStream file = new FileInputStream("sec1.txt");
		InputStreamReader converted_file = new InputStreamReader(file, "UTF-8");
		BufferedReader used_file = new BufferedReader(converted_file);

		int male = 0, female = 0, my_index = -1;

		ArrayList<String> text_storage = new ArrayList<>();
		ArrayList<Float> GPA = new ArrayList<>();

		while (used_file.ready())
			text_storage.add(used_file.readLine());

		// Finding นาย

		for (int i = 0; i < text_storage.size(); i++) {
			if (text_storage.get(i).contains("\u0E19\u0E32\u0E22")) {
				// Unicode of "นาย"
				male++;
			}
		}
		for (int i = 0; i < text_storage.size(); i++) {
			if (text_storage.get(i).contains("\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27")) {
				// Unicode of "นางสาว"
				female++;
			}
		}

		for (int i = 0; i < text_storage.size(); i++) {
			GPA.add(Float.valueOf(text_storage.get(i).substring(text_storage.get(i).length() - 4)));
		}

		for (int i = 0; i < text_storage.size(); i++) {
			if (text_storage.get(i)
					.contains("\u0E1B\u0E23\u0E31\u0E0A\u0E0D\u0E32 \u0E02\u0E38\u0E19\u0E28\u0E23\u0E35")) {
				// Unicode of "ปรัชญา ขุนศรี"
				text_storage.set(i, text_storage.get(i).concat("*****"));
				my_index = i;
			}
		}

		ArrayList<Integer> ArrangedIndex = new ArrayList<>();

		while (true) {
			int indexOfMaximum = 0, firstIndex = 0;
			for (int i = 0; i < GPA.size(); i++) {
				if (ArrangedIndex.contains(i))
					continue;
				else {
					if (firstIndex == 0) {
						indexOfMaximum = i;
						firstIndex++;
					} else {
						if (GPA.get(i) > GPA.get(indexOfMaximum))
							indexOfMaximum = i;
					}

				}
			}
			ArrangedIndex.add(indexOfMaximum);
			indexOfMaximum = 0;
			firstIndex = -1;
			if (ArrangedIndex.size() == GPA.size())
				break;
		}
		System.out.println("Arranged List Of Students Section 1 by GPA");
		for (int i = 0; i < GPA.size(); i++) {
			System.out.println((i + 1) + " " + text_storage.get(ArrangedIndex.get(i))
					.substring(text_storage.get(ArrangedIndex.get(i)).indexOf('\t')));
		}
		System.out.println("----------------------------------------");

		float my_GPA = GPA.get(my_index), avrg = 0, max_GPA = GPA.get(ArrangedIndex.get(0)),
				min_GPA = GPA.get(ArrangedIndex.get(ArrangedIndex.size() - 1));
		System.out.format("Male = %d\nFemale = %d\n", male, female);
		System.out.format("Max GPA = %.2f\n", max_GPA);
		System.out.format("Mix GPA = %.2f\n", min_GPA);
		for (int i = 0; i < GPA.size(); i++)
			avrg += GPA.get(i);
		avrg /= GPA.size();
		System.out.format("Average GPA = %.2f\n", avrg);
		System.out.format("My GPA = %.2f\n", my_GPA);
		if (my_GPA > avrg)
			System.out.println("My GPA is more than AVERAGE GPA.");
		else if (my_GPA < avrg)
			System.out.println("My GPA is less than AVERAGE GPA.");
		else
			System.out.println("My GPA is equal to AVERAGE GPA.");

	}

}
