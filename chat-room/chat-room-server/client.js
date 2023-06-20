const WebSocket = require("ws");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Welcome to the client-side chat room!");
console.log(" >> Joining chat room")

const ws = new WebSocket.WebSocket("ws://localhost:8080");

ws.on("message", data => {
    console.log(" >> ", data.toString());
});

rl.question("What will your username be? > ", function (answer) {
    ws.send(`username:${answer}`);
    console.log("You are now in the main room, send a message");
});

rl.on('line', (input) => {
    ws.send(`message:${input}`);
  });


