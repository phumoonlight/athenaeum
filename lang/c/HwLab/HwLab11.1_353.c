#include<stdio.h>
#include<conio.h>
int main(){
	FILE *fptr,*pt0,*pt1,*pt2;
	char s[9];
	fptr=fopen("C:/Users/Asus/Desktop/textfile3.txt","r");

	if(fptr==NULL){
		printf("Can not open file\n");
	}else{
		printf("Can open file\n");
		int i;
		for(i=0;i<=3;i++){
			fscanf(fptr,"%c%c%c%c%c%c%c%c%c%c",&s[0],&s[1],&s[2],&s[3],&s[4],&s[5],&s[6],&s[7],&s[8],&s[9]);
		    printf("%c%c%c%c%c%c%c%c%c%c\n",s[0],s[1],s[2],s[3],s[4],s[5],s[6],s[7],s[8],s[9]);
		}
		
		
	}
	fclose(fptr);
	getch();
	return 0;
}
