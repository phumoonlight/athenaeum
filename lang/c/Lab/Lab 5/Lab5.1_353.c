#include<stdio.h>
int main(){
	int count=1;
	do
	{
		if(count==1)
		{
			printf("000\n");
		}
		printf("Hi\n");
		count++;
	}while(count<=5);
	
	
	
	printf("End do...while\n");
	
	
	system("pause");
	return 0;
}
