import { IListNoteItem, ListNoteTile } from '@/app/features/ListNote/types';
import { ISingleNoteItem } from '@/app/features/SingleNote/types';

export const TEXT_INPUT_LIMIT = 100;
export const TEXT_AREA_LIMIT = 500;
export const LIST_ITEMS_LIMIT = 30;
export const DEFAULT_LIST_TITLE = 'Default title';
export const DEFAULT_LIST_ITEM: IListNoteItem = { id: 0, title: '', serializedObject: '' }
export const DEFAULT_SINGLE_ITEM: ISingleNoteItem = { id: 0, term: '', explanation: '' }
export const DEFAULT_LIST_ITEM_TITLE: ListNoteTile = { id: 0, title: '' }
export const MODAL_WINDOW_CONTAINER_ID = 'modal-window-container';

export const TEMP_USER_ID = 2;