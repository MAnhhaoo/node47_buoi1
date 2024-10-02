-- # tạo cơ sơr dữ liệu 
CREATE DATABASE node47 ;
USE node47 


-- # tạo table , data

-- #tao table users
-- # có 3 kiểu dữ liệu chính :
-- # - NUMBER : interger , float .....
-- # string : varchar , text ,...
-- # datetime (timestamp , day ,...)
CREATE TABLE users(
	full_name VARCHAR(100),
	email VARCHAR(255),
	age INT,
	pass_word VARCHAR(255)

);

-- # tạo data cho table
INSERT INTO users (full_name, email, age, pass_word) VALUES 
('Nguyen Van hào', 'nguyenvana@example.com', 25, 'password123'),
('Le Thi B', 'lethib@example.com', 30, 'passw0rd!'),
('Tran Van C', 'tranvanc@example.com', 22, 'mypassword456'),
('Pham Thi D', 'phamthid@example.com', 27, 'abc123xyz'),
('Do Quang Khai', 'khaidq@example.com', 23, 'KhaiPassword!'),
('Nguyen Thi E', 'nguyenthie@example.com', 26, 'securepass789'),
('Le Van F', 'levanf@example.com', 21, 'strongpass111'),
('Tran Thi G', 'tranthig@example.com', 29, 'passkey2021'),
('Nguyen Van H', 'nguyenvanh@example.com', 24, 'password789'),
('Le Thi I', 'lethii@example.com', 31, 'passme2022'),
('Tran Van J', 'tranvanj@example.com', 28, 'jpasspassword!'),
('Pham Van K', 'phamvank@example.com', 22, 'vank_pass432'),
('Do Thi L', 'dothil@example.com', 27, 'secretpass100'),
('Nguyen Van M', 'nguyenvanm@example.com', 24, 'mypassword999'),
('Le Thi N', 'lethin@example.com', 25, 'newpassword123'),
('Tran Van O', 'tranvano@example.com', 26, 'opassword567'),
('Pham Thi P', 'phamthip@example.com', 30, 'strongpassp@ss'),
('Do Van Q', 'dovanq@example.com', 28, 'quypasspass!'),
('Nguyen Thi R', 'nguyenthir@example.com', 23, 'securepassR@123'),
('Le Van S', 'levans@example.com', 21, 'Spasswordstrong!');

-- # viết cau query để get dữ liệu get data 
-- # * là lấy hết tất cả data trong table 
-- SELECT * FROM users
SELECT full_name AS 'ho ten' , email FROM users 

-- lay nhung nguoi co tuoi tu 20-30 tuoi
-- cach 1 
SELECT * FROM users 
WHERE 20 <= age and age <= 30 
ORDER BY age ASC 
-- ORDER BY age ASC key word để sắp xếp data desc va asc 

-- LIMIT là số lượng muốn lấy data 
LIMIT 5

-- liet ke những người có tuổi lớn nhất 
-- cach 1 
SELECT * FROM users 
WHERE age= (
SELECT age FROM users 
ORDER BY age DESC
LIMIT 1
)

-- cach 2 dungf keyword max or min
SELECT * FROM users 
WHERE age = (SELECT MAX(age) FROM users)

-- tìm những người có họ lê trong danh sách 
-- => keyword like  (tìm tương đối ) 
SELECT * from users 
WHERE full_name like '%Le%'
--  LE% => tìm những người có chữ le ở đầu chuỗi 
-- %Le => tìm những người có chữ lê ở cuối chuỗi 
-- %Le% => tìm những người có chữ le từ đầu đến cuối chuỗi 

SELECT DISTINCT full_name from users

-- đếm có bao nhiêu users trong table 
-- => count 
SELECT COUNT(*) FROM users


-- # thêm column adress và phone cho table users
-- => update table thay viì xóa table và tạo lại 
-- keyword để update table (thêm column)
-- thêm column mới 
ALTER TABLE users 
ADD COLUMN address VARCHAR(255),
ADD COLUMN phone VARCHAR(15)

-- thay đổi kiểu dữ liệu cho column đó (address)
ALTER TABLE users 
modify address VARCHAR(100)

-- thêm ràng buộc (constraint) cho column 
ALTER TABLE users 
modify COLUMN full_name VARCHAR(100) NOT NULL
INSERT INTO users (email, age, pass_word , address) VALUES 
('anhhao@gmail.com' , 30 , '123' , 'anhhao')

-- cach 2 
SELECT * FROM users 
WHERE age BETWEEN 20 and 30 ;

-- khóa chính (primary key )
-- column trong table những dùng để xác định data đó là duy nhất , để query 1 phần tử 
-- thêm khóa chính cho table users 
ALTER TABLE users
ADD COLUMN user_id int PRIMARY KEY auto_increment

INSERT INTO users (full_name, age , email) VALUES
('cyber',30 ,'cyber@gmail.com')
SELECT * FROM users


-- tổng kết 
-- tạo database , table , data , column 
-- query (select ... from <tên table > 
-- filter (where)
-- tìm data trong khoảng nào đó (between ... and )
-- update table (add column mới , update datatype column, thêm ràng buộc ) => alter table <tên table> ....
-- sub query (tìm người có tuổi lớn nhất (nhỏ nhất ) )
-- tìm kiếm chuỗi (like)

-- # query , insert , update , delete 



