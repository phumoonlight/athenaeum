import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.BufferedWriter;
import java.util.ArrayList;

public class JORMOR {

	public static void main(String[] args) throws Exception {
		// For Reading File
		FileInputStream file = new FileInputStream("sec1.txt");
		InputStreamReader converted_file = new InputStreamReader(file, "UTF-8");
		BufferedReader used_file = new BufferedReader(converted_file);
		// For Writing File
		FileOutputStream save_to_file = new FileOutputStream("5904101353.txt");
		OutputStreamWriter convert_to_file = new OutputStreamWriter(save_to_file, "UTF-8");
		BufferedWriter write_to_file = new BufferedWriter(convert_to_file);

		int male = 0, female = 0, my_index = -1;

		ArrayList<String> text_storage = new ArrayList<>();
		ArrayList<Float> GPA = new ArrayList<>();

		// Reading File
		while (used_file.ready())
			text_storage.add(used_file.readLine());

		// Finding "นาย นางสาว"
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
			if (text_storage.get(i).contains(
					"\u0e19\u0e32\u0e22\u0e20\u0e39\u0e28\u0e32\u0e19\u0e15\u0e4c \u0e21\u0e39\u0e25\u0e40\u0e21\u0e37\u0e2d\u0e07")) {
				// Unicode of "นายภูศานต์ มูลเมือง"
				text_storage.set(i, text_storage.get(i).concat("***"));
				my_index = i;
			}
		}

		ArrayList<Integer> ArrangedIndex = new ArrayList<>();

		while (true) {
			int indexOfMaximum = 0, firstIndex = 0;
			for (int i = 0; i < GPA.size(); i++) {
				if (ArrangedIndex.contains(i)) {
					continue;
				} else {
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
		write_to_file.write("Arranged List Of Students Section 1 by GPA");
		write_to_file.newLine();
		for (int i = 0; i < GPA.size(); i++) {
			System.out.println((i + 1) + " " + text_storage.get(ArrangedIndex.get(i))
					.substring(text_storage.get(ArrangedIndex.get(i)).indexOf('\t')));
			write_to_file.write((i + 1) + " " + text_storage.get(ArrangedIndex.get(i))
					.substring(text_storage.get(ArrangedIndex.get(i)).indexOf('\t')));
			write_to_file.newLine();
		}
		System.out.println("----------------------------------------");
		write_to_file.write("----------------------------------------");
		write_to_file.newLine();

		float my_GPA = GPA.get(my_index), avrg = 0;
		float max_GPA = GPA.get(ArrangedIndex.get(0)), min_GPA = GPA.get(ArrangedIndex.get(ArrangedIndex.size() - 1));

		// Find GPA average
		for (int i = 0; i < GPA.size(); i++) {
			avrg += GPA.get(i);
		}
		avrg /= GPA.size();

		//Show all Gender Max/minGPA avgGPA MyGPA
		System.out.format("Male = %d\nFemale = %d\n", male, female);
		write_to_file.write("Male = " + male);
		write_to_file.newLine();
		write_to_file.write("Female = " + female);
		write_to_file.newLine();
		System.out.format("Max GPA = %.2f\n", max_GPA);
		write_to_file.write("Max GPA = " + String.format("%.2f", max_GPA));
		write_to_file.newLine();
		System.out.format("Mix GPA = %.2f\n", min_GPA);
		write_to_file.write("Min GPA = " + String.format("%.2f", min_GPA));
		write_to_file.newLine();
		System.out.format("Average GPA = %.2f\n", avrg);
		write_to_file.write("Average GPA = " + String.format("%.2f", avrg));
		write_to_file.newLine();
		System.out.format("My GPA = %.2f\n", my_GPA);
		write_to_file.write("My GPA = " + String.format("%.2f", my_GPA));
		write_to_file.newLine();
		if (my_GPA > avrg) {
			System.out.println("My GPA is more than AVERAGE GPA.");
			write_to_file.write("My GPA is more than AVERAGE GPA.");
			write_to_file.newLine();
		} else if (my_GPA < avrg) {
			System.out.println("My GPA is less than AVERAGE GPA.");
			write_to_file.write("My GPA is less than AVERAGE GPA.");
			write_to_file.newLine();
		} else {
			System.out.println("My GPA is equal to AVERAGE GPA.");
			write_to_file.write("My GPA is equal to AVERAGE GPA.");
			write_to_file.newLine();
		}
		used_file.close();
		write_to_file.flush();
		write_to_file.close();
	}

}