const Product = require("../models/product")
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