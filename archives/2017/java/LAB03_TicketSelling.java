import java.util.*;

public class LAB03_TicketSelling {

	public static void main(String[] args) {

		Scanner input = new Scanner(System.in);
		
		do {
			System.out.print("กรุณากรอกไอดีของท่าน: ");
			String ID = input.next();

			// Print Instruction
			System.out.println("ยินดีต้อนรับสู่ระบบขายตั๋วอัตโนมัติ\n");

			// Declare Array For Zone
			String Zone[][] = new String[6][];
			Zone[0] = new String[20];
			Zone[1] = new String[100];
			Zone[2] = new String[30];
			Zone[3] = new String[35];
			Zone[4] = new String[20];
			Zone[5] = new String[10];

			// Declare Value For Zone
			for (int i = 0; i < Zone[0].length; i++) {
				Zone[0][i] = " ";
			}

			for (int i = 0; i < Zone[1].length; i++) {
				Zone[1][i] = " ";
			}

			for (int i = 0; i < Zone[2].length; i++) {
				Zone[2][i] = " ";
			}

			for (int i = 0; i < Zone[3].length; i++) {
				Zone[3][i] = " ";
			}

			for (int i = 0; i < Zone[4].length; i++) {
				Zone[4][i] = " ";
			}

			for (int i = 0; i < Zone[5].length; i++) {
				Zone[5][i] = " ";
			}

			// Utilities Variable
			int SeatSelect = 0;
			boolean AllClear = false;
			char Continue = ' ';
			int[] Summary = { 0, 0, 0, 0, 0, 0 };

			// Input ID Zone Seat
			do {
				AllClear = false;
				System.out.println("โซน\t\tราคา(บาท)\t\tจำนวนที่นั่ง");
				System.out.println("[A1]\t\t6000\t\t20");
				System.out.println("[AL]\t\t5000\t\t100");
				System.out.println("[SC]\t\t4500\t\t30");
				System.out.println("[C]\t\t3000\t\t35");
				System.out.println("[D]\t\t2000\t\t20");
				System.out.println("[E]\t\t1200\t\t10");
				System.out.print("โซนที่ท่านต้องการคือ: ");
				String ZoneSelect = input.next();

				System.out.println("โซนที่เลือกคือ [" + ZoneSelect + "] ");
				System.out.println("ที่นั่งทั้งหมดของโซนนี้");

				switch (ZoneSelect) {
				case "A1":
					for (int i = 1; i <= 20; i++) {
						if (Zone[0][i - 1] == (" ")) {
							System.out.print("[" + i + "] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						} else {
							System.out.print("[X] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						}
					}
					do {
						System.out.print("กรุณาเลือกที่นั่งที่ท่านต้องการ [ 1 ~ 20 ] : ");
						SeatSelect = input.nextInt();
						if (Zone[0][SeatSelect - 1] == (" ")) {
							Zone[0][SeatSelect - 1] = ID;
							AllClear = true;
							Summary[0]++;
						} else {
							System.out.println("ที่นั่งที่ท่านต้องการได้ทำการขายไปแล้ว กรุณาเลือกที่นั่งใหม่");
							AllClear = false;
						}
					} while (AllClear == false);
					break;
				case "AL":
					for (int i = 1; i <= 100; i++) {
						if (Zone[1][i - 1] == (" ")) {
							System.out.print("[" + i + "] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						} else {
							System.out.print("[X] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						}
					}
					do {
						System.out.print("กรุณาเลือกที่นั่งที่ท่านต้องการ [ 1 ~ 100 ] : ");
						SeatSelect = input.nextInt();
						if (Zone[1][SeatSelect - 1] == (" ")) {
							Zone[1][SeatSelect - 1] = ID;
							AllClear = true;
							Summary[1]++;
						} else {
							System.out.println("ที่นั่งที่ท่านต้องการได้ทำการขายไปแล้ว กรุณาเลือกที่นั่งใหม่");
							AllClear = false;
						}
					} while (AllClear == false);
					break;
				case "SC":
					for (int i = 1; i <= 30; i++) {
						if (Zone[2][i - 1] == (" ")) {
							System.out.print("[" + i + "] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						} else {
							System.out.print("[X] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						}
					}
					do {
						System.out.print("กรุณาเลือกที่นั่งที่ท่านต้องการ [ 1 ~ 30 ] : ");
						SeatSelect = input.nextInt();
						if (Zone[2][SeatSelect - 1] == (" ")) {
							Zone[2][SeatSelect - 1] = ID;
							Summary[2]++;
							AllClear = true;
						} else {
							System.out.println("ที่นั่งที่ท่านต้องการได้ทำการขายไปแล้ว กรุณาเลือกที่นั่งใหม่");
							AllClear = false;
						}
					} while (AllClear == false);
					break;
				case "C":
					for (int i = 1; i <= 35; i++) {
						if (Zone[3][i - 1] == (" ")) {
							System.out.print("[" + i + "] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						} else {
							System.out.print("[X] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						}
					}
					do {
						System.out.print("กรุณาเลือกที่นั่งที่ท่านต้องการ [ 1 ~ 35 ] : ");
						SeatSelect = input.nextInt();
						if (Zone[3][SeatSelect - 1] == (" ")) {
							Zone[3][SeatSelect - 1] = ID;
							Summary[3]++;
							AllClear = true;
						} else {
							System.out.println("ที่นั่งที่ท่านต้องการได้ทำการขายไปแล้ว กรุณาเลือกที่นั่งใหม่");
							AllClear = false;
						}
					} while (AllClear == false);
					break;
				case "D":
					for (int i = 1; i <= 20; i++) {
						if (Zone[4][i - 1] == (" ")) {
							System.out.print("[" + i + "] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						} else {
							System.out.print("[X] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						}
					}
					do {
						System.out.print("กรุณาเลือกที่นั่งที่ท่านต้องการ [ 1 ~ 20 ] : ");
						SeatSelect = input.nextInt();
						if (Zone[4][SeatSelect - 1] == (" ")) {
							Zone[4][SeatSelect - 1] = ID;
							Summary[4]++;
							AllClear = true;
						} else {
							System.out.println("ที่นั่งที่ท่านต้องการได้ทำการขายไปแล้ว กรุณาเลือกที่นั่งใหม่");
							AllClear = false;
						}
					} while (AllClear == false);
					break;
				case "E":
					for (int i = 1; i <= 10; i++) {
						if (Zone[5][i - 1] == (" ")) {
							System.out.print("[" + i + "] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						} else {
							System.out.print("[X] \t");
							if (i % 10 == 0) {
								System.out.println("");
							}
						}
					}
					do {
						System.out.print("กรุณาเลือกที่นั่งที่ท่านต้องการ [ 1 ~ 10 ] : ");
						SeatSelect = input.nextInt();
						if (Zone[5][SeatSelect - 1] == (" ")) {
							Zone[5][SeatSelect - 1] = ID;
							Summary[5]++;
							AllClear = true;
						} else {
							System.out.println("ที่นั่งที่ท่านต้องการได้ทำการขายไปแล้ว กรุณาเลือกที่นั่งใหม่");
							AllClear = false;
						}
					} while (AllClear == false);
					break;
				default:
					System.out.println("มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง\n \n");
				}

				// Buy more ticket or stop
				if (AllClear == true) {
					System.out.println("การซื้อตั๋วที่นั่งสำเร็จ");
					System.out.println("โซนและที่นั่งของคุณคือ : " + ZoneSelect + "-" + SeatSelect);
					do {
						System.out.print("ต้องการซื้อที่นั่งเพิ่มไหม [y (yes)/n (no)] : ");
						Continue = input.next().charAt(0);
						if (Continue != 'y' && Continue != 'n') {
							System.out.println("มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง");
						}
					} while (Continue != 'y' && Continue != 'n');
					System.out.print("\n \n");
				} else if (AllClear == false) {
					Continue = 'y';
				}

			} while (Continue == 'y');

			// Summary [Calculate Total Sold Ticket And Income]
			System.out.println("ไอดีของท่านคือ : " + ID);
			System.out.println("รวมยอดตั๋วที่ขายไปทั้งหมด");
			System.out.println("โซน A1");
			System.out.println("       ตั๋วที่ขายไป - " + Summary[0]);
			System.out.println("       จำนวนเงิน  - " + (Summary[0] * 6000));
			System.out.println("โซน AL");
			System.out.println("       ตั๋วที่ขายไป - " + Summary[1]);
			System.out.println("       จำนวนเงิน  - " + (Summary[1] * 5000));
			System.out.println("โซน SC");
			System.out.println("       ตั๋วที่ขายไป - " + Summary[2]);
			System.out.println("       จำนวนเงิน  - " + (Summary[2] * 4500));
			System.out.println("โซน C");
			System.out.println("       ตั๋วที่ขายไป - " + Summary[3]);
			System.out.println("       จำนวนเงิน  - " + (Summary[3] * 3000));
			System.out.println("โซน D");
			System.out.println("       ตั๋วที่ขายไป - " + Summary[4]);
			System.out.println("       จำนวนเงิน  - " + (Summary[4] * 2000));
			System.out.println("โซน E");
			System.out.println("       ตั๋วที่ขายไป - " + Summary[5]);
			System.out.println("       จำนวนเงิน  - " + (Summary[5] * 1200));
			System.out.println("รวมยอดขายทั้งหมด");
			System.out.println("       ตั๋วที่ขายไป - "
					+ (Summary[0] + Summary[1] + Summary[2] + Summary[3] + Summary[4] + Summary[5]));
			System.out.println("       จำนวนเงิน  - " + ((Summary[0] * 6000) + (Summary[1] * 5000) + (Summary[2] * 4500)
					+ (Summary[3] * 3000) + (Summary[4] * 2000) + Summary[5] * 1200));
			System.out.println("\n\n\n\n คิวถัดไป");
		} while (true);

	}
}