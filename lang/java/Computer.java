package Lab05;

public class Computer {
	Cpu aCPU;
	VGACard aVGA;
	Ram aRam;
	Mainboard aMainBoard;

	public Computer(Cpu aCPU, VGACard aVGA, Ram aRam, Mainboard aMainBoard)

	{
		super();
		this.aCPU = aCPU;
		this.aVGA = aVGA;
		this.aRam = aRam;
		this.aMainBoard = aMainBoard;
	}

	public Cpu getaCPU() {
		return aCPU;
	}

	public void setaCPU(Cpu aCPU) {
		this.aCPU = aCPU;
	}

	public VGACard getaVGA() {
		return aVGA;
	}

	public void setaVGA(VGACard aVGA) {
		this.aVGA = aVGA;
	}

	public Ram getaRam() {
		return aRam;
	}

	public void setaRam(Ram aRam) {
		this.aRam = aRam;
	}

	public Mainboard getaMainBoard() {
		return aMainBoard;
	}

	public void setaMainBoard(Mainboard aMainBoard) {
		this.aMainBoard = aMainBoard;
	}

	@Override
	public String toString() {
		return "Computer [" + (aCPU != null ? "aCPU=" + aCPU + ", " : "") + (aVGA != null ? "aVGA=" + aVGA + ", " : "")
				+ (aRam != null ? "aRam=" + aRam + ", " : "") + (aMainBoard != null ? "aMainBoard=" + aMainBoard : "")
				+ "]";
	}
}
