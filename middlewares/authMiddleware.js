const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'Token không tồn tại, quyền truy cập bị từ chối' });
  }

   
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.userId; // Thêm userId vào request
    next();
  } catch (err) {
    console.log(err);
    
    res.status(401).json({ msg: 'Token không hợp lệ' });
  }
};

module.exports = authMiddleware;
