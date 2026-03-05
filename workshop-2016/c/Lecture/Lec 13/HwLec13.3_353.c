#include<stdio.h>

struct point{
	int x;
	int y;
};

typedef struct point POINT;

POINT start;
POINT end;
POINT *st=&start;
POINT *en=&end;

void readStartPoint(POINT *s);
void readEndPoint(POINT *e);
void printPoint(POINT *s,POINT *e);

void main(){
	printf("Point Rectangle Data\n");
	readStartPoint(st);
	readEndPoint(en);
	printPoint(st,en);
	system("pause");
}

void readStartPoint(POINT *s){
	int x,y;
	printf("\tStart point X: ");
	scanf("%d",&x);
	printf("\tStart point Y: ");
	scanf("%d",&y);
	s->x=x;
	s->y=y;
}

void readEndPoint(POINT *e){
	int x,y;
	printf("\tEnd point X: ");
	scanf("%d",&x);
	printf("\tEnd point Y: ");
	scanf("%d",&y);
	e->x=x;
	e->y=y;
}

void printPoint(POINT *s,POINT *e){
	int area=(e->x-s->x)*(e->y-s->y);
	printf("Area: %d\n",area);
}


