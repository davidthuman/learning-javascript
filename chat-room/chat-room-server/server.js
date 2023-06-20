
const WebSocket = require("ws");

const wss = new WebSocket.Server({ "port": 8080});

// List of all rooms
const rooms = [];
const clients = [];

const init_names = ["main","red","blue","green"];

// Room object
const Room = {
    "name": undefined,
    "clients": undefined,
    "messages": undefined,

    init(name) {
        this.name = name;
        this.clients = [];
        this.messages = [];
    },
    addClient(client) {
        this.clients.push(client);
    },
    addMessage(message) {
        this.messages.push(message);
    },
}

// Client object
const Client = {
    "ws": undefined,
    "username": undefined,
    "room": undefined,

    init(ws, username) {
        this.ws = ws;
        this.username = username;
    },
    moveRoom(room) {
        this.room = room;
    },
}

// Initialize rooms
for (let i = 0; i < init_names.length; i++) {
    let room = Object.create(Room)
    room.init(init_names[i]);
    rooms.push(room);
}

wss.on("connection", ws => onConnect(ws));


function onConnect(ws) {

    console.log("New client connected");

    ws.on("message", data => onMessage(ws, data));
    ws.on("close", () => onClose());
}

function onMessage(ws, data) {
    const parse = data.toString().split(":");
    const mType = parse[0];
    const mData= parse[1];

    let client;
    let room;

    switch (mType) {
        case "username":
            client = Object.create(Client);
            client.init(ws, mData);
            clients.push(client);

            let main = rooms.find(room => room.name === "main");
            client.moveRoom(main);
            main.addClient(client);

            ws.send(`server: Hello ${mData}`);
            break;

        case "join":

        case "message":
            client = clients.find(client => client.ws === ws);
            room = client.room;
            console.log(` > Message received from ${client.username} in room ${room.name}`)
            for (let i = 0; i < room.clients.length; i++) {
                let receiver = room.clients[i];
                if (receiver.ws !== ws) {
                    console.log(`Sending message to ${receiver.username}`);
                    receiver.ws.send(`${client.username}: ${mData}`);                
                }
            }
            break;

        case "leave":

    }

}

function onClose() {
    console.log("Client has disconnected");
}