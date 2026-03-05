#include<stdio.h>
#include<string.h>

void main(){
	struct date{
		char day[3];
		char year[5];
		char month[4];
	};
	struct student{
		char code[11];
		char name[51];
		struct date d;
	};
	
	struct student stu;
	
	printf("Input your Code: ");
	scanf("%s",stu.code);
	printf("Input your Name: ");
	scanf("%s",stu.name);
	printf("Input your Birthdate(EX. 01 June 1990): ");
	scanf("%s %s %s",stu.d.day,stu.d.month,stu.d.year);
	printf("-------------------------------\nCode: %s Name: %s \nBirthdate: Day %s, Month %s, Year %s\n",stu.code,stu.name,stu.d.day,stu.d.month,stu.d.year);

	
	system("pause");
}

