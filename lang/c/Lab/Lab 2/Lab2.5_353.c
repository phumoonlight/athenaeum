#include<stdio.h>

int main ()
{
   int n1,n2,n3,n4,sum=0;
   printf("Enter number 1 : ");
   scanf("%d",&n1);
   printf("Enter number 2 : ");
   scanf("%d",&n2);
   printf("Enter number 3 : ");
   scanf("%d",&n3);
   printf("Enter number 4 : ");
   scanf("%d",&n4);
   sum=n1+n2+n3+n4;
   
   if(sum>=50)
   {
   	printf("%d >= 50 \n",sum);
   }else{
   	printf("%d < 50 \n",sum);
   }
   
   system("pause");
   return 0;
   
}
