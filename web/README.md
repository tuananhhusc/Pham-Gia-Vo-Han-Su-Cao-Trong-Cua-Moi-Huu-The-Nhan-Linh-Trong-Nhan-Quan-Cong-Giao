# ✝ Dự Án Nghiên Cứu Thần Học Công Giáo: Phẩm Giá Vô Hạn

Trang web ứng dụng Next.js chuyên biệt dành cho bài đọc học thuật nghiên cứu long-form: **"Phẩm Giá Vô Hạn: Sự Cao Trọng Của Mỗi Hữu Thể Nhân Linh Trong Nhãn Quan Công Giáo"** (phân tích sâu sắc dựa trên các văn kiện Giáo hội như *Imago Dei*, *Thần học về Thân xác*, *Evangelium Vitae*, và *Dignitas Infinita*).

Ứng dụng được thiết kế tối ưu hóa trải nghiệm đọc chuyên sâu (Deep Reading) trên mọi thiết bị, tích hợp SEO học thuật chuẩn mực và hệ thống tính năng UI/UX tinh tế.

---

## 🌟 Tính Năng Nổi Bật

### 1. Trải Nghiệm Đọc Chuyên Nghiệp (UX Academic Reading)
*   **Bảng Điều Khiển Đọc (Reading Settings Panel):** Nhấp vào nút "Aa" cố định ở góc phải để mở bảng điều khiển:
    *   **3 Giao diện màu:** *Giấy Cổ (Parchment)* dịu mắt, *Bóng Đêm (Dark)* tiết kiệm pin, và *Sepia* ấm áp.
    *   **4 Cỡ chữ:** Linh hoạt tùy chỉnh từ Nhỏ (sm), Vừa (md), Lớn (lg), cho đến Rất Lớn (xl).
    *   **2 Kiểu phông:** Chuyển đổi giữa *EB Garamond (Serif)* truyền thống cho việc đọc sách cổ điển và *Inter (Sans-serif)* cho giao diện hiện đại.
*   **Chế Độ Tập Trung (Focus Mode):** Ẩn toàn bộ thanh tiến trình, tiêu đề trang, chân trang, và thanh mục lục để tạo không gian đọc tập trung tối đa, giảm xao nhãng.
*   **Đồng Bộ Ngăn Ngừa Nhấp Nháy (Anti-FOUC):** Tích hợp Script inline đồng bộ hóa trạng thái lưu trữ (`localStorage`) ngay khi tải trang, ngăn chặn hiện tượng nhấp nháy giao diện khi reload.

### 2. Hệ Thống Chú Thích Thông Minh (Smart Footnotes)
*   **Trên Máy Tính (Desktop):** Di chuột qua hoặc nhấp vào số chú thích (`[^1]`) để hiện bong bóng (Tooltip) chứa trích dẫn ngay tại vị trí đọc mà không cần nhảy xuống cuối trang.
*   **Trên Di Động (Mobile):** Khi nhấp chọn chú thích, một **Bottom Sheet** (Ngăn kéo vuốt từ cạnh dưới) sẽ trượt lên mượt mà. Hệ thống tự động khóa cuộn trang nền (`body overflow hidden`) để độc giả đọc chú thích dài một cách thuận tiện nhất và tự động mở lại khi đóng Bottom Sheet.

### 3. Tối Ưu Hóa Hiển Thị Trên Di Động (Mobile Responsive)
*   **Mục lục nổi trượt (Mobile TOC Drawer):** Nút nổi mục lục ở góc trái màn hình (`lg:hidden`) mở ra ngăn kéo trượt chứa sơ đồ cấu trúc bài viết, hỗ trợ theo dõi tiến trình đọc và nhảy chương nhanh.
*   **Đối xứng trực quan:** Cân chỉnh kích thước và tọa độ các nút điều hướng nổi (`MobileTOC` và `BackToTop`) thẳng hàng ngang hoàn hảo (`bottom-6` trên mobile).

### 4. Tối Ưu Hóa Bản In & Xuất Bản PDF (Print Styling)
*   Áp dụng CSS `@media print` chuyên biệt: Tự động ẩn toàn bộ nút nổi, thanh tiến trình đọc, thanh điều hướng; điều chỉnh giãn dòng lý tưởng và tối ưu lề trang in để xuất bản sang file PDF hoặc in giấy như một cuốn sách thực thụ.

