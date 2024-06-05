import React, { useState, useEffect } from 'react';
import { 
    BrowserRouter, Routes, Route, Link, useNavigate, useParams 
} from 'react-router-dom';
import { 
    Container, Row, Col, Card, Button, Alert, ListGroup, Badge, Form, Modal 
} from 'react-bootstrap';

const productsData = [
  { id: 1, name: 'Laptop', price: 999.99, image: 'laptop.jpg' },
  { id: 2, name: 'Smartphone', price: 599.99, image: 'smartphone.jpg' },
  { id: 3, name: 'Headphones', price: 129.99, image: 'headphones.jpg' },
];

let nextOrderId = 1; 
const [orders, setOrders] = useState([]);

function App() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    
        <Routes>
          {}
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} nextOrderId={nextOrderId} />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess orders={orders} />} />
        </Routes>

  );
}


function Checkout({ cart, setCart, orders, setOrders, nextOrderId }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.fullName || !formData.email || !formData.address) {
      alert('Please fill in all fields.');
      return;
    }

    const newOrder = {
      id: nextOrderId++, 
      customerName: formData.fullName,
      customerEmail: formData.email,
      shippingAddress: formData.address,
      items: cart,
      total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      orderDate: new Date().toISOString().slice(0, 10), 
    };

    setOrders([...orders, newOrder]);
    setCart([]);
    navigate(`/order-success/${newOrder.id}`);
  };

  return (
    <div>
      {}
    </div>
  );
}


function OrderSuccess({ orders }) {
  const { orderId } = useParams();
  const order = orders.find(order => order.id === parseInt(orderId, 10));
  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div>
      <h2>Thank you for your order!</h2>
      <p>Your order ID is: {orderId}</p>
      {}
    </div>
  );
}


export default App;