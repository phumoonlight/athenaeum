#include<stdio.h>
#include<conio.h>
int main(){
	int x[5];
	int *pt_1,*pt_2,*pt_3,*pt_4,*pt_5;
	int i=0;
	printf("Enter number[1] = ");
	scanf("%d",&x[0]);
	printf("Enter number[2] = ");
	scanf("%d",&x[1]);
	printf("Enter number[3] = ");
	scanf("%d",&x[2]);
	printf("Enter number[4] = ");
	scanf("%d",&x[3]);
	printf("Enter number[5] = ");
	scanf("%d",&x[4]);
	pt_1=&x[0];
	pt_2=&x[1];
	pt_3=&x[2];
	pt_4=&x[3];
	pt_5=&x[4];
	printf("Reverse number = \n");
	printf("%d %d %d %d %d\n",*pt_5,*pt_4,*pt_3,*pt_2,*pt_1);
	system("pause");
	return 0;
}
