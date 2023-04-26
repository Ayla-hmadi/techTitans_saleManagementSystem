const express = require('express');
const cors = require("cors");


const bodyParser = require('body-parser');
const branchRoutes = require('./routes/branchRoutes');
const ordersRoutes = require('./routes/ordersRoutes');

const customerRoutes = require('./routes/customerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const productRoutes = require('./routes/productRoutes');
const storeRoutes = require('./routes/storeRoutes');
const vendorRoutes = require('./routes/vendorRoutes');


const app = express();
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/branches', branchRoutes);
app.use('/orders', ordersRoutes);
app.use('/customer', customerRoutes);
app.use('/employee', employeeRoutes);
app.use('/invoice', invoiceRoutes);
app.use('/product', productRoutes);
app.use('/store', storeRoutes);
app.use('/vendor', vendorRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
