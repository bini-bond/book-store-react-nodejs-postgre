import { atom } from 'recoil';

export const listBooksAtom = atom({
  key: 'booksListState',
  default: [],
});

export const bookOrdersAtom = atom({
  key: 'bookOrdersState',
  default: [],
});
