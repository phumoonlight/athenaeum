doubly linked list
var d = new LinkedList(); 
d.append('cat');
d.append('rat');
d.append('dog');
console.log(d.toString());
function DoublyLinkedList() {
let Node = function(x){
this.element = x;
this.next = null;
this.prev = null; //NEW
};
let length = 0;
let head = null;
let tail = null; //NEW
this.append = function(y){
let node = new Node(y),
current;
if (head === null){ //first node on list
head = node;
tail = node; //NEW
} else {
//attach to the tail node //NEW
tail.next = node;
node.prev = tail;
tail = node;
}
length++; //update size of list
};
this.isEmpty = function() {
return length === 0;
};
this. size = function() {
return length;
};
this.toString = function(){
let current = head,
s = current ? current.element : '';
while(current && current.next){
current = current.next;
s += ', ' + current.element;
}
return s;
};
this.print = function(){
console.log(this.toString());
};
this.getHead = function(){
return head;
};
this.getTail = function(){
return tail;
}
}