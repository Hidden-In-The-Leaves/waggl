/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import create from 'zustand';
import axios from 'axios';

/*
usage example
  import useUserStore from './Store'
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
*/

export const useUserStore = create((set) => ({
  // upon login / signup, (after successful insert into the users table)
  // should populate this store with data like the users database table.
  // { id: 1, firstName: 'a', lastName: 'b', email: 'fdsa' ...
  userInfo: { id: 38, firstName: 'Paul', lastName: 'Pupperino', email: 'fdsa'},
  setUserInfo: (userInfo) => set((state) => ({ userInfo })),
}));
