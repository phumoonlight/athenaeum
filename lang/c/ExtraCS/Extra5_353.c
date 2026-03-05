#include<stdio.h>
#include<conio.h>

int main(){
    int inventory,select;
    int time=0;
    int checkitem[4]={1,1,1,1};
    
    printf("Let's do a Katong in C lang \n");
    do{
    	if(time==0){
    		printf("First To Check Inventory and do Press A \n");
            printf("Action : ");
            inventory = getche();
            printf("\n");
		}else{
			printf("\n\nStep %d...\n",time+1);
			printf("To Check Inventory then continue Press A \n");
			printf("To See your Katong then continue Press B \n ");
            printf("Action : ");
            inventory = getche();
            printf("\n");
		}
		
		if(inventory=='B'||inventory=='b'){
			if(checkitem[0]==0&&checkitem[1]==0&&checkitem[2]==1){
	   
		printf("\n                                 l       \n");
		printf("\n                                 l       \n");
		printf("\n                                 l       \n");
		printf("\n                                 l       \n");
		printf("\n                                 l       \n");
		printf("\n                                 l       \n");
		printf("\n                            ###########  \n");
		printf("\n                            #         #  \n");
		printf("\n                            ###########  \n");
		
		printf("\n\nBack to continue your katong\n");
		inventory='A';
		
			}else if(checkitem[0]==1&&checkitem[1]==0&&checkitem[2]==0){
		printf("\n                                         \n");
		printf("\n                                l        \n");
		printf("\n                               lll       \n");
		printf("\n                               l l       \n");
		printf("\n                               l l       \n");
		printf("\n                               l l       \n");
		printf("\n                            ###########  \n");
		printf("\n                            #         #  \n");
		printf("\n                            ###########  \n");
		printf("\n\nBack to continue your katong\n");
			inventory='A';
			}else if(checkitem[0]==1&&checkitem[1]==0&&checkitem[2]==1){
		printf("\n                                         \n");
		printf("\n                                         \n");
		printf("\n                                         \n");
		printf("\n                                         \n");
		printf("\n                                         \n");
		printf("\n                                         \n");
		printf("\n                            ###########  \n");
		printf("\n                            #         #  \n");
		printf("\n                            ###########  \n");
		printf("\n\nBack to continue your katong\n");
			inventory='A';
			}else if(checkitem[0]==0&&checkitem[1]==0&&checkitem[2]==0){
		printf("\n                                    l     \n");
		printf("\n                                l   l     \n");
		printf("\n                               lll  l     \n");
		printf("\n                               l l  l     \n");
		printf("\n                               l l  l     \n");
		printf("\n                               l l  l     \n");
		printf("\n                            ###########   \n");
		printf("\n                            #         #   \n");
		printf("\n                            ###########   \n");
		
		printf("\n\nKatong has complete!?\n");
		printf("\n\nLoy Loy Katong!\n");
		
		select=-1;
			}else{
				printf("\nKatong not get in shape yet!\n");
			    printf("\n\nBack to continue your katong\n");
			inventory='A';
			}
		}
		
		if(inventory=='A'||inventory=='a'){
			if(checkitem[0]==1){
				printf("1.incense \n");
			}
    	    if(checkitem[1]==1){
    	    	printf("2.piece of banana tree \n");
			}
			if(checkitem[2]==1){
    	    	printf("3.candle \n");
			}
			if(checkitem[3]==1){
    	    	printf("4.1000 baht banknote \n");
			}
		}
		
	    if(select!=-1){
	        printf("Select one : ");
	        scanf("%d",&select);
	        printf("\n");
		}
	    
	    
	    if(select==1){
	    	printf("You put incense to your katong");
	    	checkitem[0]=0;
		}else if(select==2){
			printf("You put Piece of banana tree to do your katong base");
	    	checkitem[1]=0;
		}else if(select==3){
			printf("You put candle to your katong");
	    	checkitem[2]=0;
		}else if(select==4){
			printf("You put 1000 baht bank to your katong");
	    	checkitem[3]=0;
		}
	    
		
    time++;
	}while(time<4);
	
	if(select!=-1){
		printf("\n\nYour Katong has completed\n");
	    printf("Let's see your katong");
	if(checkitem[3]==0){
		printf("\n.\n.\n.\nOMG someone steal your katong because you add 1000 baht.\n");
	}else{
		printf("You did something wrong with input");
	}
	}
	
	system("pause");
	return 0;
}



