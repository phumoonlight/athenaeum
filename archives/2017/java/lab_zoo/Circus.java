import java.util.*;

public class Circus {
		ArrayList<Animal> CircusShowList = new ArrayList<Animal>();
	
		void Circus() {		
			CircusShowList.add(CircusMonkey);
			CircusShowList.add(CircusBear);
			CircusShowList.add(CircusElephant);
			CircusShowList.add(CircusHorse);
			CircusShowList.add(CircusLion);
			CircusShowList.add(CircusPennywise);
			CircusShowList.add(CircusSeal);
			
			Collections.shuffle(CircusShowList);
			
			System.out.println("Circus : Action log");
			for(int i = 0 ; i < CircusShowList.size() ; i++) {
				System.out.print("Show#" + (i + 1) + " You watch ");
				System.out.println(((Animal) CircusShowList.get(i)).Action());
			}
			System.out.println("\n End of Circus....");
		}

		Animal CircusMonkey = new Animal() {
			public String Name() {return "Monkey";}
			public String Action() {return "Monkey Balloon";}
			public boolean Carnivore() {return false;}
		};

		Animal CircusLion = new Animal() {
			public String Name() {return "Lion";}
			public String Action() {return "[Lion show]";}
			public boolean Carnivore() {return true;}
		};
		Animal CircusElephant = new Animal() {
			public String Name() {return "Elephants";}
			public String Action() {return "[Elephant show]";}
			public boolean Carnivore() {return false;}
		};
		Animal CircusSeal = new Animal() {
			public String Name() {return "Seal";}
			public String Action() {return "Seal and Ball";}
			public boolean Carnivore() {return true;}
		};
		Animal CircusPennywise = new Animal() { //Pennywise was Animal!!!!
			public String Name() {return "Pennywise";}
			public String Action() {return "........Ohh! Pennywise invited you to join the show";}
			public boolean Carnivore() {return true;}
		};
		Animal CircusBear = new Animal() {
			public String Name() {return "Bear";}
			public String Action() {return "ËÁÕ»Ñè¹Ã¶¶Õº";}
			public boolean Carnivore() {return true;}
		};
		Animal CircusHorse = new Animal() {
			public String Name() {return "Horse";}
			public String Action() {return "[Horse show]";}
			public boolean Carnivore() {return true;}
		};
}
