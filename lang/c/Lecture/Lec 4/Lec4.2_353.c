#include<stdio.h>
int main()
{
 float gpan,gpao,gpsn;
 printf("Enter GPA (past) : ");
 scanf("%f",&gpao);
 if(gpao<1.00)
 {
 	
  printf("Your Status : Retired\n");
  printf("Sorry,Try again.\n"); 
  
 }else if(gpao>=1.00&&gpao<2.00)
 {
 	
  printf("Your Status : Probation\n");
  printf("Enter GPS (present) : ");
  scanf("%f",&gpsn);
  printf("Enter GPA (present) : ");
  scanf("%f",&gpan);
  if(gpan<1.00)
  {
  	
   printf("Your Status : Retired \n\n\n");
   
  }else if(gpan>=2.00)
  {
  	
   printf("Your Status : Normal\n");

  }else if(gpsn>=2.00)
  {
  	
   printf("Your Status : Probation\n");
   
  }else if(gpsn<2.00)
  {
  	
   printf("Your Status : Retired\n");
   printf("Sorry,Try again.\n");
   
  }
   
  }else if(gpao>=2.00&&gpao<=4.00)
 {
 	
  printf("Your Status : Normal\n");
  printf("Enter GPS (present) : ");
  scanf("%f",&gpsn);
  printf("Enter GPA (present) : ");
  scanf("%f",&gpan);
  if(gpan<1.00)
  {
   printf("Your Status : Retired \n\n\n");
   }else if(gpan>=2.00)
   {
   	
   printf("Your Status : Normal\n");
   
   }else if(gpsn>=2.00)
   {
   	
   printf("Your Status : Probation\n");
   
   }else if(gpsn<2.00)
   {
   	
   printf("Your Status : Retired\n");
   printf("Sorry,Try again.\n");
   
   }
   
  }else{
  printf("ERROR");
  }
  
 system("pause");
 return 0;
}