### 5. SEO Học Thuật & Metadata Mạng Xã Hội
*   **SEO Học thuật:** Tích hợp JSON-LD cấu trúc Schema.org dạng `ScholarlyArticle` và các thẻ metadata học thuật phục vụ việc lập chỉ mục trên Google Scholar.
*   **Open Graph & Twitter Cards:** Cấu hình thẻ meta mạng xã hội (Facebook, X, Zalo...) đầy đủ kèm ảnh đại diện chia sẻ thực tế (`/og-image.png` kích thước `1200x630` pixels chất lượng cao).

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
d:\CTKDCTC\
├── KDCTC.md                 # Tệp nguồn nội dung bài báo cáo (định dạng Markdown)
└── web\                     # Mã nguồn dự án Next.js (App Router)
    ├── app\
    │   ├── components\      # Các thành phần giao diện
    │   │   ├── ArticleRenderer.tsx      # Bộ biên dịch Markdown sang React
    │   │   ├── BackToTop.tsx            # Nút nhảy lên đầu trang
    │   │   ├── FootnoteTooltip.tsx      # Xử lý bong bóng & Bottom Sheet chú thích
    │   │   ├── MobileTOC.tsx            # Ngăn kéo mục lục trên di động
    │   │   ├── ReadingProgressBar.tsx   # Thanh tiến trình đọc trên cùng
    │   │   ├── ReadingSettings.tsx      # Bảng điều chỉnh giao diện (Aa)
    │   │   └── TableOfContents.tsx      # Thanh mục lục sidebar trên máy tính
    │   ├── globals.css      # Cấu hình Tailwind CSS, Theme, và Animations
    │   ├── layout.tsx       # Khai báo Metadata SEO, JSON-LD, Font và Script Anti-FOUC
    │   └── page.tsx         # Trang chủ chính kết nối dữ liệu
    ├── lib\
    │   └── markdown.ts      # Tiện ích đọc và xử lý cấu trúc headings/TOC tự động từ file .md
    ├── public\              # Thư mục chứa tài nguyên tĩnh (og-image.png, favicon.ico)
    ├── package.json         # Danh sách thư viện và tập lệnh chạy dự án
    └── tsconfig.json        # Cấu hình TypeScript
```

---

## 🛠 Khởi Chạy Dự Án

### Yêu cầu hệ thống
*   Đã cài đặt **Node.js** (Phiên bản v18 trở lên).
*   Đã cài đặt trình quản lý gói **npm** (đi kèm khi cài Node.js).

### Các bước cài đặt và chạy:

1.  **Di chuyển vào thư mục dự án `web`:**
    ```bash
    cd web
    ```

2.  **Cài đặt các gói thư viện phụ thuộc:**
    ```bash
    npm install
    ```

3.  **Khởi động máy chủ phát triển (Development Server):**
    ```bash
    npm run dev
    ```
    *Mở trình duyệt truy cập địa chỉ [http://localhost:3000](http://localhost:3000) để xem và chỉnh sửa trực tiếp.*

4.  **Đóng gói sản phẩm tối ưu (Production Build):**
    ```bash
    npm run build
    ```
    *Dự án sẽ được biên dịch tĩnh hóa hoàn chỉnh phục vụ triển khai trên Netlify, Vercel, hoặc VPS.*

5.  **Chạy bản thử nghiệm đã đóng gói:**
    ```bash
    npm run start
    ```

---

## 🎨 Tông Màu & Thiết Kế Chủ Đạo (Theme System)

Dự án sử dụng thiết kế tinh tế kế thừa các tông màu cổ điển mang đậm tính chất nghiên cứu học thuật của Giáo hội:
*   **Burgundy Red (`#6B1C23`):** Tông màu chủ đạo thể hiện sự tôn nghiêm, quyền lực và thánh thiêng.
*   **Gold Academic Accent (`#B8860B`):** Tông màu nhấn cho các chi tiết phụ, trang trí biểu tượng chữ thập `✝` và các chỉ mục chú thích.
*   **Parchment Background (`#F9F8F6`):** Màu nền mặc định ấm áp giả lập chất liệu giấy sách da cổ, hạn chế tối đa việc mỏi mắt khi đọc hàng giờ liền.
*   **Sepia Theme Background (`#F4ECD8`):** Màu nền sepia trà ấm hỗ trợ đọc ban đêm cực tốt.
*   **Dark Mode Background (`#121212`):** Màu nền đen than (Charcoal) cao cấp phù hợp với các thiết bị màn hình OLED và tối ưu ánh sáng xanh.

---

*Dự án được xây dựng và duy trì bởi Ban Biên Tập Nghiên Cứu Thần Học Công Giáo.*
