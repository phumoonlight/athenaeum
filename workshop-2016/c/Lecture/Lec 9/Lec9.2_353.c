#include<stdio.h>
void multiply(int);
int main(){
	int num;
	
	printf("Enter number = ");
	scanf("%d",&num);
	multiply(num);
	
	system("pause");
	return 0;
}

void multiply(int n){
	int i=1;
     do{
     	printf("%d x %d = %d\n",i,n,i*n);
     	i++;
	 }while(i<=12);
}
