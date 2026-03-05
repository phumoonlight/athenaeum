var a = new BST();
a.insert(5);
a.insert(1);
a.insert(6);
a.insert(3);
a.insert(4);
a.insert(10);
function BST(){
	insert = function(){
		let node = new Node(element);
		if(tree == null){
			tree = element;
		}

		
		if (root === null){ 
			root = node; 
		} else {
			root.next = node;
			root.prev = tail;
			tail = node;
		}
		length++; 
	}

	node = function(element){
		this.left = null;
		this.element = element;
		this.right = null;
	}



}