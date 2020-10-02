import calcPizzaPrice from './calcPizzaPrice';

export default function calcOrderTotal(order, pizzas) {
  return order.reduce((total, item) => {
    const pizza = pizzas.find((p) => p.id === item.id);
    return total + calcPizzaPrice(pizza.price, item.size);
  }, 0);
}
