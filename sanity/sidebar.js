import { MdSettings } from 'react-icons/md';
import S from '@sanity/desk-tool/structure-builder';

/**
 * Custom sidebar component for the Sanity Studio
 *
 * Filters out the storeSettings document type to prevent multiple from being created
 */
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create a new subitem
      S.listItem().title('Settings').icon(MdSettings).child(
        S.editor()
          .schemaType('storeSettings')
          // make a new document ID, so we don't have a random string assigned
          .documentId('downtown')
      ),
      // add in the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
