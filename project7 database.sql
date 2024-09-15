CREATE DATABASE E_Commerce_P7;

USE E_Commerce_P7;


-- Create Category Table
CREATE TABLE Category (
    category_id INT IDENTITY(1,1)  PRIMARY KEY,
    name NVARCHAR(255),
    image NVARCHAR(MAX),
    description NVARCHAR(MAX)
);

-- Create Products Table
CREATE TABLE Products (
    product_id INT IDENTITY(1,1)  PRIMARY KEY ,
    name NVARCHAR(255),
    description NVARCHAR(MAX),
    image NVARCHAR(MAX),
    price DECIMAL(10, 2),
    category_id INT,
    brand NVARCHAR(100),
    price_with_discount DECIMAL(10, 2),
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

-- Create Users Table
CREATE TABLE Users (
    user_id INT IDENTITY(1,1)  PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    email VARCHAR(255)NOT NULL,
    image NVARCHAR(MAX),
    password NVARCHAR(255)NOT NULL,
    passwordHash VARBINARY(MAX),
    passwordSalt VARBINARY(MAX),
    address NVARCHAR(255),
    points INT,
    phone_number VARCHAR(20)
);

-- Create Admin Table
CREATE TABLE Admin (
    admin_id INT IDENTITY(1,1)  PRIMARY KEY,
    name NVARCHAR(255)NOT NULL,
    email VARCHAR(255)NOT NULL,
    img NVARCHAR(MAX),
    password VARCHAR(255)NOT NULL,
    passwordHash VARBINARY(MAX),
    passwordSalt VARBINARY(MAX)
);

-- Create Contact Table
CREATE TABLE Contact (
    contact_id INT IDENTITY(1,1)  PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject NVARCHAR(255),
    message NVARCHAR(MAX),
    sent_date DATE,
    admin_response NVARCHAR(MAX),
    response_date DATE,
    status NVARCHAR(255) DEFAULT 'PENDING'
);

-- Create Coupons Table
CREATE TABLE Copons (
    copon_id INT IDENTITY(1,1)  PRIMARY KEY,
    name NVARCHAR(255),
    DiscountAmount  DECIMAL(10, 2),
    ExpiryDate DATETIME  ,
	CreatedAt DATETIME DEFAULT GETDATE(),
	IsUsed BIT DEFAULT 0,
	user_id INT ,
	 FOREIGN KEY (user_id) REFERENCES Users(user_id)

);

-- Create Orders Table
CREATE TABLE Orders (
    order_id INT IDENTITY(1,1)  PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10, 2),
    copon_id INT,
    status INT,
    transaction_id NVARCHAR(MAX),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (copon_id) REFERENCES Copons(copon_id)
);

-- Create Cart Table 
CREATE TABLE Cart (
cart_id INT IDENTITY(1,1)  PRIMARY KEY,
user_id INT unique,

FOREIGN KEY (user_id) REFERENCES Users(user_id)

);

-- Create Cart_Item Table
CREATE TABLE Cart_Item (
    cart_item_id INT IDENTITY(1,1)  PRIMARY KEY,
	cart_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
	FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
);

