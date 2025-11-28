const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const connectDB = require("../config/db");

dotenv.config();
connectDB();

const products = [
  {
    name: "Classic White T-Shirt",
    description: "Soft cotton T-shirt for everyday wear",
    price: 499,
    imageUrl: "client/public/1.jpg",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Black Slim Fit Jeans",
    description: "Comfortable stretch denim with slim fit",
    price: 1499,
    imageUrl: "client/public/2.png",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Blue Checkered Shirt",
    description: "Casual blue checks shirt for office and outings",
    price: 999,
    imageUrl: "client/public/3.png",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Grey Hoodie",
    description: "Warm fleece hoodie with front pocket",
    price: 1299,
    imageUrl: "client/public/4.png",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    name: "Navy Chinos",
    description: "Slim-fit chinos perfect for semi-formal look",
    price: 1399,
    imageUrl: "client/public/5.png",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },

  {
    name: "Floral Summer Dress",
    description: "Lightweight floral printed dress for summer",
    price: 1299,
    imageUrl: "client/public/6.png",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Black Leggings",
    description: "High-waist stretch leggings for daily comfort",
    price: 699,
    imageUrl: "client/public/8.png",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket",
    price: 1799,
    imageUrl: "client/public/9.png",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Red Ankle-Length Skirt",
    description: "Flowy skirt for casual and festive occasions",
    price: 1199,
    imageUrl: "client/public/10.png",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "White Kurti",
    description: "Cotton straight-fit kurti with minimal design",
    price: 899,
    imageUrl: "client/public/11.png",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
  },

  {
    name: "Kids Cartoon T-Shirt",
    description: "Soft T-shirt with fun cartoon print",
    price: 399,
    imageUrl: "client/public/11.png",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids Blue Jeans",
    description: "Durable denim jeans for kids",
    price: 799,
    imageUrl: "client/public/12.png",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids Hoodie",
    description: "Warm hoodie with soft inner lining",
    price: 899,
    imageUrl: "client/public/13.png",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids Shorts Set",
    description: "2-piece cotton shorts set for summer",
    price: 699,
    imageUrl: "client/public/14.png",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids Party Dress",
    description: "Bright colored dress for special occasions",
    price: 1299,
    imageUrl: "client/public/15.png",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },

  {
    name: "Unisex Black Hoodie",
    description: "Minimal design black hoodie for all genders",
    price: 1399,
    imageUrl: "client/public/16.png",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Sports Joggers",
    description: "Comfortable joggers for running and gym",
    price: 1099,
    imageUrl: "client/public/17.png",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women’s Formal Shirt",
    description: "Solid color formal shirt for office wear",
    price: 999,
    imageUrl: "client/public/18.png",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Kids Track Suit",
    description: "Full sleeves track suit for sports and play",
    price: 1499,
    imageUrl: "client/public/19.png",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
];

const seed = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding products:", err.message);
    process.exit(1);
  }
};

seed();
