const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint (required by Task 6)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'gateway', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Gateway Service is running',
    version: 'v1',
    endpoints: ['/health', '/api/status']
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'gateway',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Catch-all route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Gateway service listening on port ${PORT}`);
});
