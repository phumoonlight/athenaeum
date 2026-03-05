#include<stdio.h>
#include<conio.h>
int main ()
{
	char m;
	float area,pi=3.14,r,b,h,l,w;
	printf("--------------Menu--------------\n");
	printf("a. Circle\nb. Triangle\nc. Rectangle");
	printf("\nEnter Menu# : ");
	scanf("%c",&m);
	switch(m)
	{
		case 'a': printf("Enter radian : ");
		         scanf("%f",&r);
		         area=pi*r*r;
		         printf("Area of circle = %.2f\n",area);
		         break;
		case 'b' : printf("Enter Height : ");
		         scanf("%f",&h);
		         printf("Enter Base   : ");
		         scanf("%f",&b);
		         area=0.5*h*b;
		         printf("Area of triangle = %.2f\n",area);
		         break;
		case 'c' : printf("Enter Length : ");
		         scanf("%f",&l);
				 printf("Enter Width  : ");
				 scanf("%f",&w);
				 area=l*w;
				 printf("Area of Rectangle = %.2f\n",area); 
		default : printf("Error\n");        
	}
	system("pause");
	return 0;
}
