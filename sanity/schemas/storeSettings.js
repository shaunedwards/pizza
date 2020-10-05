import { MdStore } from 'react-icons/md';

export default {
  name: 'storeSettings',
  title: 'Settings',
  type: 'document',
  icon: MdStore,
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Name of the store',
    },
    {
      name: 'activeSlicemasters',
      title: 'Active Slicemasters',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
