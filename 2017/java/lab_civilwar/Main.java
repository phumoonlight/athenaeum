import java.util.*;

public class Main {
	// Instance
	Random rand = new Random();
	Heroes hero = new Heroes();
	Processing process = new Processing();
	static Scanner input = new Scanner(System.in);

	public static void main(String[] args) {

		// ArrayList
		ArrayList<Heroes> HeroList = new ArrayList<Heroes>();
		ArrayList<Heroes> Team1 = new ArrayList<Heroes>();
		ArrayList<Heroes> Team2 = new ArrayList<Heroes>();

		// Creating Heroes
		Heroes h1 = new HeroesAntMan();
		HeroList.add(h1);
		Heroes h2 = new HeroesBlackPanther();
		HeroList.add(h2);
		Heroes h3 = new HeroesBlackWidow();
		HeroList.add(h3);
		Heroes h4 = new HeroesCaptainAmerica();
		HeroList.add(h4);
		Heroes h5 = new HeroesFalcon();
		HeroList.add(h5);
		Heroes h6 = new HeroesHawkeye();
		HeroList.add(h6);
		Heroes h7 = new HeroesIronMan();
		HeroList.add(h7);
		Heroes h8 = new HeroesScarletWitch();
		HeroList.add(h8);
		Heroes h9 = new HeroesSpiderMan();
		HeroList.add(h9);
		Heroes h10 = new HeroesVision();
		HeroList.add(h10);
		Heroes h11 = new HeroesWinterSoldier();
		HeroList.add(h11);

		// Instruction
		System.out.println("Lab02 - Civil Wars");
		System.out.println("- Pick your heroes to fight against Team-1.");

		// Random : Team1
		for (int i = 0; i < 5; i++) {
			Collections.shuffle(HeroList);
			Team1.add(HeroList.remove(i));
		}
		
		// Mark for Ironman
				if (Team1.contains(h7)) {
					((HeroesIronMan) h7).MarkRandom();
				}

		// Show : Team1
		System.out.println("\nTeam - 1");
		for (int i = 0; i < Team1.size(); i++) {
			System.out.print("|" + Team1.get(i).Name() + "|");
		}

		// Pick : Team2
		System.out.println("\n\nChoose heroes for Team2");
		int selection = 0, mk=0;
		while (Team2.size() < 5) {
			System.out.println(HeroList.size() + " Avaliable Heroes");
			for (int j = 0; j < HeroList.size(); j++) {
				System.out.println((j + 1) + "." + HeroList.get(j).Name());
			}
			System.out.print("Pick one [input number] : ");
			selection = input.nextInt();
			if (HeroList.get(selection - 1) == (h7)) {
				System.out.print("Select Ironman Suit [MkI~III,XLVI ; 1~3,4 : ");
				mk = input.nextInt();
				((HeroesIronMan) h7).SuitMark(mk);
			}
			Team2.add(HeroList.remove(selection - 1));
			
		}

		

		System.out.println("\nResult : Picking heroes");
		System.out.println("Remaining unused heroes : " + HeroList.get(0).Name());
		System.out.print("Team1 heroes : ");
		for (int j = 0; j < Team1.size(); j++) {
			System.out.print("|" + Team1.get(j).Name() + "|");
		}
		System.out.print("\nTeam2 heroes : ");
		for (int j = 0; j < Team2.size(); j++) {
			System.out.print("|" + Team2.get(j).Name() + "|");
		}

		for (int j = 0; j < 5; j++) {
			Team1.get(j).GeneratePower();
			Team2.get(j).GeneratePower();
		}

		System.out.println("\nResult : Versus");
		int[] Lives = { 5, 5 };
		for (int j = 0; j < 5; j++) {
			System.out.println("Round : " + (j + 1));
			System.out.println(Team1.get(j).Name() + "'s Power : " + Team1.get(j).Power() +" "+ Team1.get(j).Ultimate());
			System.out.println(Team2.get(j).Name() + "'s Power : " + Team2.get(j).Power() +" "+ Team2.get(j).Ultimate());
			if (Team1.get(j).Power() > Team2.get(j).Power()) {
				System.out.println(Team1.get(j).Name() + " win! - " + Team2.get(j).Name() + " has been defeated");
				Lives[1]--;
			} else if (Team2.get(j).Power() > Team1.get(j).Power()) {
				System.out.println(Team2.get(j).Name() + " win! - " + Team1.get(j).Name() + " has been defeated");
				Lives[0]--;
			} else {
				System.out.println("Draw!");
			}
		}

		System.out.println("\nSummary : Winner");
		System.out.println("Team1 remaining heroes : " + Lives[0]);
		System.out.println("Team2 remaining heroes : " + Lives[1]);
		if (Lives[0] > Lives[1]) {
			System.out.println("Team1 is victorious!");
		} else if (Lives[0] < Lives[1]) {
			System.out.println("Team2 is victorious!");
		} else {
			System.out.println("Draw!");
		}
	}
}
