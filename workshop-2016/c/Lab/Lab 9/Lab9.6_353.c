#include<stdlib.h>
#include<stdio.h>
int main(){
	int i=1, ran;
	srand(time(0));
	printf("--Random Value--\n");
	do{
		ran = rand()%1000;
		printf("%d\n",ran);
		i++;
	}while(i<=10);
	system("pause");
	return 0;
}
