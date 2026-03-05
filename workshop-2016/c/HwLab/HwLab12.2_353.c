#include<stdio.h>
#define max 100
void display();
typedef struct{
		char name[20];
		int salary;
	}employee;
	
int main(){
	employee emp[3];
	int i=0;
	do{
		printf("Enter name[%d] = ",i+1);
		scanf("%s",emp[i].name);
		printf("Enter salary[%d] = ",i+1);
		scanf("%d",&emp[i].salary);
		i++;
	}while(i<3);
	display(emp);
	
	system("pause");
	return 0;
}

void display(employee e[]){
	int j=0;
	do{
		printf("%s \t %d\n",e[j].name,e[j].salary);
		printf("%d\n",max);
		j++;
	}while(j<3);
}
