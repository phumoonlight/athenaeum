var t = new BST(); 
t.insert(11);
t.insert(7); t.insert(15); t.insert(5); t.insert(3); t.insert(9); 


console.log(t.max()); 

function BST() {
	var Node = function(x){
		this.left = null;
		this.key = x;
		this.right = null;
	};
	var root = null;

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