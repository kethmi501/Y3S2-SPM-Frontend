import React from 'react'
import { TiExport } from 'react-icons/ti'
import { jsPDF, HTMLOptionImage } from 'jspdf'
import { toPng, toCanvas } from 'html-to-image'

const GenerateButton = ({ html }) => {

  const generateReport = () => {
    const doc = new jsPDF()

    let split = doc.splitTextToSize(document.getElementById('report').innerText, 200)
    let image = document.getElementById('animalImage').getAttribute('src')
    doc.text(document.querySelector('.content > h1').innerHTML, 75, 5)
    doc.addImage(image, 70, 7, 60, 60)
    doc.text(split, 5, 75)
    doc.output('dataurlnewwindow')
  }

  const generateImage = async () => {
    const image = await toPng(html.current, { quality: 0.95 })
    const doc = new jsPDF()

    doc.addImage(image, 'JPEG', 5, 22, 200, 300)
    doc.save()
  }


  return (
    <button
      onClick={generateImage}
      type='button'
      className='inline-flex gap-2 items-center px-4 py-2 bg-blue-400 hover:bg-blue-300 border border-blue-400 font-semibold text-gray-800 capitalize rounded-lg shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-blue-400'>
      <TiExport className='text-gray-800' />
      Export Report
    </button>
  )
}

export default GenerateButton