#include<stdio.h>
int main(){
	int i=0,t;
	printf("How many times do you want : ");
	scanf("%d",&t);
	int num[t-1];
	do{
		printf("Enter number#%d : ",i+1);
		scanf("%d",&num[i]);
		i++;
	}while(i<t);
	i=0;
	do{
		printf("num[%d] = %d\n",i,num[i]);
		i++;
	}while(i<t);
	
	system("pause");
	return 0;
}


