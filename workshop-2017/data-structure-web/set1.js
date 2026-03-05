set s = new Set();
s.add('cat');
s.add('rat');
s.add('dog');
console.log(s.values());
console.log(s.has('rat')); 
console.log(s.size()); 
s.delete('rat');
console.log(s.values());
console.log(s.getItems());
//--------- ----------
let a = new Set();
a.add('cat');
a.add('rat');
a.add('dog');
let b = new Set();
b.add('banana');
b.add('orange');
b.add('lemon');
b.add('cat');
let w = a.union(b);
console.log(w.values());
let x = a.intersection(b); 
console.log(x.values());
let y = a.difference(b);
console.log(y.values());
console.log(a.subset(b));
//--------------------------------
function Set() {
let items = {};
this.add = function(value){
if (!this.has(value)){
items[value] = value;
return true;
}
return false;
};
this.delete = function(value){
if (this.has(value)){
delete items[value];
return true;
}
return false;
};
this.has = function(value){
return items.hasOwnProperty(value);
//return value in items;
};
this.clear = function(){ items = {}; };
this.size = function(){ return Object.keys(items).length; };
this.sizeLegacy = function(){
let count = 0;
for(let key in items) {
if(items.hasOwnProperty(key))
++count;
}
return count;
};
this.values = function(){
let values = [];
for (let i=0, keys=Object.keys(items); i<keys.length; i++) {
values.push(items[keys[i]]);
}
return values;
};
this.valuesLegacy = function(){
let values = [];
for(let key in items) {
if(items.hasOwnProperty(key)) {
values.push(items[key]);
}
}
return values;
};
this.getItems = function(){ return items; };
this.union = function(otherSet){
let unionSet = new Set(); //{1}
let values = this.values(); //{2}
for (let i=0; i<values.length; i++){
unionSet.add(values[i]);
}
values = otherSet.values(); //{3}
for (let i=0; i<values.length; i++){
unionSet.add(values[i]);
}
return unionSet;
};
this.intersection = function(otherSet){
let intersectionSet = new Set(); //{1}
let values = this.values();
for (let i=0; i<values.length; i++){ //{2}
if (otherSet.has(values[i])){ //{3}
intersectionSet.add(values[i]); //{4}
}
}
return intersectionSet;
};
this.difference = function(otherSet){
let differenceSet = new Set(); //{1}
let values = this.values();
for (let i=0; i<values.length; i++){ //{2}
if (!otherSet.has(values[i])){ //{3}
differenceSet.add(values[i]); //{4}
}
}
return differenceSet;
};
this.subset = function(otherSet){
if (this.size() > otherSet.size()){ //{1}
return false;
} else {
let values = this.values();
for (let i=0; i<values.length; i++){ //{2}
if (!otherSet.has(values[i])){ //{3}
return false; //{4}
}
}
return true;
}
};
}