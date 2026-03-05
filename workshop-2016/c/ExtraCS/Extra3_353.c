#include<stdio.h>
#include<conio.h>
int main(){
    float num,num2;
    float percent;
    int ch;
    puts("Extra #3 : Percent <switch case>");
    puts("Enter number : ");
    scanf("%f",&num);
    
    puts("--Menu--");
    puts("1.Increase value by [%]");
    puts("2.Decrease value by [%]");
    puts("3.Set value by [%]");
    puts("4.Input new number[float] and show [%] relative between 2 numbers");
    
    puts("Choose one [1-4] :");
    scanf("%d",&ch);
    switch(ch){
    	case 1 : printf("Increase value by [%%] : ");
    	         scanf("%f",&percent);
                 printf("Result : %.2f increase by %.2f%% = %.2f",num,percent,num*(1+(percent/100)));
    	         break;
    	case 2 : printf("Decrease value by [%%] : ");
    	         scanf("%f",&percent);
                 printf("Result : %.2f decrease by %.2f%% = %.2f",num,percent,num*(1-(percent/100)));
    	         break;
    	case 3 : printf("set value by [%%] : ");
    	         scanf("%f",&percent);
                 printf("Result : %.2f%% of %.2f = %.2f",percent,num,num*(percent/100));
    	         break;
		case 4 : printf("Input new number[float] : ");
    	         scanf("%f",&num2);
                 printf("Result : %.2f is %.2f%% of %.2f\n",num2,(num2*100)/num,num);
                 printf("         %.2f is %.2f%% of %.2f",num,(num*100)/num2,num2);
    	         break;	
		default: printf("\nError\n");         		
	}
	printf("\n");
	system("pause");
	return 0;
}



