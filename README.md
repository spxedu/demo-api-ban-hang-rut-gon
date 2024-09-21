# Hướng dẫn
## 1. Tải bản code mở đầu về chạy thử
https://github.com/spxedu/demo-api-ban-hang-rut-gon/tree/ffd479e7040b4840c00515422d34de629393a65f 
- Sau khi tải về, mở phần mềm code vào cửa sổ lệnh và chạy lệnh
```
  npm i
```
- Quá trình chạy nếu có báo lỗi thiếu thư viện nào thì bạn chạy ``` npm i xxxxx ```  với xxxxx là tên gói mà bị thiếu

## 2. Sử dụng Postman để thử nghiệm các link API
- Đăng ký: POST: http://localhost:3000/users/reg
- Đăng nhập: POST: http://localhost:3000/users/login
- Xem DSSP: GET: http://localhost:3000/products
- Thêm SP: POST: http://localhost:3000/products/add
-  Thêm SP vào giỏ hàng: POST: http://localhost:3000/products/cart
- Xem danh sách SP trong giỏ hàng: GET: http://localhost:3000/products/get-cart
- Gửi đơn hàng: POST: http://localhost:3000/products/checkout
- Xem danh sách đơn hàng: GET:  http://localhost:3000/products/orders 
- Tìm kiếm sản phẩm theo tên: GET: http://localhost:3000/products/search?q=laptop

## 3. Cấu trúc các bảng dữ liệu

### 1. Collection: users
Lưu trữ thông tin tài khoản người dùng đăng ký.
```
{
  "_id": ObjectId,      // ID người dùng (tự động sinh bởi MongoDB)
  "name": String,       // Họ và tên
  "username": String,   // Tên đăng nhập
  "email": String,      // Email
  "password": String    // Mật khẩu đã mã hóa
}
```

### 2. Collection: products
Lưu trữ thông tin sản phẩm.
```
{
  "_id": ObjectId,       // ID sản phẩm (tự động sinh bởi MongoDB)
  "name": String,        // Tên sản phẩm
  "image_url": String,   // Link ảnh sản phẩm
  "price": Number,       // Đơn giá
  "description": String, // Mô tả sản phẩm
  "category": String     // Thể loại sản phẩm
}
```
### 3. Collection: cart
Lưu trữ thông tin giỏ hàng của từng người dùng.
```
{
  "_id": ObjectId,      // ID giỏ hàng (tự động sinh)
  "user_id": ObjectId,  // ID người dùng tham chiếu từ collection 'users'
  "items": [
    {
      "product_id": ObjectId,  // ID sản phẩm
      "quantity": Number       // Số lượng sản phẩm
    }
  ],
  "total_price": Number        // Tổng giá tiền
}
```
### 4. Collection: orders
Lưu trữ thông tin các đơn hàng đã gửi.
```
{
  "_id": ObjectId,        // ID đơn hàng (tự động sinh)
  "user_id": ObjectId,    // ID người dùng
  "items": [
    {
      "product_id": ObjectId,  // ID sản phẩm
      "quantity": Number       // Số lượng sản phẩm
    }
  ],
  "total_price": Number,   // Tổng giá đơn hàng
  "shipping_info": {
    "address": String,     // Địa chỉ giao hàng
    "phone": String        // Điện thoại người nhận
  },
  "status": String,        // Trạng thái đơn hàng (VD: pending, shipped, delivered)
  "created_at": Date       // Ngày tạo đơn hàng
}
```