-- Create Order_Item Table
CREATE TABLE Order_Item (
    order_item_id INT IDENTITY(1,1)  PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Create Comment Table
CREATE TABLE Comment (
    comment_id INT IDENTITY(1,1)  PRIMARY KEY,
    user_id INT,
    product_id INT,
    comment NVARCHAR(MAX),
    status  NVARCHAR(255) DEFAULT 'PENDING',
    date DATE,
    rating INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);


INSERT INTO Category (name, image, description)
VALUES 
('Hoodies', 'Hoodie.jpg', 'Comfortable and stylish hoodies for all genders, made from high-quality cotton and polyester. Perfect for casual wear or layering.'),
('Pants', 'CargoPants.jpg', 'Versatile pants featuring multiple pockets and durable fabric, ideal for both casual and outdoor activities.'),
('Dresses', 'Dress.jpg', 'Elegant dresses for women, from casual day dresses to formal evening gowns, available in a wide variety of styles and colors.'),
('Boots', 'Boots.jpg', 'A wide collection of boots, offering comfort and style for various occasions, including outdoor adventures and casual wear.');

INSERT INTO Products (name, description, image, price, category_id, brand, price_with_discount)
VALUES 
('Classic White T-Shirt', 'A timeless white T-shirt made from 100% cotton. Perfect for casual wear.', 'tshirt_white.jpg', 19.99, 1, 'BrandA', 15.99),
('Blue Denim Jeans', 'Comfortable blue denim jeans with a slim fit design.', 'denim_jeans.jpg', 49.99, 2, 'BrandB', 39.99),
('Leather Jacket', 'Stylish leather jacket available in various sizes.', 'leather_jacket.jpg', 99.99, 3, 'BrandC', 89.99),
('Summer Dress', 'Elegant summer dress with floral patterns, ideal for warm weather.', 'summer_dress.jpg', 69.99, 4,  'BrandD', 59.99),
('Running Shoes', 'Lightweight running shoes with excellent grip and cushioning.', 'running_shoes.jpg', 79.99, 5, 'BrandE', 69.99);

INSERT INTO Users (name, email, image, password, passwordHash, passwordSalt, address, points, phone_number)
VALUES 
(' ali omar', 'ali@example.com', NULL, 'password123', 0x4858DFF68466E44C8BD9D49F34FADB6986040A5A55FB3BE30D485EE52460B8C6D4802E7126CD7BD5048F8FDB99E35A99AE970696823878BDF7418C2E95433F41, 0x1B3A6042BD5534D23FC03A1A15913702F74A132DD3CFE6F408A8EFC6E4D52D75C481B8736B60F14C6B7C0550003D78F8A3175E09964D9966D15989363ADBF0268F489BED5CB3DD49B2AD2082D0BD0C2FDC14992DCF28C76DD1589DDA23C998FBBDB73EE092AE54B8DB0D95F40BD1F7BF7172FF764F7A09C360F437F69BD4DF6B, '123 Main St', 120, '123-456-7890'),
('ahmad ali', 'ahmad@example.com', NULL, 'password456', 0x4858DFF68466E44C8BD9D49F34FADB6986040A5A55FB3BE30D485EE52460B8C6D4802E7126CD7BD5048F8FDB99E35A99AE970696823878BDF7418C2E95433F41, 0x1B3A6042BD5534D23FC03A1A15913702F74A132DD3CFE6F408A8EFC6E4D52D75C481B8736B60F14C6B7C0550003D78F8A3175E09964D9966D15989363ADBF0268F489BED5CB3DD49B2AD2082D0BD0C2FDC14992DCF28C76DD1589DDA23C998FBBDB73EE092AE54B8DB0D95F40BD1F7BF7172FF764F7A09C360F437F69BD4DF6B, '456 Oak Ave', 150, '987-654-3210'),
('yousef ahmad ', 'yousef@example.com', NULL, 'password789', 0x4858DFF68466E44C8BD9D49F34FADB6986040A5A55FB3BE30D485EE52460B8C6D4802E7126CD7BD5048F8FDB99E35A99AE970696823878BDF7418C2E95433F41, 0x1B3A6042BD5534D23FC03A1A15913702F74A132DD3CFE6F408A8EFC6E4D52D75C481B8736B60F14C6B7C0550003D78F8A3175E09964D9966D15989363ADBF0268F489BED5CB3DD49B2AD2082D0BD0C2FDC14992DCF28C76DD1589DDA23C998FBBDB73EE092AE54B8DB0D95F40BD1F7BF7172FF764F7A09C360F437F69BD4DF6B, '789 Pine Blvd', 180, '555-123-4567'),
('anas ahmad', 'anas@example.com', NULL, 'password101', 0x4858DFF68466E44C8BD9D49F34FADB6986040A5A55FB3BE30D485EE52460B8C6D4802E7126CD7BD5048F8FDB99E35A99AE970696823878BDF7418C2E95433F41, 0x1B3A6042BD5534D23FC03A1A15913702F74A132DD3CFE6F408A8EFC6E4D52D75C481B8736B60F14C6B7C0550003D78F8A3175E09964D9966D15989363ADBF0268F489BED5CB3DD49B2AD2082D0BD0C2FDC14992DCF28C76DD1589DDA23C998FBBDB73EE092AE54B8DB0D95F40BD1F7BF7172FF764F7A09C360F437F69BD4DF6B, '101 Elm St', 200, '555-987-6543');


INSERT INTO Products (name, description, image, price, category_id, brand, price_with_discount)
VALUES 
('Classic Hoodie', 'A cozy hoodie for everyday wear', 'ClassicHoodie.jpg', 49.99, 1, 'Brand A', 39.99),
('Graphic Hoodie', 'Stylish hoodie with a unique graphic design','GraphicHoodie.jpg', 59.99, 1, 'Brand B', 49.99),
('Zip-Up Hoodie', 'Comfortable zip-up hoodie with pockets', 'Zip-UpHoodie.jpg', 69.99, 1, 'Brand C', 59.99);

-- Insert Products for Pants (category_id = 2)
INSERT INTO Products (name, description, image, price, category_id, brand, price_with_discount)
VALUES 
('Slim Fit Jeans', 'Stylish slim fit jeans with stretch', 'SlimFitJeans.jpg', 79.99, 2, 'Brand D', 69.99),
('Chinos', 'Classic chinos with a modern twist', 'Chinos.jpg', 49.99, 2, 'Brand E', 39.99),
('Cargo Pants', 'Durable cargo pants with multiple pockets', 'CargoPants.jpg', 59.99, 2, 'Brand F', 49.99);

-- Insert Products for Dresses (category_id = 3)
INSERT INTO Products (name, description, image, price, category_id, brand, price_with_discount)
VALUES 
('Maxi Dress', 'Elegant maxi dress for any occasion', 'MaxiDress.jpg', 89.99, 3, 'Brand G', 79.99),
('Summer Dress', 'Light and breezy summer dress', 'SummerDress.jpg', 59.99, 3, 'Brand H', 49.99),
('Evening Gown', 'Luxurious evening gown with intricate details', 'EveningGown.jpg', 129.99, 3, 'Brand I', 109.99);

-- Insert Products for Boots (category_id = 4)
INSERT INTO Products (name, description, image, price, category_id, brand, price_with_discount)
VALUES 
('Ankle Boots', 'Stylish ankle boots with a block heel', 'AnkleBoots.jpg', 99.99, 4, 'Brand J', 89.99),
('Chelsea Boots', 'Classic Chelsea boots with elastic side panels', 'ChelseaBoots.jpg', 119.99, 4, 'Brand K', 109.99),
('Hiking Boots', 'Durable hiking boots for outdoor adventures', 'HikingBoots.jpg', 139.99, 4, 'Brand L', 119.99);


CREATE TABLE Messages (
    Id INT PRIMARY KEY IDENTITY(1,1),  -- Primary key, auto-incrementing
    Sender NVARCHAR(MAX) NULL,         -- Sender of the message
    Recipient NVARCHAR(MAX) NULL,      -- Recipient of the message
    MessageContent NVARCHAR(MAX) NULL, -- Content of the message
    Timestamp DATETIME NULL            -- Timestamp of the message
);

 CREATE TABLE ChatMessages (
    Id INT PRIMARY KEY IDENTITY(1,1), 
    Sender NVARCHAR(100) NULL, 
    Recipient NVARCHAR(100) NULL, 
    MessageContent NVARCHAR(MAX) NULL, 
    SentAt DATETIME NULL
);
