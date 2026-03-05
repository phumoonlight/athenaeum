#include<stdio.h>
int main(){
    int n,r=0;
    do{
       printf("Enter a number : ");
       scanf("%d",&n);
       r=n*n+r;
    }while(n!=0);
    printf("Result = %d\n",r);
    system("pause");
    return 0;
    }

