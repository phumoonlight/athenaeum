var l = new LinkedList(); 
l.append('cat');
l.append('rat');
l.append('dog');
console.log(l.toString()); 

function LinkedList() {
    let Node = function(x){
        this.element = x;
        this.next = null;
    };
    let length = 0;
    let head = null;

    this.append = function(y){
        let n = new Node(y),
            current;

        if (head === null){ //first node on list
            head = n;
        } else {
            current = head;
            while(current.next){
                current = current.next; //loop the list until find last item
            }
            current.next = n;
        }
        length++; //update size of list
    };

    this.toString = function(){
        let current = head, 
            string = '';
        
        while (current) {
            string += current.element + (current.next ? ', ' : '');
            current = current.next;
        }
        return string;
    };

    this.removeAT = function(position){
        let current = head,count = 0,previous;

        if (position === 0){
            head = current.next;
            length --;
        }else if (position > 0){
            while (count < position){
                previous = current;
                current = current.next;
                count++;
            }//end while 
            previous.next = current.next != null ? current.next : null;
            length--;
            return head;
        } else {
            length = 0;
        }
    }

}