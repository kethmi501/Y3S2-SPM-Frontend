import React, { useEffect } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FirebaseApp } from '../services/firebase'
import { authUser, checkUser } from '../Api/auth'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../store/auth/authSlice'

import { FcGoogle } from 'react-icons/fc'
import { useLocalStorage } from '@mantine/hooks'

const LoginBtn = () => {
  const [localStorageToken, setLocalStorageToken] = useLocalStorage({
    key: 'token',
    defaultValue: null,
    serialize: (value) => {
      /* return value serialized to string */
      if (value) {
        return value.toString()
      }
    },
    deserialize(value) {
      if (value) {
        /* return value deserialized from string */
        return value.toString()
      }
    }
  })

  const auth = getAuth(FirebaseApp)
  const provider = new GoogleAuthProvider()

  const user = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorageToken) {
      // TODO check is token valids
    }

  }, [])


  const handleLoginBtnClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        return result.user

      })
      .then((user) => {
        authUser(user.displayName, user.email, user.photoURL)
          .then(res => {
            dispatch(login(res))
            setLocalStorageToken(res.token)

            toast.success('Login successful')
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch((error) => {
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


  const testFunc = () => {
    checkUser()
  }

  return (
    <div>
      <button
        className={`login-btn ${user.isAuthenticated ? 'hide' : ''}`}
        onClick={handleLoginBtnClick}>
        <FcGoogle />
        Login with Google
      </button>
      <button onClick={testFunc}>
        TEST
      </button>
    </div>
  )
}

export default LoginBtn
