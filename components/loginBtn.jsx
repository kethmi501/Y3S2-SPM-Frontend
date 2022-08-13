import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FirebaseApp } from '../services/firebase'
import { authUser } from '../Api/auth'
import { toast } from 'react-toastify'


const LoginBtn = () => {

  const auth = getAuth(FirebaseApp)
  const provider = new GoogleAuthProvider()

  const handleLoginBtnClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user

        authUser(user.displayName, user.email, user.photoURL)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })

      }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)

      toast.error(errorMessage)
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
