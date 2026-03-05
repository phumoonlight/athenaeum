package control;

import java.util.ArrayList;
import model.UserBean;

public class OrderDAO {
	static ArrayList addOrder(UserBean user, ArrayList OrderList){
		OrderList.add(user);
		return OrderList;
		}
	static void priceCalculate(UserBean user) {
		int deliverycharge = 0;
		int notebook = user.getNotebook();
		int whiteshirt = user.getWhiteshirt(), blackshirt = user.getBlackshirt();
		int whitepolo = user.getWhitepolo(), blackpolo = user.getBlackpolo();
		
		//Baseprice
		int baseprice = (notebook*99) + ((whiteshirt+blackshirt)*199) + ((whitepolo+blackpolo)*280);
		user.setBaseprice(baseprice);
		
		//Deliverycharge
		if(notebook<50) {
			deliverycharge = deliverycharge + ((notebook/10)*70);
			if((notebook/10)==0 && notebook>0) {
				deliverycharge = deliverycharge + 70;
			}
		}
		if(whiteshirt<15) {
			deliverycharge = deliverycharge + (whiteshirt*30);
		}
		if(blackshirt<15) {
			deliverycharge = deliverycharge + (blackshirt*30);
		}
		if((whitepolo+blackpolo)<10) {
			deliverycharge = deliverycharge + ((whitepolo+blackpolo)*30);
		}
		user.setDeliverycharge(deliverycharge);
		
		//Discount
		int discount = user.getBaseprice();
		if(discount>5000) {
			discount = (int) (discount*0.2);
		}else if(discount>3000) {
			discount = (int) (discount*0.15);
		}else if(discount>2000) {
			discount = (int) (discount*0.1);
		}else {
			discount = 0;
		}
		discount= discount+(10*((whitepolo+blackpolo)/2));
		user.setDiscount(discount);
		
		//Photoset
		int photoset = (baseprice/1000);
		user.setPhotoset(photoset);
		
		//Total Price
		int totalprice = user.getBaseprice() + user.getDeliverycharge() - user.getDiscount();
		user.setTotalprice(totalprice);
	}
}
