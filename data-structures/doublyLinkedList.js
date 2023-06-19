

const DoublyLinkedList = {
    
    "head": undefined,
    "tail": undefined,


    init() {
        this.head = Object.create(SentinelNode);
        this.head.type = "head";
        this.tail = Object.create(SentinelNode);
        this.tail.type = "tail";
    },
    addHead(node) {
        if (typeof this.head === "undefined") {
            this.head = node;
        }
    },
    addTail(node) {

    },
    delete(node) {

    },
    reverse() {

    },

}

const Node = {

    "next": undefined,
    "prev": undefined,
    "value": undefined,

}

const SentinelNode = {
    
    "type": undefined
}