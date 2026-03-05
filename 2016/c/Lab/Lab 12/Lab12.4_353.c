#include<stdio.h>
#include<string.h>
int main(){
	struct address{
		int num;
		int moo;
		char road[20];
		char district[20];
		char province[20];
	};
	struct phone{
		char mobile[15];
		char fax[15];
	};
	struct university{
		char name[50];
		struct address add;
		struct phone tel;
	}u1;
	
	strcpy(u1.name,"Computer Science MJU");
	u1.add.num=63;
	u1.add.moo=4;
	strcpy(u1.add.road,"ChianMai-Maejo Rd.");
	strcpy(u1.add.district,"Nonghan");
	strcpy(u1.add.province,"ChiangMai");
	strcpy(u1.tel.mobile,"081xxxxxxx");
	strcpy(u1.tel.fax,"053xxxxxxx");
	printf("Institution = %s\n",u1.name);
	printf("Address = %d Moo %d, %s\n",u1.add.num,u1.add.moo,u1.add.road);
	printf("\t  , %s, %s\n",u1.add.district,u1.add.province);
	printf("Mobile = %s\n",u1.tel.mobile);
	printf("Fax = %s \n",u1.tel.fax);
	
	system("pause");
	return 0;
}
