#include<stdio.h>
int main(){
	int num,i;
	printf("Enter a number : ");
	scanf("%d",&num);
	do{	
		if(num>=2&&num<=25){
			printf("%4d * %-2d = %-3d\n",num,i,num*i);
			i++;
		}else{
	printf("Enter a number : ");
	scanf("%d",&num);
	}
		}while(i<=12);
	system("pause");
	return 0;
}
