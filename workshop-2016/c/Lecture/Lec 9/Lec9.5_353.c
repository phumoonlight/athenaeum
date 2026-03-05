#include<stdio.h>
int inputa();
int inputb();
int inputc();
int cal(int,int,int);
int output(int);

int main(){
	int abc1,abc2,abc3;
	
	abc1=inputa();
	abc2=inputb();
	abc3=inputc();
	cal(abc1,abc2,abc3);
	output(cal(abc1,abc2,abc3));
	
	system("pause");
	return 0;	
}

int inputa(){
	int ina;
	printf("Enter a value = ");
	scanf("%d",&ina);
	return ina;
}

int inputb(){
	int inb;
	printf("Enter b value = ");
	scanf("%d",&inb);
	return inb;
}

int inputc(){
	int inc;
	printf("Enter c value = ");
	scanf("%d",&inc);
	return inc;
}

int cal(int a,int b,int c){
	int x;
	x = ((a*a)*c)+((a*a)*b)/(2*a);
	return x;
}

int output(int result){
	printf("Output Result = %d\n",result);
	return result;
}
