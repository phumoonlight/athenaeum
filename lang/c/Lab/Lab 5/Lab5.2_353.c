#include<stdio.h>
int main()
{
	int i=1,num;
	printf("Enter your number =");
	scanf("%d",&num);
	do{
		printf("%d X %d = %d\n",num,i,num*i);
		i=i+1;
	}while(i<=12);
	
	printf("End do while\n");	
	system ("pause");
	return 0;
}
