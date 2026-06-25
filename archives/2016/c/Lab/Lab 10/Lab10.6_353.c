#include<conio.h>
int main(){
	char str[50];
	char *pstr1;
	char **pstr2;
	pstr1=&str;
	pstr2=&pstr1;
	puts("Enter your string = ");
	gets(str);
	printf("Your string = %s\n",*pstr2);
	
	getch();
	return 0;
}
