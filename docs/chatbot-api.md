# Chatbot API Documentation

## Overview
This document describes the API endpoint structure for the Luminara Chatbot integration.

## API Endpoint

### POST /api/chatbot

Send a message to the chatbot and receive a response.

#### Request Headers
```
Content-Type: application/json
Authorization: Bearer <token> (optional)
```

#### Request Body
```json
{
  "message": "User's message text",
  "conversation_id": "unique_session_id",
  "user_id": "user_identifier",
  "timestamp": "2025-06-18T10:45:00.000Z"
}
```

#### Response Body
```json
{
  "response": "Chatbot's response text",
  "conversation_id": "same_session_id",
  "timestamp": "2025-06-18T10:45:01.000Z",
  "status": "success"
}
```

#### Error Response
```json
{
  "error": "Error message",
  "status": "error",
  "code": 400
}
```

## Environment Variables

Add the following to your `.env` file:

```env
REACT_APP_CHATBOT_API_URL=http://your-api-server.com/api/chatbot
```

## Current Implementation

Currently, the chatbot uses a simulation function when the API is not available. This provides intelligent responses based on Luminara features:

- **Direktori/Directory**: Information about finding places of worship
- **Itinerary**: Help with planning spiritual journeys
- **Guide**: Information about tour guides
- **Community**: Community features and joining groups
- **General Help**: General assistance with Luminara features

## Quick Actions

The chatbot includes predefined quick action buttons:
- 🕌 Cari Tempat Ibadah
- 📅 Buat Itinerary  
- 👨‍🏫 Cari Guide
- 👥 Bergabung Komunitas

## Features

- ✅ Real-time messaging interface
- ✅ Typing indicators
- ✅ Message timestamps
- ✅ Quick action buttons
- ✅ Auto-scroll to latest messages
- ✅ Responsive design
- ✅ Floating chatbot button on all pages
- ✅ Error handling and fallback responses
- ✅ Indonesian language support
