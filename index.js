const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// API Key Middleware
app.use((req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (apiKey !== "test-api-key") {
    return res.status(401).json({
      success: false,
      message: "Invalid API Key",
    });
  }

  next();
});

// Dummy Events Data
const events = [
  {
    id: "evt_001",
    title: "India vs Australia ODI",
    category: "Sports",
    location: "Mumbai Stadium",
    startTime: "2026-06-19T14:00:00Z",
    viewers: 45231,
    status: "LIVE",
    thumbnail:
      "https://example.com/images/india-australia.jpg",
  },
  {
    id: "evt_002",
    title: "Tech Conference 2026",
    category: "Technology",
    location: "Bangalore Convention Center",
    startTime: "2026-06-19T10:00:00Z",
    viewers: 12045,
    status: "LIVE",
    thumbnail:
      "https://example.com/images/tech-conf.jpg",
  },
  {
    id: "evt_003",
    title: "Music Festival Live",
    category: "Entertainment",
    location: "Delhi Arena",
    startTime: "2026-06-19T18:00:00Z",
    viewers: 87450,
    status: "LIVE",
    thumbnail:
      "https://example.com/images/music-fest.jpg",
  },
];

// GET /events - List live events
app.get("/events", (req, res) => {
  res.json({
    success: true,
    count: events.length,
    events,
  });
});

// GET /events/:id - Event details
app.get("/events/:id", (req, res) => {
  const event = events.find((e) => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  const detailedEvent = {
    ...event,
    description:
      "This is a detailed description of the live event with additional metadata and insights.",
    organizer: {
      id: "org_1001",
      name: "Global Events Ltd",
      contactEmail: "contact@globalevents.com",
    },
    speakers: [
      {
        name: "John Doe",
        role: "Host",
      },
      {
        name: "Jane Smith",
        role: "Guest Speaker",
      },
    ],
    tags: ["live", "featured", "trending"],
    ticketPrice: 499,
    currency: "INR",
    streamUrl: "https://stream.example.com/live",
    chatEnabled: true,
    totalLikes: 15320,
    totalComments: 4872,
    createdAt: "2026-06-01T09:00:00Z",
    updatedAt: "2026-06-19T12:00:00Z",
  };

  res.json({
    success: true,
    event: detailedEvent,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
