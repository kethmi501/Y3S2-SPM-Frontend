import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getOneUpdate } from '../Api/tree'
import { FirebaseApp } from '../services/firebase'
import { getStorage } from 'firebase/storage'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Loader, Progress } from '@mantine/core'
import { updatePost } from '../Api/tree'
import { toast } from 'react-toastify'

const UpdateTree = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [percent, setPercent] = useState()
  const Storage = getStorage(FirebaseApp)

  const [name, setName] = useState('')
  const [scientificName, setScientificName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [image, setImage] = useState([])
  const [file, setFile] = useState([])

  const router = useRouter()
  const { postId } = router.query

  useEffect(() => {
    async function getOneTree() {
      let response = await getOneUpdate(postId)
      setLoading(false)
      setData(response)
    }
    getOneTree()
  }, [postId])

  useEffect(() => {
    if (data) {
      setName(data.name)
      setScientificName(data.scientificname)
      const newTag = data.tags.map((tag, idx) => {
        return {
          id: idx,
          name: tag,
        }
      })

      setTags(newTag)
      setDescription(data.description)
      const newUrl = data.image.map((url, idx) => {
        return {
          id: idx,
          url: url,
        }
      })
      setImage(newUrl)
    }
  }, [data])

  useEffect(() => {
    console.log(image)
  }, [image])

  const removeTag = (id) => {
    const newNewTag = tags.filter((tag) => tag.id !== id)
    setTags(newNewTag)
  }
  const removeImage = (id) => {
    const newUrl = image.filter((url) => url.id !== id)
    setImage(newUrl)
  }

  const tagsFunction = (key, value) => {
    if (key === 'Enter') {
      setTags([
        ...tags,
        {
          id: tags.length + 1,
          name: value,
        },
      ])
    }
  }

  const setImageUrls = (arr) => {
    const newUrl = arr.map((url, idx) => {
      return {
        id: image.length + idx,
        url: url,
      }
    })
    setImage([...image, ...newUrl])
  }

  const setFileArray = (event) => {
    setLoading(true)
    if (event.target.files && event.target.files[0]) {
      const newFiles = []
      let count = 0
      for (let j = 0; j < event.target.files.length; j++) {
        newFiles.push(event.target.files[j])
      }
      setFile(newFiles)
      let urlArray = []
      newFiles.forEach(async (images) => {
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
              count = count + 1
              urlArray.push(url)
              if (count === newFiles.length) {
                setLoading(false)
                setImageUrls(urlArray)
              }
            })
          }
        )
      })
    }
  }

  const submitUpdate = async () => {
    setLoading(true)
    const onlyTags = tags.map((tag) => {
      return tag.name
    })
    const onlyUrls = image.map((url) => {
      return url.url
    })

    async function updateTree() {
      const result = await updatePost(
        postId,
        name,
        onlyUrls,
        onlyTags,
        scientificName,
        description
      )
      setLoading(false)
      toast.success('Successfuly Updated')
      router.push('/trees/view-my-posts')
    }
    updateTree()
  }

  return (
    <div className="p-10 relative">
      {loading && (
        <div className="absolute h-full w-full flex items-center justify-center bg-white/70">
          <Loader color="orange" size="xl" variant="bars" />
        </div>
      )}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Name
        </label>
        <input
          type="text"
          className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Scientific Name
        </label>
        <input
          type="text"
          className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
          value={scientificName}
          onChange={(e) => {
            setScientificName(e.target.value)
          }}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Tags
        </label>
        <div className="flex space-x-3 w-fit px-1 pb-3">
          {tags &&
            tags.map((element, idx) => (
              <div
                className="hover:text-red-400 cursor-pointer bg-blue-300 px-3 rounded-md flex items-center py-1 text-blue-900"
                key={idx}
                onClick={() => {
                  removeTag(element.id)
                }}
              >
                {element.name}
              </div>
            ))}
        </div>
        <input
          type="text"
          className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
          onKeyDown={(e) => {
            tagsFunction(e.code, e.target.value)
          }}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Description
        </label>
        <input
          type="text"
          className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />
      </div>
      <div className="flex py-4 space-x-3 w-full overflow-auto">
        {image &&
          image.map((url) => (
            <img
              key={url.id}
              className="object-none object-center border border-4 rounded-lg  hover:border-red-700 w-40 h-40 cursor-pointer"
              src={url.url}
              onClick={() => {
                removeImage(url.id)
              }}
            />
          ))}
      </div>
      <div>
        <div>
          {loading && (
            <Progress color="grape" value={percent} striped animate />
          )}
          <input
            id="dropzone-file"
            type="file"
            className="py-2"
            multiple={true}
            onChange={(e) => {
              setFileArray(e)
            }}
          />
        </div>
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            submitUpdate()
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default UpdateTree
