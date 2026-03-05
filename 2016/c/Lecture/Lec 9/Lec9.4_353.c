#include<stdio.h>
void sum(float,float);
int main(){
	float num1,num2;
	
	printf("Input real value : ");
	scanf("%f",&num1);
	printf("Input real value : ");
	scanf("%f",&num2);
	sum(num1,num2);
	
	system("pause");
	return 0;
}

void sum(float n1,float n2){
	 float s;
     s=n1+n2;
     printf("Result of sum is : %.3f\n",s);
}
