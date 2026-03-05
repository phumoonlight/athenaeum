#include<stdio.h>
int main()
{
	int i=0,num[10];
	
	do{
		printf("Enter number#%d = ",i+1);
		scanf("%d",&num[i]);
		i++;		
	}while(i<10);
	i=0;
	
	printf("----Result >= 50-------\n");
	
	do{
		if(num[i]>=50){
			printf("Number#%d and Index[%d] = %d\n",i+1,i,num[i]);
		}
		i++;
	}while(i<10);
	
	system("pause");
	return 0;
}
