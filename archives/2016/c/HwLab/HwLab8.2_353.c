#include<stdio.h>
#include<conio.h>
int sum(float,float,float);

int main(){
	float x, y, z, ans;
	
	printf("Input X : ");
	scanf("%f",&x);
	printf("Input Y : ");
	scanf("%f",&y);
	printf("Input Z : ");
	scanf("%f",&z);
	
	ans = sum(x,y,z);
	printf("Summary = %.2f\n",ans);
	
	system("pause");
	return 0;
}

int sum(float xx,float yy,float zz){
	float a=0;
	a=xx*xx*zz+yy/2*xx;
	return a;
}
