#include<stdio.h>
#include<conio.h>
int main()
{
	int sum[2][2], A[2][2], B[2][2];
	int i,j;
	
	for(i=0;i<=1;i++){
		for(j=0;j<=1;j++){
			printf("Enter Matrix A number : ",i,j);
			scanf("%d",&A[i][j]);
		}	
	}
	
	printf("----------------------------------\n");
	
	for(i=0;i<=1;i++){
		for(j=0;j<=1;j++){
			printf("Enter Matrix B number : ",i,j);
			scanf("%d",&B[i][j]);
		}	
	}
	printf("----------------------------------\n");
	
	sum[0][0]=(A[0][0]*B[0][0])+(A[0][1]*B[1][0]);
	sum[0][1]=(A[0][0]*B[0][1])+(A[0][1]*B[1][1]);
	sum[1][0]=(A[1][0]*B[0][0])+(A[1][1]*B[1][0]);
	sum[1][1]=(A[1][0]*B[0][1])+(A[1][1]*B[1][1]);
	
	printf("sum[0][0] = %d\n",sum[0][0]);
	printf("sum[0][1] = %d\n",sum[0][1]);
	printf("sum[1][0] = %d\n",sum[1][0]);
	printf("sum[1][1] = %d\n",sum[1][1]);
	
	getch();
	return 0;
}
