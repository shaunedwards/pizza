import React from 'react';
import Img from 'gatsby-image';

import formatMoney from '../utils/formatMoney';
import calcPizzaPrice from '../utils/calcPizzaPrice';
import MenuItemStyles from '../styles/MenuItemStyles';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  if (!order.length) {
    return <p>Your order is empty...</p>;
  }
  return (
    <>
      {order.map((item, index) => {
        const pizza = pizzas.find((p) => p.id === item.id);
        return (
          <MenuItemStyles key={`${item.id}-${index}`}>
            <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
            <h2>{pizza.name}</h2>
            <p>
              {`${item.size} - ${formatMoney(
                calcPizzaPrice(pizza.price, item.size)
              )}`}
            </p>
            <button
              type="button"
              className="remove"
              onClick={() => removeFromOrder(index)}
              title={`Remove ${item.size} ${pizza.name} from Order`}
            >
              &times;
            </button>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
