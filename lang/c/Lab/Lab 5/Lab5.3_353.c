#include<stdio.h>
int main()
{
	int i=1,num;
	printf("Enter your number =");
	scanf("%d",&num);
	do{
		if(num>=2&&num<=25){
		printf("%d X %d = %d\n",num,i,num*i);
		i=i+1;
		}else{
			printf("Enter your number =");
			scanf("%d",&num);	
		}
	}while(i<=12);
	system("pause");
	return 0;
}
