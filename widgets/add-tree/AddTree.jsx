import React, { useEffect, useState } from 'react'
import Tag from '../../components/AddTree/Tag/Tag'
import Uploader from '../../components/AddTree/Uploader/Uploader'
import useWindowDimensions from '../../hooks/mobileResponsive'

const AddTree = () => {
  const [createObjectURL, setCreateObjectURL] = useState(null)
  const width = useWindowDimensions().width ?? 0
  const [mobile, setMobile] = useState(false)
  const [image, setImage] = useState(null)

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
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]

      setImage(i)
      setCreateObjectURL(URL.createObjectURL(i))
    }
  }
  return (
    <form className="flex flex-col rounded-3xl bg-gray-100 py-10 px-7 md:w-[600px] md:h-[600px] w-full h-fit m-3">
      <section className="flex md:flex-row flex-col">
        <div className="md:py-0 py-2">
          {createObjectURL ? (
            <div className="py-3">
              <img src={createObjectURL} className="w-full h-full" />
            </div>
          ) : (
            <Uploader uploadToClient={uploadToClient} />
          )}
        </div>
        <section className="flex flex-col w-full justify-center space-y-5 md:px-4">
          <input
            type="text"
            placeholder="Name"
            className="h-10 p-3 rounded-xl outline-none focus:outline-blue-300 shadow-md"
          />
          <input
            type="text"
            placeholder="Scientific Name"
            className="h-10 p-3 rounded-xl outline-none focus:outline-blue-300 shadow-md"
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
          />
        </div>
      </section>
      <section className='w-full flex justify-end space-x-2'>
        <button className='bg-red-300 py-1 px-4 rounded-md w-28 text-gray-800 hover:bg-red-200'>Cancel</button>
        <input type="submit" value="Submit" className="bg-green-400 py-1 px-4 rounded-md w-36 text-gray-800 hover:bg-green-300" />
      </section>
    </form>
  )
}
export default AddTree
