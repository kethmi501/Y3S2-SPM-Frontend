import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FirebaseApp } from '../services/firebase'


const LoginBtn = () => {

  const auth = getAuth(FirebaseApp)
  const provider = new GoogleAuthProvider()

  const handleLoginBtnClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        // ...

        console.log(user.displayName);
        console.log(user.email);

      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
  }

  return (
    <button onClick={handleLoginBtnClick}>
      Login with Google
    </button>
  )
}

export default LoginBtn
