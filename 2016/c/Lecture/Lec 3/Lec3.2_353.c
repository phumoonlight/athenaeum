#include<stdio.h>
int main ()
{
	char name[20];
	int age;
	printf("Enter your name : ");
	scanf("%s",name);
	printf("Enter your age : ");
	scanf("%d",&age);
	printf("Your name is : %s\n Your age is : %d\n",name,age);
	system("pause");
	return 0;
	
	
}
