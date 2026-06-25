#include <stdio.h>
#include <string.h>
#define SIZE 3
typedef struct {
    char name[16];
    char surname[20];
    float height;
    float weight;
    float bmi;
    char answer[14];
} student;
void showData(student showstu[]);
int main() {
    int n;
    student std[SIZE];
for (n=0; n<SIZE; n++){
    printf("Enter student data\n");
    printf("\tName : ");
    scanf("%s", std[n].name);
    printf("\tSurname : ");
    scanf("%s", std[n].surname);
    printf("\tHeight (m) : ");
    scanf("%f", &std[n].height);
    printf("\tWeight (Kg) : ");
    scanf("%f", &std[n].weight);
    std[n].bmi = std[n].weight / (std[n].height * std[n].height);

    if (std[n].bmi >= 20 && std[n].bmi <= 25){
        strcpy(std[n].answer, "Normal BMI");
    }else{
        strcpy(std[n].answer, "Dangerous BMI");
}
}
    printf("\n\nShow Data\n");
    printf("------------------------------------------------------------------------\n");
    printf("Name \t Surname \t Weight \t Height \t BMI \t Answer \n");
    printf("------------------------------------------------------------------------\n");
    
    showData (std);
    system("pause");
    return 0; 
}
void showData(student showstu[]){
	int i;
	for(i=0; i<SIZE; i++){
		printf("%s\t%+5s\t%14.2f kg.\t %.2f m.", showstu[i].name, showstu[i].surname, showstu[i].weight, showstu[i].height);
    printf("\t%.2f\t%s\n", showstu[i].bmi, showstu[i].answer);
	}
}
