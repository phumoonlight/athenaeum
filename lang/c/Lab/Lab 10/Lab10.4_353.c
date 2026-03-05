#include<stdio.h>
#include<conio.h>
int main(){
	char str[100];
	char *pstr;
	int i=0;
	puts("Enter your string = ");
	gets(str);
	pstr=&str;
	do{
		pstr++;
		i++;
	}while(*pstr);
	printf("Length of string = %d\n",i);
	puts("Reverse of string = ");
	do{
		printf("%c",*pstr);
		i--;
		pstr--;
	}while(i>=0);
	puts("\n");
	system("pause");
	return 0;
}
