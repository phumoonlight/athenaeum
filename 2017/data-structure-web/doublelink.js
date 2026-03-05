
var dll = new DoublyLinkedList(); 
dll.append('cat');
dll.append('rat');
dll.append('dog');
console.log(dll.toString());
console.log(dll.toStringReverse());

function DoublyLinkedList() {
	let Node = function(element){
		this.prev = null; 
		this.element = element;
		this.next = null;
	}
	let length = 0;
	let head = null;
	let tail = null;

	this.toStringReverse = function(){
		let current = tail,
		s = current ? current.element : '';
		while(current && current.prev){
			current = current.prev;
			s += ', ' + current.element;
		}
		return s;
	}

	this.append = function(element){
		let node = new Node(element),
		current;
		if (head === null){ 
			head = node;
			tail = node; 
		} else {
			tail.next = node;
			node.prev = tail;
			tail = node;
		}
		length++; 
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