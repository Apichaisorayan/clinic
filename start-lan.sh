#!/bin/bash

echo "Starting Clinic Management System (Cloudflare Workers)..."
echo

# Get local IP address
LOCAL_IP=$(hostname -I | awk '{print $1}' 2>/dev/null || ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -1)

echo "Your IP Address: $LOCAL_IP"
echo

echo "Starting Cloudflare Workers API..."
cd api-cloudflare && npm run dev &
API_PID=$!

sleep 3

echo "Starting Frontend..."
cd ../client && npm run dev -- --host 0.0.0.0 &
FRONTEND_PID=$!

echo
echo "========================================"
echo "  Clinic Management System - LAN Mode"
echo "========================================"
echo
echo "API Server: http://$LOCAL_IP:8787"
echo "Frontend:   http://$LOCAL_IP:5174"
echo
echo "Share these URLs with other computers on your network!"
echo
echo "Press Ctrl+C to stop all servers..."

# Wait for user to stop
trap "kill $API_PID $FRONTEND_PID; exit" INT
wait