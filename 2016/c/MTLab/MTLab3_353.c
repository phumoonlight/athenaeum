#include<stdio.h>
int main(){
	int money,total,c1,c5,c10,b20,b50,b100,b500,b1000;
	printf("-----Bank Calculator-----\n");
	printf(" Enter money = ");
	scanf("%d",&money);
	if(money>0){
	c1=(money%1000%500%100%50%20%10%5)/1;
	c5=(money%1000%500%100%50%20%10)/5;
	c10=(money%1000%500%100%50%20)/10;
	b20=(money%1000%500%100%50)/20;
	b50=(money%1000%500%100)/50;
	b100=(money%1000%500)/100;
	b500=(money%1000)/500;
	b1000=money/1000;
	printf("\t Bank <1000> = %d\n",b1000);
	printf("\t Bank <500> = %d\n",b500);
	printf("\t Bank <100> = %d\n",b100);
	printf("\t Bank <50> = %d\n",b50);
	printf("\t Bank <20> = %d\n",b20);
	printf("\t Bank <10> = %d\n",c10);
	printf("\t Bank <5> = %d\n",c5);
	printf("\t Bank <1> = %d\n",c1);
	
	printf("Total of Bank and Coin : %d\n",c1+c5+c10+b20+b50+b100+b500+b1000);
	
	}else{
		printf("ERROR!!!\n");
	}
	
	system("pause");
	return ;	
}
