#include<stdio.h>
int Add(int,int);
int difference(int,int);
int multiply(int,int);
int devision(int,int);
int main(){
	int num[2],ch;
	
	printf("Enter number#1 = ");
	scanf("%d",&num[0]);
	printf("Enter number#2 = ");
	scanf("%d",&num[1]);
	printf("Menu\n");
	printf("1.Addition\n");
	printf("2.Difference\n");
	printf("3.Multiply\n");
	printf("4.Devision\n");
	printf("Select Menu : ");
	scanf("%d",&ch);
	switch(ch){
		case 1 :Add(num[0],num[1]);
		        printf("Result = %d\n",Add(num[0],num[1]));
			    break;
	    case 2 :difference(num[0],num[1]);
	            printf("Result = %d\n",difference(num[0],num[1]));
			    break;		 
		case 3 :multiply(num[0],num[1]);
		        printf("Result = %d\n",multiply(num[0],num[1]));
			    break;		    
		case 4 :devision(num[0],num[1]);
		        printf("Result = %d\n",devision(num[0],num[1]));
			    break;
		default:printf("Error");				    				   
		}
	
		
	system("pause");
	return 0;	
	}
	
int Add(int n1,int n2){
	int re1;
	re1=n1+n2;
	return re1;
}
int difference(int n3,int n4){
	int re2;
	re2=n3-n4;
	return re2;
}
int multiply(int n5,int n6){
	int re3;
	re3=n5*n6;
	return re3;
}
int devision(int n7,int n8){
	int re4;
	re4=n7/n8;
	return re4;
}
