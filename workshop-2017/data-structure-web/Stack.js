function Stack(){
	let g = [];
	this.push = function(animal){
		g.push(animal);
	}
	this.pop = function(){
		g.pop();

	}
	this.peek = function(){
		return g[g.length-1];
	}
	this.isEmpty = function(){
		return g.length == 0;
	}
	this.size = function(){
		return g.length;
	}
	this.clear = function(){
		g = [];
	}
	this.toString = function(){
		return g.toString();
	}
}