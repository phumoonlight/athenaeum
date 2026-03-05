#include<stdlib.h>
#include<stdio.h>
int main(){
	int num,ran;
	srand(time(0));
	printf("input your number = ");
	scanf("%d",&num);
	ran = rand()%100;
	if(num<ran){
		printf("Random<%d> < guess<%d>\n",num,ran);
	}else if(num>ran){
		printf("Random<%d> > guess<%d>\n",num,ran);
    }else if(num==ran){
    	printf("Random<%d> = guess<%d>\n",num,ran);
    }
	
	system("pause");
	return 0;
}
