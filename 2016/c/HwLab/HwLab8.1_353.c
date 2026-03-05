#include<stdio.h>
#include<conio.h>
int plus(int,int);
int minus(int,int);
int multiply(int,int);
int divide(int,int);
int main()
{
	int n1, n2, menu, ans;
	printf("Enter number1 = ");
	scanf("%d",&n1);
	printf("Enter number2 = ");
	scanf("%d",&n2);
	printf("-----Menu-----\n");
	printf("1.plus \n2.minus \n3.multiply \n4.divide\n");
	printf("Choose menu number : ");
	scanf("%d",&menu);
	printf("-----Answer-----\n");
	
	switch(menu)
	{
		case 1: ans = plus(n1,n2);
				printf("%d + %d = %d\n",n1,n2,ans);
		break;
		case 2: ans = minus(n1,n2);
				printf("%d - %d = %d\n",n1,n2,ans);
		break;
		case 3: ans = multiply(n1,n2);
				printf("%d * %d = %d\n",n1,n2,ans);
		break;
		case 4: ans = divide(n1,n2);
				printf("%d / %d = %d\n",n1,n2,ans);
		break;
	}
	getch();
	return 0;
}	
plus(int n1,int n2)
{
	int sum;
	sum=n1+n2;
	return sum;
}	
minus(int n1,int n2)
{
	int sum;
	sum=n1-n2;
	return sum;
}	
multiply(int n1,int n2)
{
	int sum;
	sum=n1*n2;
	return sum;
}	
divide(int n1,int n2)
{
	int sum;
	sum=n1/n2;
	return sum;
}	
