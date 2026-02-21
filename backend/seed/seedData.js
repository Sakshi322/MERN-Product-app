require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Product = require("../models/Product");

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  await User.deleteMany();
  await Product.deleteMany();

  const password = await bcrypt.hash("123456", 10);

  const users = await User.insertMany([
    { name: "Demo User", email: "user1@test.com", password },
    { name: "Admin", email: "admin@test.com", password },
  ]);

  const products = [];

  for (let i = 1; i <= 10; i++) {
    products.push({
      title: `Product ${i}`,
      price: 100 + i * 10,
      description: `This is product ${i}`,
      image: "https://via.placeholder.com/300",
    });
  }

  await Product.insertMany(products);

  console.log("✅ Seed Data Inserted");
  process.exit();
};

seed();