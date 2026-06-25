#include<stdio.h>
void calc(int); 
int main()
{
	int number;
	printf("Enter number = ");
	scanf("%d",&number);
	calc(number);
	system("pause");
	return 0;
}
void calc(int n){
	int total;
	total = n*n*n;
	printf("Multiple is %d\n",total);
}
