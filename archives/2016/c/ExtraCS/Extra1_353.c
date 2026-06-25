#include<stdio.h>
#include<conio.h>
int main(){
	int num,numact,countact[6]={0,0,0,0,0,0};
	char act;
	
	printf("Enter number : ");
	scanf("%d",&num);
	printf("Enter 'e' to Action for Stop\n");
	printf("Place + , - , * , / or %% then number in ""Action""\n");
	do{
		printf("Action : ");
	    act = getche();
	    if(act=='+'){
	    	printf(" ");
	        scanf("%d",&numact);
	    	num=num+numact;
	        printf("Result = %d\n",num);
	    	countact[0]++;
		}else if(act=='-'){
			printf(" ");
	        scanf("%d",&numact);
			num=num-numact;
	    	printf("Result = %d\n",num);
	    	countact[1]++;
		}else if(act=='*'){
			printf(" ");
	        scanf("%d",&numact);
			num=num*numact;
	    	printf("Result = %d\n",num);
	    	countact[2]++;
		}else if(act=='/'){
			printf(" ");
	        scanf("%d",&numact);
			num=num/numact;
	    	printf("Result = %d\n",num);
	    	countact[3]++;
		}else if(act=='%'){
			printf(" ");
	        scanf("%d",&numact);
			num=num%numact;
	    	printf("Result = %d\n",num);
	        countact[4]++;
		}else if(act=='e'){
			printf("\nEnding\n");
				printf("Total Plus     + = %d\n",countact[0]);
				printf("Total Minus    - = %d\n",countact[1]);
			    printf("Total Multiply x = %d\n",countact[2]);
				printf("Total Divide   / = %d\n",countact[3]);
				printf("Total Modulo   %% = %d\n",countact[4]);
				printf("Total Action = %d\n",countact[0]+countact[1]+countact[2]+countact[3]+countact[4]);
				printf("Total Error  = %d\n",countact[5]);
		}else{
			printf("\nError, Try agian.\n");
			countact[5]++;
		}
	}while(act!='e');
	
	system("pause");
	return 0;
}

