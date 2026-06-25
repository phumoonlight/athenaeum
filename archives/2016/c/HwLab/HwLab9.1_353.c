#include<stdio.h>
#include<string.h>
int main(){
	char user[20],password[20];
	printf("Username: ");
	scanf("%s",user);
	printf("Password: ");
	scanf("%s",password);
	printf("============================\n");
	if((strcmp(user,"admin")==0)&&(strcmp(password,"1234")==0)){
		printf("Hello, Mr.ComSci\n");
	}else{
		printf("Error\n");
	} 
	getch();
	return 0;
}
