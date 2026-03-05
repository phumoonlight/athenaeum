#include<stdio.h>
int main(){
	int n1,n2,menu,ans;	 
	printf("Enter num1 : ");
	scanf("%d",&n1);
	printf("Enter num2 : ");
	scanf("%d",&n2);
	printf("calculator menu :\n");
	printf("1. + \n2. - \n3. * \n4. / \n5. %% \n");	
	printf("choose menu : ");
	scanf("%d",&menu);
	switch(menu){
		case 1 : ans=n1+n2;
				printf("Ans:Num1 + Num2 = %d\n",ans);
				break;
		case 2 : ans=n1-n2;
				printf("Ans:Num1 - Num2 = %d\n",ans);
				break;			
		case 3 : ans=n1*n2;
				printf("Ans:Num1 * Num2 = %d\n",ans);
				break;
		case 4 : ans=n1/n2;
				printf("Ans:Num1 / Num2 = %d\n",ans);
				break;
		case 5 : ans=n1%n2;
				printf("Ans:Num1 % Num2 = %d\n",ans);
				break;
		default : printf("Error\n");
	}
	
	
	
	
	system("pause");
	return 0;
}
