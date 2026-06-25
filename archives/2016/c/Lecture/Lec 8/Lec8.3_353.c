#include<stdio.h>
int main()
{
	int A[2][2]={2,3,4,9},B[2][2]={5,5,6,6};
	
	printf("Sum[0][0] = %d\n",A[0][0]*B[0][0]+A[0][1]*B[1][0]);
	printf("Sum[0][1] = %d\n",A[0][0]*B[0][1]+A[0][1]*B[1][1]);
	printf("Sum[1][0] = %d\n",A[1][0]*B[0][0]+A[1][1]*B[1][0]);
	printf("Sum[1][1] = %d\n",A[1][0]*B[0][1]+A[1][1]*B[1][1]);

    system("pause");
    return 0;
}
