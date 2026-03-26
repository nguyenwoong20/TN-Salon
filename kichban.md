1. Kịch bản "Khách hàng VIP" (Luồng thành công 100%)
Đây là kịch bản lý tưởng nhất khi mọi thứ đều trống.

Thao tác: 1. Chọn Stylist: "Tuấn Barber".
2. Chọn Dịch vụ: "Combo 7 bước (30 phút)".
3. Chọn thời gian: 27/03/2026 10:00.
4. Bấm Xác nhận.

Kết quả mong đợi: - Hiển thị thông báo xanh: "Đặt lịch thành công!".

Hệ thống tự tính endTime là 10:30.

Database xuất hiện 1 dòng dữ liệu mới đầy đủ tên thợ, tên khách.

2. Kịch bản "Thợ đắt show" (Test Overlap - Trùng lịch)
Kiểm tra xem "bộ não" có ngăn chặn được việc 2 người đặt cùng 1 lúc không.

Thao tác: 1. Tiếp tục dùng Stylist "Tuấn Barber".
2. Một khách khác (hoặc tab khác) đặt lúc 10:15 (vẫn nằm trong khoảng 10:00 - 10:30 của khách trước).
3. Bấm Xác nhận.

Kết quả mong đợi: - Hiển thị thông báo đỏ: "Thợ Tuấn Barber đang bận. Dự kiến rảnh lúc 10:30. Vui lòng chọn khung giờ khác!".

Tuyệt đối không có dữ liệu mới ghi đè vào Database.

3. Kịch bản "Quay lại tương lai" (Chặn đặt lịch quá khứ)
Ngăn khách đặt lịch vào thời gian đã trôi qua.

Thao tác: 1. Chọn thời gian là ngày hôm qua hoặc 1 tiếng trước (ví dụ hiện tại 22:00, bạn đặt 20:00).
2. Bấm Xác nhận.

Kết quả mong đợi: - Hiển thị thông báo lỗi: "Không thể đặt lịch cho thời gian đã qua".

Hệ thống chặn ngay lập tức nhờ logic LocalDateTime.now().

4. Kịch bản "Nối đuôi nhau" (Test sát giờ rảnh)
Kiểm tra xem hệ thống có cho phép đặt lịch ngay sau khi thợ vừa xong việc không.

Thao tác: 1. Khách trước xong lúc 10:30.
2. Khách sau đặt đúng lúc 10:30.

Kết quả mong đợi: - Thành công! Vì điều kiện của chúng ta là newStart < existingEnd, mà 10:30 không nhỏ hơn 10:30.

Điều này giúp tiệm tóc tối ưu hóa thời gian, thợ vừa xong khách này là có khách kia vào luôn.

5. Kịch bản "Khác ngày - Cùng giờ" (Test đa ngày)
Đảm bảo hệ thống không bị "ngáo" khi so sánh giờ mà quên ngày.

Thao tác: 1. Đặt lịch cho thợ A lúc 10:00 ngày 27/03.
2. Đặt lịch cho thợ A lúc 10:00 ngày 28/03.

Kết quả mong đợi: - Cả 2 đều thành công. - Hệ thống phải phân biệt được LocalDateTime khác nhau thì không tính là trùng.

6. Kịch bản "Dọn dẹp hiện trường" (Global Exception Handler)
Kiểm tra xem giao diện có bị vỡ khi gặp lỗi không.

Thao tác: - Cố tình không chọn Thợ hoặc không chọn Giờ rồi bấm nút.

Kết quả mong đợi: - Thay vì hiện một đống chữ Java loằng ngoằng (trace), giao diện chỉ hiện một dòng thông báo lỗi ngắn gọn, sạch sẽ từ GlobalExceptionHandler trả về.