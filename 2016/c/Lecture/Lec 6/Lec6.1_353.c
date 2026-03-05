#include<stdio.h>
int main(){
	int num;
	do{
		printf("Enter a number : ");
		scanf("%d",&num);
		if(num==1){
			printf("Hello\n");
		}else if(num==2){
			printf("Thank you\n");
		}else if(num==3){
			printf("Good bye\n");
		}else
		printf("Sorry\n");
	}while(num!=3);
	system("pause");
	return 0;
}
