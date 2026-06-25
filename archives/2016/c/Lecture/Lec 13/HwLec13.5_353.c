#include<stdio.h>
#include<string.h>

void main(){
	union ascii{
		int dec;
	}pool;
	int i;
	for(i=65;i<=90;i++){
		pool.dec=i;
		printf("ASCII\t%d\t%c\n",pool.dec,pool.dec);
		
	}
	system("pause");
}

