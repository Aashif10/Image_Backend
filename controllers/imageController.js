const cloudinary = require("../config/cloudinary");
const db = require("../config/db");
const fs = require("fs");

exports.uploadImage = async (req, res) => {
  const file = req.file;
  const category = req.body.category;

  if (!file || !category)
    return res.status(400).send("Image and category required");

  try {
    const result = await cloudinary.uploader.upload(file.path);
    fs.unlinkSync(file.path); // Remove local file

    const sql = "INSERT INTO images (url, category) VALUES (?, ?)";
    db.query(sql, [result.secure_url, category], (err, data) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ url: result.secure_url, category });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getImagesByCategory = (req, res) => {
  const category = req.params.category;
  const sql = "SELECT * FROM images WHERE category = ?";
  db.query(sql, [category], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
};
