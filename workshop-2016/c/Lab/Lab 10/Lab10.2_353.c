#include<stdio.h>
void getvalue(int *a,int *b);
int main(){
	int x,y;
	getvalue(&x,&y);
	printf("X = %d and Y = %d\n",x,y);
	
	system("pause");
	return 0;
}

void getvalue(int *a,int *b){ 
	printf("Enter num1 = ");
	scanf("%d",&*a);
	printf("Enter num2 = ");
	scanf("%d",&*b);
}
