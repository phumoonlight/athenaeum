import java.io.*;
import java.util.*;


public class CS216 {
	public static void main(String[] args) throws IOException {
		FileReader reader = new FileReader("sec1.txt");
		BufferedReader bufferedReader = new BufferedReader(reader);
		String line;
		while ((line = bufferedReader.readLine()) != null) {
			System.out.println(line);
		}
		reader.close();
	}
}