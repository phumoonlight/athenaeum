#include<stdio.h>
int main(){
	struct point{
		int x;
		int y;
	}p1,p2;
	printf("point x Left-down = ");
	scanf("%d",&p1.x);
	printf("point y Left-down = ");
	scanf("%d",&p1.y);
	printf("point x right-up = ");
	scanf("%d",&p2.x);
	printf("point y right-up = ");
	scanf("%d",&p2.y);
	int area;
	area = (p2.x-p1.x) * (p2.y-p1.y);
	printf("Area = %d\n",area);
	
	system("pause");
	return 0;
}
