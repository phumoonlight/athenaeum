var num = [5,3,1,2,4];
var dll = new DoublyLinkedList();
dll.append(1);
dll.append(3);
dll.append(5);
dll.append(2);
dll.append(4);
dll.bubbleSort();
console.log(toString);
console.log(num);


function DoublyLinkedList() {
	let Node = function(element){
		this.prev = null; 
		this.element = element;
		this.next = null;
	}

	
	let length = 0;
	let head = null;
	let tail = null;

	this.bubbleSort = function () {

		for (var i = 0 ; i < length ; i++){
			for(var j = 0 ; j < length ; j++){
				if(current>current.next){
					x = current.next;
					current.next = current;
					current = x;
				}
			}	
		}
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
	}

	this.toString = function(){
		let current = head,

		s = current ? current.element : '';
		while(current && current.next){
			current = current.next;
			s = s + ', ' + current.element;
		}
		return s;
	}
}
