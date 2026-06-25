#include<stdio.h>
#include<conio.h>
int main(){
	FILE *fptr;
	//char s1[20],s2[15],s3[10];
	//char s4[30];
	char ch;
	fptr=fopen("C:/Users/Asus/Desktop/textfile.txt","r");
	if(fptr==NULL){
		printf("Cannot open file\n");
	}else{
		printf("Can open file\n");
		//fscanf(fptr,"%s %s %s",s1,s2,s3);
		//printf("%s %s %s\n",s1,s2,s3);
		//fgets(s4,30,fptr);
		//printf("%s",s4);
		ch=fgetc(fptr);
		printf("%c\n",ch);
	}
	fclose(fptr);
	getch();
	return 0;
}
