#include<stdio.h>
int main(){
	struct book{
		char name[20];
		float price;
		float discount;
	};
	struct book b1;
	printf("Enter book name = ");
	scanf("%s",&b1.name);
	printf("Enter book price = ");
	scanf("%f",&b1.price);
	b1.discount = b1.price * 0.1;
	
	printf("\n-------------\n");
	printf("Book name = %s\n",b1.name);
	printf("Book price = %.2f\n",b1.price);
	printf("Discount 10%% = %.2f\n",b1.discount);
	printf("Total price = %.2f\n",b1.price-b1.discount);
	
	system("pause");
	return 0;
}
