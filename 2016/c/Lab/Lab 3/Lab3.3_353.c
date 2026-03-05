#include<stdio.h>
#include<conio.h>
int main ()
{
	int m,n1,n2,r;
	printf("---------Menu--------\n");
    printf("1. Plus 2. Minus 3. Multiply 4. Devide\n");
    printf("Enter Menu# : ");
	scanf("%d",&m);
	
	switch(m)
	{
		case 1: printf("Enter number1 = ");
		        scanf("%d",&n1);
		        printf("Enter number2 = ");
		        scanf("%d",&n2);
		        r=n1+n2;
		break;
		case 2: printf("Enter number1 = ");
		        scanf("%d",&n1);
		        printf("Enter number2 = ");
		        scanf("%d",&n2);
		        r=n1-n2;
		break;
		case 3: printf("Enter number1 = ");
		        scanf("%d",&n1);
		        printf("Enter number2 = ");
		        scanf("%d",&n2);
		        r=n1*n2;
		break;
		case 4: printf("Enter number1 = ");
		        scanf("%d",&n1);
		        printf("Enter number2 = ");
		        scanf("%d",&n2);
		        r=n1/n2;
		break;
		default:  printf("Error\n");
	}
	printf("result = %d\n",r);
	system("pause");
	return 0;
}
