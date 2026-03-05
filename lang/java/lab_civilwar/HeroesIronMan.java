public class HeroesIronMan extends Heroes {
	
	private int Mark;
	
	void SuitMark(int Mk) {
		Mark = Mk;
	}

	String Ultimate() {
		switch(Mark) {
		case 1 : 
			return "Prototype Cannon"; 
		case 2 :
			return "MkII Cannon";
		case 3 :
			return "MkIII Cannon";
		case 4 :
			return "MkXLVI Cannon";
		default :
			return "Prototype Cannon";
		}
	}
	
	String Name() {
		switch(Mark) {
		case 1 : 
			return "Ironman-MkI"; 
		case 2 :
			return "Ironman-MkII";
		case 3 :
			return "Ironman-MkIII";
		case 4 :
			return "Ironman-MkXLVI";
		default :
			return "Ironman-Mk[ ]";
		}
	}
	
	void MarkRandom() {
		Mark = rand.nextInt((4 - 1) + 1) + 1;
	}

}
