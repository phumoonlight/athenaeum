#include<stdio.h>

int main ()
{
   char ch;
   printf("\tMenu\n");
   printf("Press a = DotA\n");
   printf("Press b = Pangya\n");
   printf("Press c = Audition\n");
   printf("Any press = No play game\n");
   printf("Enter your choice = ");
   scanf("%c",&ch);
   if(ch=='a'||ch=='A'){
   	printf("DotA\n");
   }else if(ch=='b'||ch=='B'){
   	printf("Pangya\n");
   }else if(ch=='c'||ch=='C'){
   	printf("Audition\n");
   }else{
   	printf("No play game\n");
   }
   system("pause");
   return 0;
   
}
	
	
	

