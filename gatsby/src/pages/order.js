import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import useOrder from '../utils/useOrder';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import PizzaOrder from '../components/PizzaOrder';
import calcPizzaPrice from '../utils/calcPizzaPrice';
import MenuItemStyles from '../styles/MenuItemStyles';
import calcOrderTotal from '../utils/calcOrderTotal';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = useOrder({
    pizzas,
    values,
  });
  if (message) {
    return (
      <div className="center">
        <h2>{message}</h2>
        <p>Please check your email for confirmation.</p>
      </div>
    );
  }
  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={updateValue}
          />
          <input
            type="text"
            name="mapleSyrup"
            className="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <h2>{pizza.name}</h2>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} - {formatMoney(calcPizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Your Order</legend>
          <PizzaOrder
            order={order}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>Your total is {formatMoney(calcOrderTotal(order, pizzas))}</h3>
          <div>{error ? <p>{error}</p> : ''}</div>
          <button type="submit">
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        price
        image {
          asset {
            fluid(maxWidth: 100, maxHeight: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
