#include<stdio.h>

struct employee{
	char name[51];
	float salary;
}emp[3];

void display(struct employee emp_[]); //Function Prototype

void main(){
	int i;
	for(i=0;i<3;i++){
		printf("Enter Name[%d]: ",i+1);
		scanf("%s",emp[i].name);
		printf("Enter Salary[%d]: ",i+1);
		scanf("%f",&emp[i].salary);
	}
	display(emp);
	system("pause");
}

void display(struct employee emp_[]){
	printf("\n\n--------------------\n%-10s%-10s\n--------------------\n","Name","Salary");
	int i;
	for(i=0;i<3;i++)
		printf("\%-10s\%-10.2f\n",emp_[i].name,emp_[i].salary);
	printf("--------------------\n\n");
}

