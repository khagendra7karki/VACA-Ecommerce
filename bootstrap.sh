#!/bin/bash

# Define server and client ports
server_port=5000
client_port=3000


# Function to handle script termination
cleanup() {
  # Find the PIDs of the processes running on the server and client ports and kill them
  kill $(lsof -t -i:$server_port) || true
  kill $(lsof -t -i:$client_port) || true
  
  echo "Stopping servers..."
}

# Set the trap
trap cleanup EXIT

# Define the paths to your Express server and React client
EXPRESS_SERVER_PATH="server"
REACT_CLIENT_PATH="client"

# Start the Express server in the background
cd "$EXPRESS_SERVER_PATH"
npm start &

# Start the React client in the background
cd "../$REACT_CLIENT_PATH"
npm start &

# Provide a message to indicate that both servers are running
echo "Express server and React client are now running."

# Wait for user input to stop both servers
read -p "Press Enter to stop the servers..."


