#include<stdio.h>
#include<conio.h>
int main()
{	
	char text[200];
	int i=0,word,letter;

			printf("Enter a sentence : \n");
			gets(text);
				
				
								
			printf("\nResult :\n");
		
		for(i=1;i<=letter;i=i+10){
			printf("%c%c%c%c%c%c%c%c%c%c\n",text[i-1],text[i],text[i+1],text[i+2],text[i+3],text[i+4],text[i+5],text[i+6],text[i+7],text[i+8],text[i+9]);
			
		}
		printf("\n");
system("pause");
return 0;

}

