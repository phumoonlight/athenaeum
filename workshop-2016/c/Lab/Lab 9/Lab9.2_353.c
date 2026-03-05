#include<stdio.h>
#include<ctype.h>
int main(){
	char cha1 = 'B', cha2 = '3', cha3 = '&';
	printf("%c (isdigit) = %d\n",cha1,isdigit(cha1));
	printf("%c (isdigit) = %d\n",cha2,isdigit(cha2));
	printf("%c (isdigit) = %d\n",cha3,isdigit(cha3));
	printf("%c (isalpha) = %d\n",'A',isalpha('A'));
	printf("%c (isalpha) = %d\n",'0',isalpha('0'));
	printf("%c (isalpha) = %d\n",'$',isalpha('$'));
	printf("%c (isalnum) = %d\n",cha1,isalnum(cha1));
	printf("%c (isalnum) = %d\n",cha2,isalnum(cha2));
	printf("%c (isalnum) = %d\n",cha3,isalnum(cha3));
	printf("%c (isalnum) = %d\n",'A',isalnum('A'));
	printf("%c (isalnum) = %d\n",'0',isalnum('0'));
	printf("%c (isalnum) = %d\n",'$',isalnum('$'));
	getch();
	return 0;
	
}
