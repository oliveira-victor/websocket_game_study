const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Store players with their positions, keyed by their WebSocket connection
let players = {};

wss.on('connection', (ws) => {
    // Assign a random ID to the new player
    const playerId = Math.random().toString(36).substring(2, 9);

    // Initialize the player's position
    players[playerId] = { x: 250, y: 250, color: getRandomColor() };

    // Notify all players about the new player
    broadcastPlayers();

    ws.on('message', (message) => {
        const updatedPlayer = JSON.parse(message);

        // Update the player’s position
        players[playerId] = updatedPlayer;

        // Broadcast the updated positions to all connected clients
        broadcastPlayers();
    });

    ws.on('close', () => {
        console.log(`Player ${playerId} disconnected`);
        delete players[playerId];  // Remove the player from the list
        broadcastPlayers();  // Update remaining players
    });
});

// Function to broadcast all players' data to all clients
function broadcastPlayers() {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(players));
        }
    });
}

// Generate a random color for each player
function getRandomColor() {
    const colors = ['blue', 'red', 'green', 'orange', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)];
}
