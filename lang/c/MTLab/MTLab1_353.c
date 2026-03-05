#include<stdio.h>
int main(){
	int unit,total;
	printf("Water unit = ");
	scanf("%d",&unit);
	if(unit<=50){
		printf("Free");
	}
	else if(unit>50&&unit<=100){
		total=unit*5;
		printf("Water price = <%d x 5> = %d\n",unit,total);
	}
	else if(unit>100&&unit<=200){
		total=(unit-100)*7+(100*5);
		printf("Water price = <100 x 5>+<%d x 7> = %d\n",unit-100,total);
	}
	else if(unit>200&&unit<=500){
		total=(unit-200)*10+(100*7)+(100*5);
		printf("Water price = <100 x 5>+<100 x 7>+<%d x 10> = %d\n",unit-200,total);
	}
	else if(unit>500){
		total=((unit-500)*15)+(300*10)+(100*7)+(100*5);
		printf("Water price = <100 x 5>+<100 x 7>+<300 x 10>+<%d x 15> = %d\n",unit-500,total);
	}else{
		printf("ERROR!!!\n");
	}
system("pause");
return 0;
}

