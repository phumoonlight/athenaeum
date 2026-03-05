#include<stdio.h>
#include<conio.h>
#include<string.h>
#include<math.h>
int main(){
	char s1[10],s2[10];
	printf("---String.h---\n");
	puts("Enter your string1 = ");
	gets(s1);
	printf("String1 Length = %d\n",strlen(s1));
	puts("Enter your string2 = ");
	gets(s2);
	printf("String2 Length = %d\n",strlen(s2));
	printf("String1 + String2 = %s\n",strcat(s1,s2));
	printf("strcopy = %s\n",strcpy(s1,s2));
    printf("strcompare = %d\n\n",strcmp(s1,s2));	
	
	int num;
	printf("---Math.h---\n");
	puts("Enter your number = ");
	scanf("%d",&num);
	printf("Square root of number = %.2f",sqrt(num));
	printf("\n------------\n");
	float c,f;
	puts("Enter number1 = ");
	scanf("%f",&c);
	puts("Enter number2 = ");
	scanf("%f",&f);
	printf("Ceil = %f\n",ceil(c));
	printf("Floor = %f\n",floor(f));
	printf("\n------------\n");
	float deg,pi;
	printf("Enter degree = ");
	scanf("%f",&deg);
	pi=3.14;
	printf("Sin<%.2f> = %.2f\n",deg,sin((deg*pi)/180));
	printf("Cos<%.2f> = %.2f\n",deg,cos((deg*pi)/180));
	printf("Tan<%.2f> = %.2f\n",deg,tan((deg*pi)/180));
	getch();
	return 0;
}
