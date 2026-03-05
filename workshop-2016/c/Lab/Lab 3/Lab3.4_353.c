#include<stdio.h>
#include<conio.h>
int main ()
{
	int m,n1,n2,r;
	printf("Enter Num#1 : ");
	scanf("%d",&n1);
	printf("Enter Num#2 : ");
	scanf("%d",&n2);
	printf("---------Menu--------\n");
    printf("1. Plus 2. Minus 3. Multiply 4. Devide 5.Modulo\n\n");
    
    printf("Enter Menu# : ");
	scanf("%d",&m);
	
	switch(m)
	{
		case 1: r=n1+n2;
		break;
		case 2: r=n1-n2;
		break;
		case 3: r=n1*n2;
		break;
		case 4: r=n1/n2;
		break;
		case 5: r=n1%n2;
		break;
		default:printf("Error\n");
	}
	printf("Result = %d\n",r);
	system("pause");
	return 0;
}
