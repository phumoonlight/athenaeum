#include<stdio.h>
#include<conio.h>

int main ()
{
	char name[40],major[15],color[15];
	int dorm,sec;
	printf("Enter your name           = ");
	scanf("%[^\n]",name);
	printf("Enter your major          = ");
	scanf("%s",major);
	printf("Enter your section#       = ");
	scanf("%d",&sec);
	printf("Enter your dormitory#     = ");
	scanf("%d",&dorm);
	printf("Enter your favorite color = ");
	scanf("%s",color);
	printf("\n----------------------------------\n");
	
	printf("Full-name = %s\n",name);
	printf("Major     = %s\n",major);
	printf("section   = %d\n",sec);
	printf("Dormitory = %d\n",dorm);
	printf("Color     = %s\n",color);
	
	system("pause");
	return 0;
}
