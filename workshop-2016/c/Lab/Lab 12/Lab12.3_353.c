#include<stdio.h>
int main(){
	struct student{
		char name[20];
		int age;
	}s[10];
	int i=0;
	do{
		printf("Student[%d]\n",i+1);
		printf("Name = ");
		scanf("%s",s[i].name);
		printf("Age = ");
		scanf("%d",&s[i].age);
		i++;
	}while(i<10);
	printf("\n-----Student of age >= 20------\n");
	i=0;
	do{
		if(s[i].age>=20){
			printf("%s and %d\n",s[i].name,s[i].age);
			i++;
		}
	}while(i<10);
	
	system("pause");
	return 0;
}
