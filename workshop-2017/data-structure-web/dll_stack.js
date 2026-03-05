function Stack() {
	var x = new DoublyLinkedList();
	this.push = function (val) {
		x.append(val);
	};
	this.print = function () {
		console.log(x.toString());
		return x.toString();
	};
	this.peek = function () {
		console.log(x.lastNode());
		return x.lastNode();
	};
	this.pop = function () {
		x.removeLast();
	}
}
function DoublyLinkedList() {
	let Node = function (element) {
		this.prev = null;
		this.element = element;
		this.next = null;
	};
	let length = 0;
	let head = null;
	let tail = null;
	this.removeLast = function () {
		let current = tail;
		if (current != null) {
			tail = current.prev;
			tail.next = null;
		}
		length--;
	}
	this.append = function (element) {
		let node = new Node(element),
		current;
		if (head === null) {
			head = node;
			tail = node;
		} else {
			tail.next = node;
			node.prev = tail;
			tail = node;
		}
		length++;
	};
	this.toString = function () {
		let current = head,
		s = current ? current.element : '';
		while (current && current.next) {
			current = current.next;
			s += ', ' + current.element;
		}
		return s;
	};
	this.lastNode = function(){
		return tail.element;
	}
}