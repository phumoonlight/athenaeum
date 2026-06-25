#include<stdio.h>
#include<conio.h>
int main ()
{
 int x=1,y=0,z=0;
 switch(x%2)
 {
  case 0 : x=2; y=3;
  case 1 : x=4; break;
  default : y=3;x=z;
 }
 printf("x = %d\n",&x);
 printf("x = %d\n",&y);
 printf("x = %d\n",&z); 
 system("pause");
 return 0;
}
