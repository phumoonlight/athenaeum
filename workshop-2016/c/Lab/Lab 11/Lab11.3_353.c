#include<stdio.h>
#include<conio.h>
int main(){
	FILE *fptr;
	char s1,s2,s3;
	fptr=fopen("C:/Users/Lab4/Desktop/textfile.txt","r");
	if(fptr==NULL){
		printf("Cannot open file\n");
	}else{
		printf("Can open file\n");
		fscanf(fptr,"%c %c %c",&s1,&s2,&s3);
		printf("%c %c %c\n",s1,s2,s3);
		
	}
	if(!fclose(fptr)){
		printf("Not close file\n");
		fclose(fptr);
		printf("Close file\n");
	}else{
		printf("Error");
	}
	getch();
	return 0;
}
