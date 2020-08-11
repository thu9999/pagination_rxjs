# pagination_rxjs
- Giả sử có 1 pagination có các phụ thuộc:
+ page: trang hiện tại
+ itemsPerPage: số lượng items trong 1 page
+ text: value tìm kiếm

ISSUE: Mỗi khi 1 trong 3 phụ thuộc trên thay đổi ta phải gọi api để lấy danh sách item mới
example:
function pageChange() {
 // Gọi api lấy danh sách item
  getItem();
}

function itemsPerPageChange() {
 // Gọi api lấy danh sách item
  getItem();
}

function textChange() {
 // Gọi api lấy danh sách item
  getItem();
}

Như vậy, mỗi khi phụ thuộc thay đổi thì ta lại lặp lại đoạn code getItem() và ta luôn phải quản lý việc này.
=> Giả sử pagination này có nhiều đến vài chục phụ thuộc thì việc quản lý nó rất khó. Đồng thời code cũng break DRY rule (Don't Repeat Yourself)

SOLUTION:
Có thể kết hợp rxjs trong việc quản lý pagination. Mỗi phụ thuộc là 1 observable (stream of value). Mỗi khi observable này emit 1 value (page change, items per page change ...)
thì subscription sẽ thực hiện việc gọi api để lấy danh sách mới. Subscription sẽ quản lý việc gọi api và ta cũng không cần nhớ hay gọi api này mỗi khi có 1 phụ thuộc thay đổi.

- Đồng thời ta cũng quản lý được việc gọi api mỗi khi giá trị phụ thuộc thay đổi.
Chỉ gọi api khi: 
+ Người dùng ngừng nhập ô tìm kiếm trong 1 khoảng thời gian (500ms trong example)
+ Hai giá trị tìm kiếm liên tiếp khác nhau
