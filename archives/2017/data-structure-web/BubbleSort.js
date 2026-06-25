function BubbleSort() {
	var x = new DoublyLinkedList();
	x.append(5);
	x.append(4);
	x.append(3);
	x.append(6);
	x.append(7);
	x.append(8);
	x.append(2);
	x.append(9);
	x.append(1);
	x.append(0);

	this.addMe = function(element) {
		x.append(element);
	};

	this.showMe = function () {
		return x.toString();
	}
	this.sortNow = function () {
		return x.bubbleSort();
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
	this.bubbleSort = function () {
		var current = head;
		var t;
		for (var i = 1; i < length; i++) {
			for (var j = 1; j < length; j++) {
				if (current.element > current.next.element) {
					t = current.element;
					current.element = current.next.element;
					current.next.element = t;
				}
				current = current.next;
			}
			current = head;
		}
		return this.toString();
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
	}
	this.toString = function () {
		let current = head,
		s = current ? current.element : '';
		while (current && current.next) {
			current = current.next;
			s += ', ' + current.element;
		}
		return s;
	}

}


