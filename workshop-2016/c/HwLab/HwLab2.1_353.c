#include<stdio.h>
int main ()
{
	char pro[20];
    float price,total,dis,amount;
    int unit;
    printf("Enter product = ");
    scanf("%s",pro);
    printf("Enter price   = ");
    scanf("%f",&price);
    printf("Enter unit    = ");
    scanf("%d",&unit);
    total=price*unit;
    if(total>=1&&total<=100)
    {
    	dis=total*0.05;
	}else if(total>=101&&total<=500)
	{
		dis=total*0.1;
	}else if(total>=501&&total<=1000)
	{
		dis=total*0.15;
	}else if(total>=1001)
	{
		dis=total*0.2;
	}else{
		printf("Error");
	}
	amount=total-dis;
	printf("\n---------------------------------------------\n");
	printf("Product = %s \n",pro);
	printf("Discount = %.2f\n",dis);
	printf("Amount = %.2f\n",amount);
	system("pause");
	return 0;
		
}
    
