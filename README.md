# Rooted Routes Vietnam

Bản đồ Việt Nam tương tác, giới thiệu 6 tỉnh: Lào Cai, Bắc Ninh, Nghệ An, Quảng Ngãi, Khánh Hòa, Cà Mau. Mỗi tỉnh có ảnh bìa và các điểm đến chia theo khu vực. Nội dung site viết bằng tiếng Anh.

Các trang: `/` (bản đồ), `/about-us`, `/give-back`.

## Chạy

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Nội dung

Dữ liệu nằm trong `data/*.json` (`provinces`, `pages`, `shapes`), ảnh nằm trong `public/images/`. Sửa tay trực tiếp, không có script sinh dữ liệu.

## Công nghệ

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, `motion`.

## Font

Tiêu đề dùng Avilock Bold. Giấy phép chỉ cho dùng cá nhân, không thương mại (xem `public/fonts/Read Me.txt`). Muốn dùng thương mại phải mua bản quyền.
