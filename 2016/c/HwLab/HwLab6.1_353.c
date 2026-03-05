#include<stdio.h>
int main()
{
	int i=0,num[20],min,pos;
	
	do
	{
		printf("Enter number %d : ",i+1);
		scanf("%d",&num[i]);
		
		if(i==0)
		{
		 min=num[i];
		 pos=i+1;
		}
		
		if(num[i]<min)
		{
		 min=num[i];
		 pos=i+1;
		}
		i++;
	}
	while(i<20);
	
	printf("position = %d\n",pos);
	
	printf("Min Value = %d\n",min);
	
    system("pause");
    return 0;
}
