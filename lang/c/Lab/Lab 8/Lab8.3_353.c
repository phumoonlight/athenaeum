#include<stdio.h>
void movie(char); 
int main()
{   char c;
	printf("Do you want to see the movie (y/n)=");
	scanf("%c",&c);
	movie(c);
	system("pause");
	return 0;
}
void movie(char ch){
	if(ch=='y'||ch=='Y'){
        printf("Now Showing\n1. Spider Man\n2. Harry Potter\n3. Resident Evil\n");
	}else if(ch=='n'||ch=='N'){
		printf("Thank you and Good bye\n");
	}else {
		printf("Null\n");
	}
}
