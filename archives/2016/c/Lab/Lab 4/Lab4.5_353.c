#include<stdio.h>
int main()
{
	int i=1,num;
	printf("Enter number : ");
	scanf("%d",&num);
	while(i<=12)
	{
		
		printf("%d x %d = %d\n",num,i,num*i);
		i++;
	}
	printf("End while\n");
	system("pause");
	return 0;
	
}
