function Queue() {
   var x = new DoublyLinkedList();
   this.enQueue = function (val) {
       return x.append(val);
   };
   this.print = function () {
       return x.toString();
   };
   this.font = function () {
       console.log(x.FirstNode());
   };
   this.deQueue = function () {
       return x.removeFirst();
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

   this.removeFirst = function () {
       let current = head;
       head = current.next;
       if (length === 1) {
           tail = null;
       } else {
           head.prev = null;
       }
       length--;
   }

   this.append = function (element) {
       let node = new Node(element);
       let current;
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

   this.FirstNode = function () {
       return head.element;
   };

}