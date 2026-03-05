#include<stdio.h>
int main()
{
	int i,num,sum=1;
	printf("Enter number = ");
	scanf("%d",&num);
	printf(">>>");
	for(i=num;i>=1;i=i-1)
	{
		sum=sum*i;
		printf("\t%d",i);
		
	}
	printf("\n\t\t%d! = %d\n",num,sum);
	system("pause");
	return 0;
}
