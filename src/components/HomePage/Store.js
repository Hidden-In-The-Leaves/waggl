/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import create from 'zustand';
import axios from 'axios';

export const useSearchStore = create((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set((state) => ({ searchTerm: term })),
}));

export const usePackStore = create((set, get) => ({
  otherPacks: [], // other packs
  joinedPacks: [], // joined packs
  otherPacksFiltered: [],
  joinedPacksFiltered: [],
  resetPack: async (userid) => {
    if (userid !== undefined) {
      try {
        const config = {
          method: 'GET',
          url: '/api/packs/joined',
          params: { user_id: userid },
        };
        const response = await axios(config);
        set((state) => ({ joinedPacks: response.data, joinedPacksFiltered: response.data }));

        const config2 = {
          method: 'GET',
          url: '/api/packs/others',
          params: { user_id: userid },
        }

        const response2 = await axios(config2);
        set((state) => ({ otherPacks: response2.data, otherPacksFiltered: response2.data }));

      } catch (e) {
        console.log('error getting packs', e);
      }
    }
  },
  filter: (term) => {
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