#include<stdio.h>
int main()
{
	int i=1,num[5],sum;
	float avg;
	
	do
	{
		printf("Enter #%d = ",i);
		scanf("%d",&num[i-1]);
		i++;
	}
	while(i<=5);
	sum = num[0]+num[1]+num[2]+num[3]+num[4];
	printf("Total = %d\n",sum);
	avg = sum/5;
	printf("Average = %f\n",avg);
	
	system("pause");
	return 0;
}
