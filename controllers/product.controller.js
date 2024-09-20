const Product = require("../models/product")
const Cart = require('../models/cart')
exports.getProduct =  async (req, res) => {
    try {
      const products = await Product.find(); // Lấy tất cả sản phẩm từ database
      res.json(products);
    } catch (error) {
      res.status(500).json({ msg: 'Lỗi khi lấy danh sách sản phẩm' });
    }
  };




  exports.addProduct =  async (req, res) => {
    const { name, image_url, price, description, category } = req.body;
  
    try {
      const product = new Product({
        name,
        image_url,
        price,
        description,
        category,
      });
  
      await product.save();
      res.status(201).json({ msg: 'Sản phẩm đã được thêm thành công' });
    } catch (error) {
      res.status(500).json({ msg: 'Lỗi khi thêm sản phẩm' });
    }
  };


  exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId;
  
    try {
      let cart = await Cart.findOne({ user: userId });
  
      if (cart) {
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ product: productId, quantity });
        }
      } else {
        cart = new Cart({
          user: userId,
          items: [{ product: productId, quantity }],
        });
      }
  
      await cart.save();
      res.status(201).json({ msg: 'Sản phẩm đã được thêm vào giỏ hàng' });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ msg: 'Lỗi server' });
    }
  };