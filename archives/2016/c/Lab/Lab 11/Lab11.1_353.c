#include<stdio.h>
#include<conio.h>
int main(){
	FILE *fptr;
	fptr=fopen("C:/Users/Lab4/Desktop/textfile.txt","r");
	if(fptr==NULL){
		printf("Cannot open file\n");
	}else{
		printf("Can open file\n");
	}
	fclose(fptr);
	getch();
	return 0;
}
