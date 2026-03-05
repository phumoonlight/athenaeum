import java.util.ArrayList;
import java.util.Collections;

class Zoo {
	
	ArrayList<Animal> ZooAnimalList = new ArrayList<Animal>();
	private int FeedCount = 1;

	void Zoo() {
		ZooAnimalList.add(ZooTiger);
		ZooAnimalList.add(ZooZebra);
		ZooAnimalList.add(ZooGiraffe);
		ZooAnimalList.add(ZooParrot);
		ZooAnimalList.add(ZooMonkey);
		ZooAnimalList.add(ZooGorilla);
		ZooAnimalList.add(ZooElephant);
		ZooAnimalList.add(ZooFlamingo);
		ZooAnimalList.add(ZooHippo);
		ZooAnimalList.add(ZooLion);
		ZooAnimalList.add(ZooPolarBear);
		ZooAnimalList.add(ZooPenguin);
		
		//Collections.shuffle(ZooAnimalList);
		
		System.out.println("Zoo : Action log");
		for (int i = 0; i < ZooAnimalList.size(); i++) {

			System.out.print("Zone#" + (i + 1) + " You see ");
			System.out.print(((Animal) ZooAnimalList.get(i)).Name());

			if (((Animal) ZooAnimalList.get(i)).Carnivore() == false) {
				System.out.println(" - You feeding them");
				if (FeedCount == 3) {
					System.out.println(" - You also see animal feeder");
					FeedCount -= 3;
				}
			} else {
				System.out.println(" - You watch them " + ((Animal) ZooAnimalList.get(i)).Action());
				if (FeedCount == 3) {
					System.out.println(" - You also see animal feeder");
					FeedCount -= 3;
				}
			}
			FeedCount++;
		}
		System.out.println("\n End of Zoo....");
	}

	Animal ZooTiger = new Animal() {
		public String Name() {return "Tigers";}
		public String Action() {return "sleeping";}
		public boolean Carnivore() {return true;}
	};

	Animal ZooZebra = new Animal() {
		public String Name() {return "Zebras";}
		public String Action() {return "walking around";}
		public boolean Carnivore() {return false;}
	};

	Animal ZooGiraffe = new Animal() {
		public String Name() {return "Giraffes";}
		public String Action() {return "standing";}
		public boolean Carnivore() {return false;}
	};

	Animal ZooParrot = new Animal() {
		public String Name() {return "Parrots";}
		public String Action() {return "speaking";}
		public boolean Carnivore() {return false;}
	};
	Animal ZooMonkey = new Animal() {
		public String Name() {return "Monkeys";}
		public String Action() {return "on trees";}
		public boolean Carnivore() {return false;}
	};

	Animal ZooLion = new Animal() {
		public String Name() {return "Lions";}
		public String Action() {return "sleeping";}
		public boolean Carnivore() {return true;}
	};
	Animal ZooGorilla = new Animal() {
		public String Name() {return "Gorillas";}
		public String Action() {return "watching you";}
		public boolean Carnivore() {return true;}
	};
	Animal ZooElephant = new Animal() {
		public String Name() {return "Elephants";}
		public String Action() {return "showering";}
		public boolean Carnivore() {return false;}
	};
	Animal ZooHippo = new Animal() {
		public String Name() {return "Hippopotamus";}
		public String Action() {return "soak in water";}
		public boolean Carnivore() {return true;}
	};
	Animal ZooPenguin = new Animal() {
		public String Name() {return "Penguins";}
		public String Action() {return "sliding";}
		public boolean Carnivore() {return true;}
	};
	Animal ZooPolarBear = new Animal() {
		public String Name() {return "Polarbears";}
		public String Action() {return "sleeping";}
		public boolean Carnivore() {return true;}
	};
	Animal ZooFlamingo = new Animal() {
		public String Name() {return "Flamingo bird";}
		public String Action() {return "Standing on one leg";}
		public boolean Carnivore() {return true;}
	};
}
