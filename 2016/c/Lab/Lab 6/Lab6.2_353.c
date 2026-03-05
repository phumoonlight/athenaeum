#include<stdio.h>
int main()
{
	int num[5],sum;
	float avg;
	
	printf("Enter #1 = ");
	scanf("%d",&num[0]);
	printf("Enter #2 = ");
	scanf("%d",&num[1]);
	printf("Enter #3 = ");
	scanf("%d",&num[2]);
	printf("Enter #4 = ");
	scanf("%d",&num[3]);
	printf("Enter #5 = ");
	scanf("%d",&num[4]);
	sum = num[0]+num[1]+num[2]+num[3]+num[4];
	printf("Total = %d\n",sum);
	avg = sum/5;
	printf("Average = %f\n",avg);
	
	
	system("pause");
	return 0;
}
