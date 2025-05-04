# Forest GIS Portfolio

Đây là website danh mục đầu tư cá nhân (portfolio) chuyên về GIS, viễn thám và quản lý tài nguyên rừng, được phát triển bằng Python/Flask.

## Cấu trúc dự án

```
forestgis_portfolio/
│
├── app.py                  # Ứng dụng Flask chính
├── requirements.txt        # Các thư viện cần thiết
│
├── static/                 # Tài nguyên tĩnh
│   ├── css/
│   │   └── style.css       # File CSS chính
│   │
│   ├── js/
│   │   └── main.js         # File JavaScript chính
│   │
│   ├── images/             # Thư mục chứa hình ảnh
│   │   ├── hero-bg.jpg
│   │   ├── logo.png
│   │   └── ...
│   │
│   └── files/              # Tập tin (CV, tài liệu...)
│       └── CV.pdf
│
└── templates/              # Các template HTML
    ├── base.html           # Template cơ sở
    ├── index.html          # Trang chủ
    ├── about.html          # Trang giới thiệu
    ├── blog.html           # Trang blog/chia sẻ kiến thức
    ├── map.html            # Trang bản đồ tương tác
    ├── tools.html          # Trang công cụ & phần mềm
    ├── projects.html       # Trang dự án
    └── contact.html        # Trang liên hệ
```

## Cài đặt và Chạy

### Yêu cầu

- Python 3.7+
- pip

### Các bước cài đặt

1. Clone hoặc tải repository về máy của bạn

2. Tạo môi trường ảo (khuyến nghị):
```bash
python -m venv venv
```

3. Kích hoạt môi trường ảo:

Trên Windows:
```bash
venv\Scripts\activate
```

Trên macOS/Linux:
```bash
source venv/bin/activate
```

4. Cài đặt các thư viện cần thiết:
```bash
pip install -r requirements.txt
```

5. Chạy ứng dụng:
```bash
python app.py
```

6. Truy cập website tại địa chỉ: http://127.0.0.1:5000

## Tùy chỉnh nội dung

### Thông tin cá nhân

Để tùy chỉnh nội dung cá nhân, bạn cần chỉnh sửa các tệp HTML trong thư mục `templates`.

### Hình ảnh

Thay thế các hình ảnh trong thư mục `static/images` bằng hình ảnh của bạn. Đảm bảo giữ nguyên tên file hoặc cập nhật đường dẫn trong mã HTML và CSS.

### Bản đồ tương tác

Trang bản đồ được thiết kế để nhúng bản đồ từ ArcGIS Online. Để thay đổi bản đồ:

1. Truy cập file `templates/map.html`
2. Tìm thẻ `<iframe class="arcgis-embed">` 
3. Thay đổi thuộc tính `src` thành URL của bản đồ ArcGIS Online của bạn

## Triển khai lên môi trường thực tế

### Triển khai lên Heroku

1. Đăng ký tài khoản tại [Heroku](https://heroku.com/)
2. Cài đặt [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Tạo file `Procfile` trong thư mục gốc với nội dung:
```
web: gunicorn app:app
```
4. Đăng nhập vào Heroku CLI:
```bash
heroku login
```
5. Tạo ứng dụng Heroku:
```bash
heroku create forestgis-portfolio
```
6. Đẩy mã nguồn lên Heroku:
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku master
```

### Triển khai lên VPS/Server khác

1. Cài đặt Nginx và Gunicorn trên server
2. Tạo file cấu hình Nginx cho website
3. Cài đặt mã nguồn và các thư viện cần thiết
4. Cấu hình Gunicorn để chạy ứng dụng
5. Khởi động Nginx và Gunicorn

## Phát triển thêm

### Thêm chức năng blog thực sự

Để phát triển chức năng blog với bài viết thực, bạn có thể:
1. Sử dụng cơ sở dữ liệu như SQLite hoặc PostgreSQL
2. Tạo model Blog và các chức năng quản lý bài viết
3. Xây dựng trang admin để quản lý bài viết

### Thêm tính năng đăng nhập và quản lý nội dung

Để dễ dàng quản lý nội dung, bạn có thể thêm:
1. Hệ thống xác thực người dùng
2. Giao diện quản trị (admin panel)
3. Chức năng chỉnh sửa nội dung trực tiếp từ giao diện web

## Tác giả

[Tên của bạn]

## Giấy phép

[Loại giấy phép - ví dụ: MIT]
