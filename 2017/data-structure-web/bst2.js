var t = new BST(); 
t.insert(11);
t.insert(7); t.insert(15); t.insert(5); t.insert(3); t.insert(9); 
t.insert(8); t.insert(10); t.insert(13); t.insert(12); t.insert(14); 
t.insert(20); t.insert(18); t.insert(25); t.insert(6);
console.log(t.search(50)?'Key found.':'Key not found.');

function BST() {
	var Node = function(x){
		this.left = null;
		this.key = x;
		this.right = null;
	};
	var root = null;

	this.search = function(x){
		let i = root;
		return searchNode(i,x);
	};

	var searchNode = function(i,x) {
		if (i===null) {
			return false;
		}
		
		if(x<i.key) {
			return searchNode(i.left,x);
		} 
		else if(x>i.key) {
			return searchNode(i.right,x);
		} else { //element is equal to node.item
			return true;
		}
	};

	this.insert = function(key){
		var newNode = new Node(key);
		if (root===null) {
		 	root=newNode;
		} 
		else {
			insertNode(root,newNode);
		}
	};

	var insertNode = function(node,newNode) {
		if (newNode.key < node.key) {
			if (node.left === null) {
				node.left = newNode;
			} 
			else {
				insertNode(node.left,newNode);
			}
		} 
		else {
			if (node.right === null) {
				node.right = newNode;
			} 
			else {
				insertNode(node.right,newNode);
			}
		}
	};

    this.max = function() { 
		if(root){ 
			let i = root;
			while(i && i.right!==null) { 
				i = i.right; 
			} 
			return i.key; 
		} 
		return null;
	};

	this.min = function(){
		if(root){
			let i = root;
			while (i && i.left !== null) {
				i = i.left;
			}
			return i.key;
		}
		return null;
	}

}