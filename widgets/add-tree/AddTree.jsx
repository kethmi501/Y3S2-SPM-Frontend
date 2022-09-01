import React, { useEffect, useState } from 'react'
import Tag from '../../components/AddTree/Tag/Tag'
import Uploader from '../../components/AddTree/Uploader/Uploader'
import useWindowDimensions from '../../hooks/mobileResponsive'
import { FirebaseApp } from '../../services/firebase'
import { getStorage } from 'firebase/storage'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Progress, Loader } from '@mantine/core'
import { addTree } from '../../Api/tree'
import { toast } from 'react-toastify'

const AddTree = () => {
  const [complete, setComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [scientificname, setScientificname] = useState('')
  const [description, setDescription] = useState('')
  const [createObjectURL, setCreateObjectURL] = useState(null)
  const width = useWindowDimensions().width ?? 0
  const [mobile, setMobile] = useState(false)
  const [image, setImage] = useState(null)
  const [file, setFile] = useState()
  const [url, setUrl] = useState([])
  const Storage = getStorage(FirebaseApp)
  // progress
  const [percent, setPercent] = useState(0)
  let urlArray = []

  useEffect(() => {
    setMobile(width < 768)
  }, [width])

  const [tags, setTags] = useState([])
  const addTags = (tag) => {
    setTags((prevState) => [...prevState, tag])
  }

  const tagsFunction = (key, value) => {
    if (key === 'Enter') {
      addTags(value)
    }
  }
  const setFiles = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      setImage(i)
      setCreateObjectURL(URL.createObjectURL(i))

      const newFiles = []
      for (let j = 0; j < event.target.files.length; j++) {
        newFiles.push(event.target.files[j])
      }
      setFile(newFiles)
    }
  }

  const handleUpload = async (event) => {
    setLoading(true)
    event.preventDefault()
    if (!file) {
      toast('Please Select a File')
    }

    file.forEach(async (images) => {
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
            if (file?.length === urlArray.length) {
              setComplete(!complete)
              setUrl(urlArray)
            }
          })
        }
      )
    })
  }
  const saveToDatabase = async () => {
    const postResponse = await addTree(
      name,
      url,
      tags,
      scientificname,
      description
    )
    if (postResponse.status === 200) {
      setLoading(false)
      toast.success('Successfuly ceated')
    } else {
      setLoading(false)
      toast.error(postResponse.message)
    }
    setName('')
    setTags([])
    setDescription('')
    setImage(null)
    setFile(null)
    setScientificname('')
  }
  useEffect(() => {
    if (url?.length) {
      saveToDatabase()
    }
  }, [url])

  return (
    <div className="relative">
      {loading && (
        <div className="absolute h-full w-full flex items-center justify-center bg-white/70">
          <Loader color="orange" size="xl" variant="bars" />
        </div>
      )}
      <form
        className="flex flex-col rounded-3xl bg-gray-100 py-10 px-7 md:w-[600px] md:h-[600px] w-full h-fit m-3"
        onSubmit={handleUpload}
      >
        <section className="flex md:flex-row flex-col">
          <div className="md:py-0 py-2">
          {file && <div>Files selected : {file?.length}</div>}
            {createObjectURL ? (
              <div className="py-3 w-full h-52 space-y-3">
                <img src={createObjectURL} className="w-full h-full" />
                {loading && (
                  <Progress color="grape" value={percent} striped animate />
                )}
              </div>
            ) : (
              <Uploader setFiles={setFiles} />
            )}
          </div>
          <section className="flex flex-col w-full justify-center space-y-5 md:px-4">
            <input
              type="text"
              placeholder="Name"
              className="h-10 p-3 rounded-xl outline-none focus:outline-blue-300 shadow-md"
              onChange={(e) => {
                setName(e.target.value)
              }}
              value={name}
            />
            <input
              type="text"
              placeholder="Scientific Name"
              className="h-10 p-3 rounded-xl outline-none focus:outline-blue-300 shadow-md"
              onChange={(e) => {
                setScientificname(e.target.value)
              }}
              value={scientificname}
            />
            <section className="flex space-x-3">
              {tags.map((tags) => (
                <Tag key={tags} tag={tags} />
              ))}
              <input
                type="text"
                placeholder="Add Tags"
                className="h-10 p-3 rounded-xl outline-none focus:outline-blue-300 shadow-md"
                onKeyDown={(e) => {
                  tagsFunction(e.code, e.target.value)
                }}
              />
            </section>
          </section>
        </section>
        <section className="py-8">
          <div className=" outline-none focus:outline-blue-300 rounded-3xl overflow-hidden p-3 bg-white">
            <textarea
              type="text"
              className="outline-none w-full"
              rows={mobile ? 2 : 6}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              value={description}
              required
            />
          </div>
        </section>
        <section className="w-full flex justify-end space-x-2">
          <button className="bg-red-300 py-1 px-4 rounded-md w-28 text-gray-800 hover:bg-red-200">
            Cancel
          </button>
          <input
            type="submit"
            value="Submit"
            className="bg-green-400 py-1 px-4 rounded-md w-36 text-gray-800 hover:bg-green-300"
          />
        </section>
      </form>
    </div>
  )
}
export default AddTree
