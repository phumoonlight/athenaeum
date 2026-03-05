#include<stdio.h>
int main()
{
	int work[2][2];
	printf("Enter Work Day#1 = ");
	scanf("%d",&work[0][0]);
	printf("Enter Salary#1 = ");
	scanf("%d",&work[0][1]);
	printf("Enter Work Day#2 = ");
	scanf("%d",&work[1][0]);
	printf("Enter Salary#2 = ");
	scanf("%d",&work[1][1]);
	printf("All work day = %d\n",work[0][0]+work[1][0]);
	printf("All salary = %d\n",work[0][1]+work[1][1]);
	
	system("pause");
	return 0;
}
