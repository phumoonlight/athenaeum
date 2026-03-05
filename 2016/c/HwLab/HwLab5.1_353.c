#include<stdio.h>
#include<conio.h>
int main()
{
	int i=1,v=0,a=0;
	char ch;
	
	do
	{
		printf("Enter your letter = ");
		ch=getche();
		printf("\n");
		i++;
		if(ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u')
		{
			v++;
		}else
		{
			a++;
		}
	}
	while(i<=10);
	printf("\nVowel = %d\n",v);
	printf("Alphabet = %d\n",a);
	
	system("pause");
	return 0;
	
}
