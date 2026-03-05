#include<stdio.h>

void main(){
	typedef struct{
		int x;
		int y;
	}point;
	
	point p1;
	point p2;
	
	printf("Regtangle DATA\nEnter point of x(left-bottom): ");
	scanf("%d",&p1.x);
	printf("Enter point of y(left-bottom): ");
	scanf("%d",&p1.y);
	printf("Enter point of x(right-top): ");
	scanf("%d",&p2.x);
	printf("Enter point of y(right-top): ");
	scanf("%d",&p2.y);
	printf("\nArea: %d\n",(p2.x-p1.x)*(p2.y-p1.y));
	system("pause");
}

