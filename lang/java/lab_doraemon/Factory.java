
public class Factory {

	// Model
	static prototype Mkl = new IronmanMkl();
	static prototype Mkll = new IronmanMkll();
	static prototype Mklll = new IronmanMklll();
	static prototype Do = new Dironmon();

	public static void main(String[] args) {
		System.out.println("Lab03 - Implementation");
		System.out.println("Topic - Ironman & Suit Marks");
		
		// Action
		System.out.println("Mark l Attribute");
		System.out.println("Arc Reactor : " + Mkl.Arc_reactorFunction());
		System.out.println("Arms        : " + Mkl.ArmsFunction());
		System.out.println("Body        : " + Mkl.BodyFunction());
		System.out.println("Head        : " + Mkl.HeadFunction());
		System.out.println("Leg         : " + Mkl.LegFunction());
		System.out.println("Weapon      : " + Mkl.WeaponFunction());
		
		
		System.out.println("Mark ll Attribute");
		System.out.println("Arc Reactor : " + Mkll.Arc_reactorFunction());
		System.out.println("Arms        : " + Mkll.ArmsFunction());
		System.out.println("Body        : " + Mkll.BodyFunction());
		System.out.println("Head        : " + Mkll.HeadFunction());
		System.out.println("Leg         : " + Mkll.LegFunction());
		System.out.println("Weapon      : " + Mkll.WeaponFunction());
		
		System.out.println("Mark lll Attribute");
		System.out.println("Arc Reactor : " + Mklll.Arc_reactorFunction());
		System.out.println("Arms        : " + Mklll.ArmsFunction());
		System.out.println("Body        : " + Mklll.BodyFunction());
		System.out.println("Head        : " + Mklll.HeadFunction());
		System.out.println("Leg         : " + Mklll.LegFunction());
		System.out.println("Weapon      : " + Mklll.WeaponFunction());
		
		System.out.println("Dironmon Attribute [Based on Ironman attribute]");
		System.out.println("Arc Reactor : " + Do.Arc_reactorFunction());
		System.out.println("Arms        : " + Do.ArmsFunction());
		System.out.println("Body        : " + Do.BodyFunction());
		System.out.println("Head        : " + Do.HeadFunction());
		System.out.println("Leg         : " + Do.LegFunction());
		System.out.println("Weapon      : " + Do.WeaponFunction());
	}

}
