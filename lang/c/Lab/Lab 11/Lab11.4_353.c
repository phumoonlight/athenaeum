#include<stdio.h>
#include<conio.h>
int main(){
	FILE *fptr;
	int i;
	char name[20],job[20];
	fptr=fopen("C:/Users/Lab4/Desktop/textfile2.txt","w ");
	if(fptr==NULL){
		printf("Cannot open file\n");
	}else{
		printf("Can open file\n");
		for(i=1;i<=3;i++){
			printf("Enter name[%d] = ",i);
			scanf("%s",name);
			printf("Enter job[%d] = ",i);
			scanf("%s",job);
			fprintf(fptr,"Name[%d] = %s and Job[%d] = %s\n",i,name,i,job);
		}
	}
	fclose(fptr);
	getch();
	return 0;
}
