import { FaPepperHot } from 'react-icons/fa';

export default {
  name: 'topping',
  title: 'Toppings',
  type: 'document',
  icon: FaPepperHot,
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'Name of the topping',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Is the topping suitable for vegetarians?',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      isVegetarian: 'vegetarian',
    },
    prepare: ({ name, isVegetarian }) => ({
      title: `${name} ${isVegetarian ? '🌱' : ''}`,
    }),
  },
};
