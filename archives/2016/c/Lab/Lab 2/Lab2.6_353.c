#include<stdio.h>
#include<conio.h>

int main ()
{
	int age;
	printf("Enter number age: ");
	scanf("%d",&age);
	
	if(age<20)
	{
		printf("Ovantin Milk\n");
	}else if(age<=30&&age>=21)
	{
		printf("Bear Milk\n");
	}else if(age<=40&&age>=31)
	{
		printf("Cat Milk\n");
	}else if(age<=50&&age>=41)
	{
		printf("Dog Milk\n");
	}else if(age<=69&&age>=51)
	{
		printf("Sheep Milk\n");
	}else
	{
		printf("Cow Milk\n");
	}
	system("pause");
	return 0;
}
