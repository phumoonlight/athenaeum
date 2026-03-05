#include<stdio.h>
int main()
{
	int i,num;
	for(i=0;i>=0&&i<=127;i=i){
		printf("Enter number =");
		scanf("%d",&num);
		if(num>=0&&num<=127){
			printf("%c = %d\n",num,num);
		}
		i=num;
	}
	
	
	
	system("pause");
	return 0;
}
