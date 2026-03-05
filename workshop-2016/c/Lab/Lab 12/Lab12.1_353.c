#include<stdio.h>
int main(){
	typedef struct{
		char id[10];
		char name[50];
		float salary;
		float bonus;
		int age;
	}employee;
	employee emp1;
	printf("Enter id =");
	scanf("%s",emp1.id);
	printf("Enter name =");
	scanf("%s",emp1.name);
	printf("Enter salary =");
	scanf("%f",&emp1.salary);
	printf("Enter bonus =");
	scanf("%f",&emp1.bonus);
	printf("Enter age =");
	scanf("%d",&emp1.age);
	
	printf("ID = %s\n",emp1.id);
	printf("Name = %s\n",emp1.name);
	printf("Salary = %.2f\n",emp1.salary);
	printf("Bonus = %.2f\n",emp1.bonus);
	printf("Age = %d\n",emp1.age);
	system("pause");
	return 0;
}
