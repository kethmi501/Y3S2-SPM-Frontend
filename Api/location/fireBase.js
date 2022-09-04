import { FirebaseApp } from '../../services/firebase'
import { getStorage } from 'firebase/storage'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const Storage = getStorage(FirebaseApp)

export const handleUpload = async (files, setPercent, complete) => {
  let urlArray = []
  files.forEach(async (images) => {
    const storageRef = ref(Storage, `/files/${images.name}`)
    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, images)

    await uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        // update progress
        setPercent(percent)
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          urlArray.push(url)
          if (urlArray.length === files.length) {
            complete(urlArray)
          }
        })
      }
    )
  })
  return urlArray
}
