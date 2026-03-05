#include<stdio.h>
#include<conio.h>
int main(){
    float price,fullprice;
    int month;
    
    puts("Extra #2 : Buy house");
	puts("Enter house price [ Million ] :");
	scanf("%f",&price);
	fullprice = price * 1000000;
	printf("Full price = %.0f Baht\n\n",fullprice);
	puts("--Payment Distribution--");
	puts("How many months you want :");
	scanf("%d",&month);
	if(month>=12){
		printf("So you will pay %.2f Bath every month\n for %d year and %d months\n",fullprice/month,month/12,month%12);
	}else{
		printf("So you will pay %.2f Bath every month\n for %d months\n",fullprice/month,month);
	}
	  
	system("pause");
	return 0;
}
