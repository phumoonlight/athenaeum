#include<stdio.h>

int main ()
{
   int age;
   printf("Enter your age : ");
   scanf("%d",&age);
   if(age>0&&age<=15)
   {
   	printf("Young\n");
   }else if(age>=16&&age<=21)
   {
   	printf("Teenage\n");
   }else if(age>21)
   {
   	printf("Old\n");
   }else
   {
   	printf("Error\n");
   }
   
   system("pause");
   return 0;
   
}
