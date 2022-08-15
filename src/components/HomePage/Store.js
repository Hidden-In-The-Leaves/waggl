import create from 'zustand';

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
      // const response = await axios.get('/packs/:userId');

      // temp until serverside dev
      const response = { data: samplePackData };
      console.log(response.data)
      const all = response.data.filter((el) => !el.joined);
      const user = response.data.filter((el) => el.joined);
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

const samplePackData = [
  {
    id: 1,
    name: 'Pug Lovers',
    description: 'If you are a #pug lover then plz do support and join with us🥰🥰 support and enjoy our group',
    photo: 'https://images.unsplash.com/photo-1523626797181-8c5ae80d40c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    joined: 'true',
  },
  {
    id: 2,
    name: 'Dogs Are Family',
    description: 'Welcome to coolest group of dog lovers on Facebook! Everyone is encouraged to share pictures and videos or ask for tips and advice from your fellow dog loving community members! ',
    photo: 'https://images.unsplash.com/photo-1529472119196-cb724127a98e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=672&q=80',
    joined: 'true',
  },
  {
    id: 1,
    name: 'Pug Lovers',
    description: 'If you are a #pug lover then plz do support and join with us🥰🥰 support and enjoy our group',
    photo: 'https://images.unsplash.com/photo-1523626797181-8c5ae80d40c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    joined: false,
  },
  {
    id: 2,
    name: 'Dogs Are Family',
    description: 'Welcome to coolest group of dog lovers on Facebook! Everyone is encouraged to share pictures and videos or ask for tips and advice from your fellow dog loving community members! ',
    photo: 'https://images.unsplash.com/photo-1529472119196-cb724127a98e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=672&q=80',
    joined: false,
  }
]