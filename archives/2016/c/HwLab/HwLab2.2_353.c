#include<stdio.h>
#include<conio.h>

int main ()
{
	int scr;
	printf("Enter  your score : ");
	scanf("%d",&scr);
	
	if(scr<=100&&scr>=90)
	{
		printf("Score = %d , Your Grade : A\n",scr);
	}else if(scr<=89&&scr>=81)
	{
		printf("Score = %d , Your Grade : B\n",scr);
	}else if(scr<=80&&scr>=71)
	{
		printf("Score = %d , Your Grade : C\n",scr);
	}else if(scr<=70&&scr>=61)
	{
		printf("Score = %d , Your Grade : D\n",scr);
	}else if(scr<=60&&scr>=51)
	{
		printf("Score = %d , Your Grade : E\n",scr);
	}else if(scr<50)
	{
		printf("Score = %d , Your Grade : F\n",scr);
	}else 
	{
		printf("Error\n");
	}
	system("pause");
	return 0;

}
