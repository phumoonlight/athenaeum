#include<stdio.h>
int main()
{
    float weight,height,bmi;
    printf("----------BMI Calculator----------\n");
    printf("Input weight(kg): ");
    scanf("%f",weight);
    printf("Input height(cm): ");
    scanf("%f",&height);
    printf("----------------------------------\n");
    
    bmi=(weight)/((height/100)*(height/100));
    
    if(bmi<20){
    	printf("BMI=%.2f\n",bmi);
		printf("You are underweight\n");
    }
    else if(bmi>=20&&bmi<=23){
    	printf("BMI=%.2f\n",bmi);
    	printf("You are healthy\n");
    }
    else if(bmi>=23.01&&bmi<=24.99){
    	printf("BMI=%.2f\n",bmi);
    	printf("You are overweight\n");
    }
    else if(bmi>=25&&bmi<=29.99){
    	printf("BMI=%.2f\n",bmi);
    	printf("You are obese level 1 \n");
    }
    else if(bmi>30){
    	printf("BMI=%.2f\n",bmi);
    	printf("You are obese level 2 \n");
    }
    else{
    	printf("ERROR!!!\n");
    }
    printf("----------------------------------\n");
	system("pause");
	return 0;
}
