#include<stdio.h>
int main(){
	int m=25,n=60;
	int *pt_m,*pt_n;
	int x,y;
	pt_m=&m;
	pt_n=&n;
	x=*pt_m;
	y=*pt_n;
	printf("Value m = %d and n = %d\n",m,n);
	printf("address m = %p and n = %p\n",&m,&n);
	printf("value of pt_m-><m> = %p and pt_n-><n> = %p\n",pt_m,pt_n);
	printf("address of pt_m = %p and pt_n = %p\n",&pt_m,&pt_n);
	printf("Value x = %d and y = %d\n",x,y);
	
	system("pause");
	return 0;
}
