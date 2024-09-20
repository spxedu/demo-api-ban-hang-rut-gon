const Product = require("../models/product")
const Cart = require('../models/cart')
const Order = require('../models/order');  // Import Order model


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


  // Lấy danh sách sản phẩm trong giỏ hàng

  
exports.getCart = async (req, res) => {
  const userId = req.userId;

  try {
    // Tìm giỏ hàng của người dùng
    const cart = await Cart.findOne({ user: userId }).populate('items.product');  // Sử dụng populate để lấy thông tin chi tiết về sản phẩm

    if (!cart) {
      return res.status(404).json({ msg: 'Giỏ hàng trống' });
    }

    res.json(cart.items);  // Trả về danh sách sản phẩm trong giỏ hàng
  } catch (error) {
    res.status(500).json({ msg: 'Lỗi server' });
  }
};





// Gửi đơn hàng


  exports.checkout = async (req, res) => {
  const userId = req.userId;
  const { address, phoneNumber } = req.body;

  try {
    // Lấy giỏ hàng của người dùng
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: 'Giỏ hàng của bạn đang trống' });
    }

    // Tính tổng giá trị đơn hàng
    let totalAmount = 0;
    cart.items.forEach(item => {
      totalAmount += item.product.price * item.quantity;
    });

    // Tạo đơn hàng mới
    const order = new Order({
      user: userId,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount,
      shippingAddress: {
        address,
        phoneNumber,
      },
    });

    // Lưu đơn hàng
    await order.save();

    // Xóa giỏ hàng sau khi đặt đơn
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({ msg: 'Đơn hàng của bạn đã được gửi thành công', order });

  } catch (error) {
    res.status(500).json({ msg: 'Lỗi server' });
  }
};
