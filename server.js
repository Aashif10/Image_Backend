const express = require("express");
const app = express();
require("dotenv").config();

const imageRoutes = require("./routes/imageRoutes");

app.use(express.json());
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
