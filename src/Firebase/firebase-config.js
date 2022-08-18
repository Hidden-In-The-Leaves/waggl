// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import axios from 'axios';

// import useUserStore from '../UserStore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV0H3GLYarzZEhiZ-Dwoyda5Fu5d4x0E0",
  authDomain: "blue-ocean-199d5.firebaseapp.com",
  projectId: "blue-ocean-199d5",
  storageBucket: "blue-ocean-199d5.appspot.com",
  messagingSenderId: "702944091231",
  appId: "1:702944091231:web:1d6ad8570ca075cd12cfea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

//use zustand to set user-id

export const signInWithGoogle = () => {
  // const setUserId = useUserStore((state) => state.setUserId);
  signInWithPopup(auth, provider)
    .then((googleUser) => {
      console.log('Google sign in ', googleUser._tokenResponse);
      const { email } = googleUser._tokenResponse;
      const config = {
        method: 'GET',
        url: '/api/user/login',
        params: { email },
      };
      return axios(config);
      /**
       *{_tokenResponse:
        {
          email: string
          firstName: string
          lastName: string
          photoUrl:string
          displayName:string
          fullName: string
        }
      }
      */
    })
    .then(response => {
      console.log('google login ', response.data);
      // setUserId(response.data[0].id);
    })
    .catch((error) => {
      console.log('Unable to sign in with Google ', error);
    });
  // return signInWithPopup(auth, provider);
};

// export default auth;
