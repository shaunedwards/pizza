import { useState, useContext } from 'react';

import formatMoney from './formatMoney';
import calcOrderTotal from './calcOrderTotal';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';

export default function useOrder({ pizzas, values }) {
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function addToOrder(pizza) {
    setOrder([...order, pizza]);
  }

  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calcOrderTotal(order, pizzas)),
      name: values.name.trim(),
      email: values.email.trim(),
      mapleSyrup: values.mapleSyrup,
    };
    const response = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError(data.message);
    } else {
      setLoading(false);
      setMessage(data.message);
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
