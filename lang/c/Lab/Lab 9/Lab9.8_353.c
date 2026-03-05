#include<stdlib.h>
#include<stdio.h>
int main(){
	int i=0,num,ran;
	srand(time(0));
	ran = rand()%100;
	do{
	  printf("Guess your number(0-99) = ");
	  scanf("%d",&num);
	  if(ran<num){
		printf("X < %d\n",num);
	}else if(ran>num){
		printf("X > %d\n",num);
    }else if(num==ran){
    	printf("Answer = %d and Congrat!\n",ran);	
    }
	}while(num!=ran);
	
	
	system("pause");
	return 0;
}
