const WebSocket = require('ws');
const wss = new WebSocket.Server('https://websocket-game-study.onrender.com');

let players = {};

wss.on('connection', (ws) => {
    const playerId = Math.random().toString(36).substring(2, 9);
    players[playerId] = { x: 250, y: 250, color: getRandomColor() };

    broadcastPlayers();

    ws.on('message', (message) => {
        const updatedPlayer = JSON.parse(message);
        players[playerId] = updatedPlayer;
        broadcastPlayers();
    });

    ws.on('close', () => {
        delete players[playerId];
        broadcastPlayers();
    });
});

function broadcastPlayers() {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(players));
        }
    });
}

function getRandomColor() {
    const colors = ['blue', 'red', 'green', 'orange', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)];
}
