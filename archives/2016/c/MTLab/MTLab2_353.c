#include<stdio.h>
int main(){
	int christ;
	printf("Enter Christian Year = ");
	scanf("%d",&christ);
	if(christ%4==0&&(christ%100!=0||christ%400==0)){
		printf("leap year !\n");
 }
	else{
	printf("No leap year\n");
	}
system("pause");
return 0;
}
