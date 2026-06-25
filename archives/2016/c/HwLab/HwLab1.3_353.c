#include<stdio.h>
#include<conio.h>

int main ()
{
	float num1,num2,num3,re1,re2,re3;
	printf("Enter number #1 = ");
	scanf("%f",&num1);
	printf("Enter number #2 = ");
	scanf("%f",&num2);
	printf("Enter number #3 = ");
	scanf("%f",&num3);
	
	printf("\n----------------------------------\n");
	
	re1 = num1*num2*num3;
	re2 = re1*re1;
	re3 = re1*re2;
	
	printf("Result1 <num1*num2*num3>  = %.4f",re1);
	printf("\nResult2 <Result1*Result1> = %.4f",re2);
	printf("\nResult3 <Result1*Result2> = %.4f\n",re3);
	
	
	system("pause");
	return 0;
}
