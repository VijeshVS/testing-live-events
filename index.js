const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

/**
 * Enums
 */
const EventCategory = Object.freeze({
  SPORTS: "SPORTS",
  TECHNOLOGY: "TECHNOLOGY",
  ENTERTAINMENT: "ENTERTAINMENT",
  MUSIC: "MUSIC",
  BUSINESS: "BUSINESS",
  EDUCATION: "EDUCATION",
  GAMING: "GAMING",
  HEALTH: "HEALTH",
  POLITICS: "POLITICS",
  FINANCE: "FINANCE",
});

const EventStatus = Object.freeze({
  LIVE: "LIVE",
  UPCOMING: "UPCOMING",
  ENDED: "ENDED",
  CANCELLED: "CANCELLED",
});

const Currency = Object.freeze({
  INR: "INR",
  USD: "USD",
});

/**
 * API Key Middleware
 */
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

/**
 * Events Data
 */
const events = [
  {
    id: "evt_001",
    title: "India vs Australia ODI",
    category: EventCategory.SPORTS,
    location: "Mumbai Stadium",
    startTime: "2026-06-19T14:00:00Z",
    viewers: 45231,
    status: EventStatus.LIVE,
    thumbnail:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80",
  },
  {
    id: "evt_002",
    title: "Tech Conference 2026",
    category: EventCategory.TECHNOLOGY,
    location: "Bangalore Convention Center",
    startTime: "2026-06-19T10:00:00Z",
    viewers: 12045,
    status: EventStatus.LIVE,
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  },
  {
    id: "evt_003",
    title: "Music Festival Live",
    category: EventCategory.MUSIC,
    location: "Delhi Arena",
    startTime: "2026-06-19T18:00:00Z",
    viewers: 87450,
    status: EventStatus.LIVE,
    thumbnail:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80",
  },
  {
    id: "evt_004",
    title: "Startup Funding Summit",
    category: EventCategory.BUSINESS,
    location: "Hyderabad Expo Center",
    startTime: "2026-07-05T09:00:00Z",
    viewers: 0,
    status: EventStatus.UPCOMING,
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  },
  {
    id: "evt_005",
    title: "AI in Education Forum",
    category: EventCategory.EDUCATION,
    location: "Pune University",
    startTime: "2026-07-10T11:00:00Z",
    viewers: 0,
    status: EventStatus.UPCOMING,
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
  },
  {
    id: "evt_006",
    title: "eSports Championship Finals",
    category: EventCategory.GAMING,
    location: "Chennai Gaming Arena",
    startTime: "2026-06-18T16:00:00Z",
    viewers: 35678,
    status: EventStatus.ENDED,
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
  },
  {
    id: "evt_007",
    title: "Global Health & Wellness Expo",
    category: EventCategory.HEALTH,
    location: "Kolkata Convention Hall",
    startTime: "2026-06-21T08:00:00Z",
    viewers: 0,
    status: EventStatus.UPCOMING,
    thumbnail:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
  },
  {
    id: "evt_008",
    title: "Bollywood Awards Night",
    category: EventCategory.ENTERTAINMENT,
    location: "Mumbai Film City",
    startTime: "2026-06-20T19:00:00Z",
    viewers: 98231,
    status: EventStatus.LIVE,
    thumbnail:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
  },
  {
    id: "evt_009",
    title: "National Policy Discussion",
    category: EventCategory.POLITICS,
    location: "New Delhi Conference Hall",
    startTime: "2026-06-15T10:00:00Z",
    viewers: 15000,
    status: EventStatus.ENDED,
    thumbnail:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80",
  },
  {
    id: "evt_010",
    title: "Stock Market Investors Meet",
    category: EventCategory.FINANCE,
    location: "Ahmedabad Trade Center",
    startTime: "2026-06-25T09:30:00Z",
    viewers: 0,
    status: EventStatus.CANCELLED,
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
  },
];

/**
 * GET /events
 * Optional filters:
 * /events?status=LIVE
 * /events?category=SPORTS
 * /events?status=LIVE&category=SPORTS
 */
app.get("/events", (req, res) => {
  const { status, category } = req.query;

  let filteredEvents = [...events];

  if (status) {
    filteredEvents = filteredEvents.filter(
      (event) => event.status === status
    );
  }

  if (category) {
    filteredEvents = filteredEvents.filter(
      (event) => event.category === category
    );
  }

  res.json({
    success: true,
    count: filteredEvents.length,
    events: filteredEvents,
  });
});

/**
 * GET /events/:id
 */
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
      "This is a detailed description of the event with metadata and insights.",
    organizer: {
      id: "org_1001",
      name: "Global Events Ltd",
      contactEmail: "contact@globalevents.com",
    },
    speakers: [
      {
        id: "spk_001",
        name: "John Doe",
        role: "HOST",
      },
      {
        id: "spk_002",
        name: "Jane Smith",
        role: "KEYNOTE_SPEAKER",
      },
    ],
    tags: ["featured", "trending"],
    ticketPrice: 499,
    currency: Currency.INR,
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

/**
 * Health Check
 */
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}`);
  console.log(`🔑 API Key: test-api-key`);
});
