#include<stdio.h>
#include<conio.h>
int main(){
	FILE *fptr;
	char y_n,name[50];
	int i=0;
	fptr=fopen("C:/Users/Asus/Desktop/textfile4.txt","w");
	if(fptr==NULL){
		printf("Can not open file\n");
	}else{
		printf("Can open file\n");
		do{
			printf("Enter your name = ");
			gets(name);
			fprintf(fptr,"%s\n",name);
			do{
				printf("Continue or not(y/n) = ");
			    y_n=getche();
			    i=0;
			    if(y_n=='n'){
			    	i=1;
				}else if(y_n=='y'){
					i=1;
				}else{
					printf("\n");
				}		
			}while(i==0);
			printf("\n");
		}while(y_n=='y');
	}
	fclose(fptr);
	getch();
	return 0;
}
