#include<stdio.h>
int cha(int,int);
int main(){
	int price,cash;
	
	printf("Enter price = ");
	scanf("%d",&price);
	printf("Enter cash = ");
	scanf("%d",&cash);
	cha(price,cash);
	printf("Change = %d\n",cha(price,cash));
	
	system("pause");
	return 0;
}

int cha(int p,int c){
     int change;
	 change=c-p;
	 
	 return change;
}

	 


