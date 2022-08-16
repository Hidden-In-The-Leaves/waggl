// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Google sign in ', result._tokenResponse);
      /**
       *{_tokenResponse:
        {
          email: string
          firstName: string
          lastName: string
          photoUrl:string
        }
      }
      */
    }).catch((error) => {
      console.log(error);
    });
};

// export default auth;
export default signInWithGoogle;
