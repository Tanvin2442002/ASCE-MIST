const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const announcement = require('./Routes/announcement');
const blogs = require('./Routes/blog');
const siteVisits = require('./Routes/sitevisit');
const seminar = require('./Routes/seminar');
const webinars = require('./Routes/webinars');
const events = require('./Routes/events');
const upcomingEvents = require('./Routes/upcoming-events');
const committee = require('./Routes/committee');
const achievements = require('./Routes/achievements');

const app = express();
app.use(cors({
  origin: ["https://asce-mist.vercel.app","https://asce-ce.mist.ac.bd"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use('/api', announcement);
app.use('/api', blogs);
app.use('/api', siteVisits);
app.use('/api', seminar);
app.use('/api', webinars);
app.use('/api', events);
app.use('/api', upcomingEvents);
app.use('/api', committee);
app.use('/api', achievements);


// app.get("/", async (req, res) => {
//   (debug logs removed)
// });
app.listen(process.env.PORT || 3000);