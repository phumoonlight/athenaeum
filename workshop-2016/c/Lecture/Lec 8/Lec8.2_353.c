#include<stdio.h>
int main(){
	int i=0,num[19],pos,max;
	printf("Find Maximum number / position\n");
	do{
		printf("Enter number#%d : ",i+1);
		scanf("%d",&num[i]);
		if(i==0){
			max=num[i];
			pos=i;
		}
		if(num[i]>max){
			max=num[i];
			pos=i;
		}
		i++;
		
	}while(i<20);
	printf("Maximum value = %d\n",max);
	printf("Position : number#%d\n",pos+1);
	
	
	system("pause");
	return 0;
}
