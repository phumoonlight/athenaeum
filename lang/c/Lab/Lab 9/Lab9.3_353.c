#include<stdio.h>
#include<ctype.h>
int main(){
	char cha1='D', cha2='a', cha3='f', cha4='N';
	printf("%c (isupper) = %d\n",cha1,isupper(cha1));
	printf("%c (isupper) = %d\n",cha2,isupper(cha2));
	printf("%c (islower) = %d\n",cha3,islower(cha3));
	printf("%c (islower) = %d\n",cha4,islower(cha4));
	printf("%c (tolower) = %c\n",cha1,tolower(cha1));
	printf("%c (tolower) = %c\n",cha4,tolower(cha4));
	printf("%c (toupper) = %c\n",cha2,toupper(cha2));
	printf("%c (toupper) = %c\n",cha3,toupper(cha3));
	getch();
	return 0;
}
