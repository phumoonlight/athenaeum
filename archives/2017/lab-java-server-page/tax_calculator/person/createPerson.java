package person;

public class createPerson {

	public Person generatePerson(String person) {
		if (person.equals("developer")) {
			return new Developer();
		} else if (person.equals("owner")) {
			return new Owner();
		} else {
			return null;
		}
	}
}
