#include<stdio.h>
int main ()
{
	char name[20];
	int id,lab,mid,final,total=0;
	printf("Enter your name Surname : ");
	scanf("%[^\n]",name);
	printf("Enter your Student ID   : ");
	scanf("%d",&id);
	printf("Enter your Score\n");
	printf("  Laboratory (15%%) = ");
	scanf("%d",&lab);
	printf("  Midterm    (35%%) = ");
	scanf("%d",&mid);
	printf("  Final      (50%%) = ");
	scanf("%d",&final);
	total = lab + mid + final;
	printf("Total (100%%) = %d\n",total);
	
	
	system("pause");
	return 0;
	
	
}
