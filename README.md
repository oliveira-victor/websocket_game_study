# WebSocket Game Study

This is a repo for studying websocket. It's a simple multiplayer online game, with no goals or rules at all. You just enter and move your block around.

Game URL: https://websocketgame.onrender.com

## Local enviroment

1. Run the WebSocket server:
   ```bash
   node server.js

Additional Check:
Ensure WebSocket Server is Running: Make sure that the WebSocket server (server.js) is running on port 8080, and that the client is correctly connecting to ws://localhost:8080.

Cross-Origin Issues: If you're opening index.html directly as a local file (i.e., file:// URL), it might prevent WebSockets from working due to cross-origin restrictions. To avoid this, use a local server like this:

   ```bash
   npx http-server .
