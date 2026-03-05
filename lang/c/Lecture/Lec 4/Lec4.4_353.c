#include<stdio.h>
#include<conio.h>
int main()
{
	int type;
 printf("---Menu---\n");
 printf("#1 Type 1\n");
 printf("#2 Type 2\n");
 printf("#3 Type 3\n");
 printf("#4 Type 4\n");
 printf("#5 Type 5\n");
 printf("   Choose menu : ");
 scanf("%d",&type);
	switch(type)
	{
		case 1 : printf("Type 1 - Carbon // 5 atom // status Gas\n");
		break;
		case 2 : printf("Type 2 - Carbon // 6 atom // status liquid\n");
		break;
		case 3 : printf("Type 3 - Nitrogen // 6 atom // status Gas\n");
		break;
		case 4 : printf("Type 4 - Nitrogen // 4 atom // status Solid\n");
		break;
		case 5 : printf("Type 5 - Type 1 + Hidrogen \n");
		break;
		default : printf("Error\n");
	}
	system("pause");
	return 0;
}
