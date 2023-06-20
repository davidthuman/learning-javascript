

const DoublyLinkedList = {
    
    "head": undefined,
    "tail": undefined,

    addHead(node) {
        if (typeof this.head === "undefined") {
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
    },
    addTail(node) {
        if (typeof this.tail === "undefined") {
            this.tail = node;
            this.head = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
    },
    delete(node) {
        let curr = this.head;
        while (typeof curr !== "undefined") {
            if (curr === node) {
                let prev = node.prev;
                prev.next = node.next;
                node.next.prev = prev;

                curr = undefined;
            } else {
                curr = curr.next;
            }
        }
    },
    reverse() {

    },
    printList() {
        console.log("undefined")
        let curr = this.head;
        while (typeof curr !== "undefined") {
            console.log("| |");
            console.log("Node:", curr.value);
            curr = curr.next;
        }
        console.log("| |");
        console.log("undefined")
    }

}

const DoublyLinkedNode = {

    "next": undefined,
    "prev": undefined,
    "value": undefined,

}



const doublyLinkedList = Object.create(DoublyLinkedList);

const node1 = Object.create(DoublyLinkedNode);
const node2 = Object.create(DoublyLinkedNode);
const node3 = Object.create(DoublyLinkedNode);
const node4 = Object.create(DoublyLinkedNode);
node1.value = 15;
node2.value = 5;
node3.value = 10;
node4.value = 20;

doublyLinkedList.addTail(node1);
doublyLinkedList.addTail(node2);
doublyLinkedList.addTail(node3);
doublyLinkedList.delete(node2);
doublyLinkedList.addTail(node4);

doublyLinkedList.printList();

