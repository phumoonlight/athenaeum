#include<conio.h>
#include<string.h>
int main(){
    char user[20];
    char pass[20];
    char login1[20];
    char login2[20];
    int i=0;
    
    puts("Register your username :");
	gets(user);
	puts("Your password :");
	gets(pass);
	
	puts("-------Register Complete-------");
	puts("--Login--");
	
	do{
	    puts("Enter your username :");
	    gets(login1);
	    puts("Enter password :");
	    gets(login2);
	        if((strcmp(user,login1)==0)&&(strcmp(pass,login2)==0)){
		        puts("Login Successful");
		        i++;
	        }else{
		        puts("Login fail, try agian");
	        } 
	}while(i==0);
	
	system("pause");
	return 0;
}
