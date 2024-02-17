const Product = require('../models/product');

exports.getHomepage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        docTitle: 'Shop Home',
        path: '/',
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        docTitle: 'All Products',
        path: '/products',
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      console.log(product);
      res.render('shop/product-detail', {
        product: product,
        docTitle: 'Product | ' + product.title,
        path: '/products',
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      console.log('fromgetcart');
      console.log(products);
      res.render('shop/cart', {
        products: products,
        docTitle: 'My Cart',
        path: '/cart',
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then((result) => {
      res.redirect('/orders');
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => console.log(result))
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    docTitle: 'Checkout',
    path: '/checkout',
    isAuthenticated: req.isLoggedIn,
  });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render('shop/orders', {
        docTitle: 'Orders',
        path: '/orders',
        orders: orders,
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};
