CREATE TABLE Store (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE Vendor (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(20),
  city VARCHAR(255),
  country VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE Branch (
  id INT NOT NULL AUTO_INCREMENT,
  storeId INT NOT NULL,
  road VARCHAR(255),
  city VARCHAR(255),
  country VARCHAR(255),
  openingDate DATE,
  phoneNumber VARCHAR(20),
  PRIMARY KEY (id),
  FOREIGN KEY (storeId) REFERENCES Store(id)
);

CREATE TABLE Customer (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(20),
  PRIMARY KEY (id)
);

CREATE TABLE Product (
  id INT NOT NULL AUTO_INCREMENT,
  vendorId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (vendorId) REFERENCES Vendor(id)
);

CREATE TABLE Employee (
  id INT NOT NULL AUTO_INCREMENT,
  branchId INT NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(20),
  salary DECIMAL(10, 2),
  position VARCHAR(255),
  managerId INT,
  joinDate DATE,
  PRIMARY KEY (id),
  FOREIGN KEY (branchId) REFERENCES Branch(id),
  FOREIGN KEY (managerId) REFERENCES Employee(id)
);

CREATE TABLE branch_product (
  branchId INT NOT NULL,
  productId INT NOT NULL,
  quantity INT,
  price DECIMAL(10, 2),
  isDeleted BOOLEAN,
  PRIMARY KEY (branchId, productId),
  FOREIGN KEY (branchId) REFERENCES Branch(id),
  FOREIGN KEY (productId) REFERENCES Product(id)
);

CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT,
  invoiceId VARCHAR(255),
  customerId INT NOT NULL,
  expectedDeliveryDate DATE,
  PRIMARY KEY (id),
  FOREIGN KEY (customerId) REFERENCES Customer(id),
  FOREIGN KEY (invoiceId) REFERENCES invoice(id)
);

CREATE TABLE order_product (
  orderId INT NOT NULL,
  productId INT NOT NULL,
  order_quantity INT,
  PRIMARY KEY (orderId, productId),
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (productId) REFERENCES Product(id)
);

CREATE TABLE invoice (
  id INT NOT NULL AUTO_INCREMENT,
  timeStamp TIMESTAMP,
  paymentDueDate DATE,
  paymentMethod VARCHAR(255),
  paymentTimeStamp TIMESTAMP,
  amount DECIMAL(10, 2),
  PRIMARY KEY (id)
);
