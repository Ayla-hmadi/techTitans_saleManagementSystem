CREATE VIEW branch_product_sales AS
SELECT branch.id AS branch_id, product.id AS product_id, SUM(order_product.order_quantity) AS total_sales
FROM Branch AS branch
JOIN branch_product ON branch_product.branchId = branch.id
JOIN Product AS product ON product.id = branch_product.productId
JOIN order_product ON order_product.productId = product.id
JOIN orders ON orders.id = order_product.orderId
WHERE orders.expectedDeliveryDate <= NOW() AND orders.invoiceId IS NOT NULL
GROUP BY branch.id, product.id;


CREATE VIEW sales_by_branch_product AS
SELECT b.id AS branch_id, p.id AS product_id, p.name AS product_name, SUM(op.order_quantity) AS total_quantity, SUM(op.order_quantity * bp.price) AS revenue
FROM branch b
JOIN branch_product bp ON b.id = bp.branchId
JOIN product p ON bp.productId = p.id
JOIN order_product op ON bp.productId = op.productId AND b.id = op.orderId
GROUP BY b.id, p.id
ORDER BY revenue DESC;

CREATE VIEW employee_performance AS
SELECT e.id AS employee_id, CONCAT(e.firstName, ' ', e.lastName) AS employee_name, 
b.city AS branch_city, b.country AS branch_country, COUNT(o.id) AS orders_count, 
SUM(op.order_quantity * bp.price) AS sales_generated, AVG(op.order_quantity * bp.price) AS avg_order_value
FROM Employee e
JOIN Branch b ON e.branchId = b.id
JOIN orders o ON o.customerId = e.id
JOIN order_product op ON op.orderId = o.id
JOIN branch_product bp ON bp.productId = op.productId AND bp.branchId = e.branchId
GROUP BY e.id, b.id;


CREATE VIEW customer_order_history AS
SELECT c.id AS customer_id, c.name AS customer_name, COUNT(o.id) AS total_orders, 
SUM(op.order_quantity * bp.price) AS total_spent, p.name AS most_frequently_purchased_product
FROM Customer c
JOIN orders o ON o.customerId = c.id
JOIN order_product op ON op.orderId = o.id
JOIN branch_product bp ON bp.productId = op.productId
JOIN Product p ON p.id = bp.productId
GROUP BY c.id;

CREATE VIEW inventory_management AS
SELECT b.id AS branch_id, b.city AS branch_city, b.country AS branch_country, 
p.id AS product_id, p.name AS product_name, SUM(bp.quantity) AS current_inventory, 
MAX(IF(bp.isDeleted, bp.price, NULL)) AS last_price_paid, 
MIN(IF(bp.isDeleted, bp.price, NULL)) AS lowest_price_paid, 
MAX(IF(NOT bp.isDeleted, bp.price, NULL)) AS current_price
FROM Branch b
JOIN branch_product bp ON b.id = bp.branchId
JOIN Product p ON p.id = bp.productId
GROUP BY b.id, p.id;


CREATE VIEW vendor_performance AS
SELECT v.id AS vendor_id, v.name AS vendor_name, COUNT(DISTINCT bp.productId) AS products_sold, 
SUM(bp.quantity * bp.price) AS revenue_generated, AVG(bp.price) AS avg_order_value
FROM Vendor v
JOIN Product p ON p.vendorId = v.id
JOIN branch_product bp ON bp.productId = p.id
GROUP BY v.id;





