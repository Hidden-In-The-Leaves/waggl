/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import create from 'zustand';
import axios from 'axios';

export const useSearchStore = create((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set((state) => ({ searchTerm: term })),
}));

export const usePackStore = create((set, get) => ({
  allPacks: [], // all packs including ones that user is joined
  userPacks: [], // all packs that the user has joined
  allPacksFiltered: [], // filtered "others" upon search
  userPacksFiltered: [], // filtered "my packs" upon search
  resetPack: async (userid) => {
    try {
      const config = {
        method: 'GET',
        url: '/api/packs',
        params: { user_id: userid },
      };
      const response = await axios(config);
      const all = response.data.filter((el) => el.joined === 'false');
      const user = response.data.filter((el) => el.joined === 'true');

      set((state) => ({
        allPacks: all,
        allPacksFiltered: all,
        userPacks: user,
        userPacksFiltered: user,
      }));
    } catch (e) {
      console.log('error getting packs', e);
    }
  },
  filter: (term) => {
    // const regex = new RegExp(`${term}`, 'gi');
    const filteredAll = get()
      .allPacks
      .filter((el) => el.name.toLowerCase().includes(term)
      || el.description?.toLowerCase().includes(term));

    const filteredUser = get()
      .userPacks
      .filter((el) => el.name.toLowerCase().includes(term)
      || el.description?.toLowerCase().includes(term));

    set((state) => ({ allPacksFiltered: filteredAll, userPacksFiltered: filteredUser }));
  },
}));

export const usePostsStore = create((set) => ({
  posts: [],
  getPosts: async (userid) => {
    const config = {
      method: 'GET',
      url: '/api/packs/posts',
      params: { user_id: userid },
    };
    try {
      const response = await axios(config);
      set((state) => ({ posts: response.data }));
    } catch (e) {
      console.log('error getting posts', e);
    }
  },
}));

export const useEventsStore = create((set) => ({
  events: [],
  getEvents: async (userid) => {
    const config = {
      method: 'GET',
      url: '/api/events',
      params: { user_id: userid },
    };
    try {
      const response = await axios(config);
      set((state) => ({ events: response.data }));
    } catch (e) {
      console.log('error getting events', e);
    }
  },
}));