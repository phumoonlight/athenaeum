#include<stdio.h>
int main(){
	int array[10]={2,4,6,8,10,12,14,16,18,20};
	int i=0;
	do{
	    printf("%5d",array[i]);
		i++;	
	}while(i<10);
	printf("\n");
	add(&array);
	i=0;
	do{
	   	printf("%25d\n",*(array+i));
	   	i++;
	}while(i<10);
	system("pause");
	return 0;
}

add(int *pt_array){
	int j=0;
	do{
	    *(pt_array+j)=*(pt_array+j)+20;
		j++;	
	}while(j<10);
}
