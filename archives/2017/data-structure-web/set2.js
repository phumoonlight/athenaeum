module.exports = function Set() {
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

    this.clear = function(){
        items = {};
    };

    this.size = function(){
        return Object.keys(items).length;
    };

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

    this.getItems = function(){
      return items;
    };

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
            if (otherSet.has(values[i])){    //{3}
                intersectionSet.add(values[i]); //{4}
            }
        }

        return intersectionSet;
    };

    this.difference = function(otherSet){
        let differenceSet = new Set(); //{1}

        let values = this.values();
        for (let i=0; i<values.length; i++){ //{2}
            if (!otherSet.has(values[i])){    //{3}
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
                if (!otherSet.has(values[i])){    //{3}
                    return false; //{4}
                }
            }
            return true;
        }
    };
}