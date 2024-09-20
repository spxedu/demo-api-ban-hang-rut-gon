var express = require('express');
var router = express.Router();
const p = require('../controllers/product.controller')
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/',p.getProduct);
router.post('/add',p.addProduct);

router.post('/cart', authMiddleware, p.addToCart);

router.get('/get-cart', authMiddleware, p.getCart);

router.post('/checkout', authMiddleware, p.checkout)


module.exports = router;
