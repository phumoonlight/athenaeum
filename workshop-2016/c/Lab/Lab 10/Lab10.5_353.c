#include<stdio.h>
#include<conio.h>
int main(){
	int y[10] = {10,20,30,40,50,60,70,80,90,100};
	int *pty[10];
	int i;
	for(i=0;i<=9;i++){
		pty[i]=&y[i];

	}
	for(i=0;i<=9;i++){
		*pty[i]=*pty[i]+30;
		printf("y[%d] = %d\n",i,*pty[i]);
	}
	system("pause");
	return 0;
}
