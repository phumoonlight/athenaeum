#include<stdio.h>
int main()
{
	int i,j,num;
	
	printf("Enter number : ");
	scanf("%d",&num);
	printf("\n");
	for(i=0;i<num;i++)
	{
		for(j=0;j<=i;j++)
		{
			printf("%d",j);
		}
		printf("\n");
	}
	
	for(i=i-1;i>=0;i--)
	{
		for(j=0;j<i;j++)
		{
			printf("%d",j);
		}
		printf("\n");
	}
	
	
	system("pause");
	return 0;
}
