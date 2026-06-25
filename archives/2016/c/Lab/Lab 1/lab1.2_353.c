#include<stdio.h>

int main ()
{
	/*float C,F=200.5;
	C = 5*(F-32)/9;
	printf("C degree = %.2f when F degree = %.2f\n",C,F); */
	
    float C=38.0,F;
    F = ((C*9)/5)+32;
    printf("F degree = %.2f when C degree = %.2f\n",F,C);
    system ("pause"); 
    return 0 ;
}
