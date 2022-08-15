import create from 'zustand';
import axios from 'axios';

//temp for dev
const userid = 1;

export const useSearchStore = create((set, get) => ({
  searchTerm: '',
  setSearchTerm: (term) => set((state) => ({ searchTerm: term })),
}))

export const usePackStore = create((set, get) => ({
  allPacks: [], // all packs including ones that user is joined
  userPacks: [], // all packs that the user has joined
  allPacksFiltered: [], // filtered "others" upon search
  userPacksFiltered: [], //filtered "my packs" upon search
  resetPack: async (userId) => {
    try {
      const response = await axios.get(`/api/packs/user/${userid}`);

      const all = response.data.filter((el) => el.joined === 'false');
      const user = response.data.filter((el) => el.joined === 'true');
      set((state) => ({
        allPacks: all,
        allPacksFiltered: all,
        userPacks: user,
        userPacksFiltered: user,
      }))
    } catch (e) {
      console.log('error getting packs', e);
    }
  },
  filter: (term) => {
    const regex = new RegExp(`${term}`, 'g');
    const filteredAll = get()
      .allPacks
      .filter((el) => regex.test(el.name) || regex.test(el.description));

    const filteredUser = get()
      .userPacks
      .filter((el) => regex.test(el.name) || regex.test(el.description));

    set((state) => ({ allPacksFiltered: filteredAll, userPacksFiltered: filteredUser }));

  }
}));