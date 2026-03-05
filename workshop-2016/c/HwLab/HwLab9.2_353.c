#include<stdio.h>
#include<math.h>
int main(){
	float degree,result,pi=22.0/7.0,rad;
	
	printf("Enter degree: ");
	scanf("%f",&degree);
	rad=degree*pi/180.0;
	result=(2.0*sin(2*rad))+(cos(rad)/sin(rad))-1.0;
	printf("The result is %.4f\n",result);
	
	system("pause");
	return 0;
}
