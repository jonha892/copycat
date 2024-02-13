import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import Api, { fetcher } from '../services/APIService'

const Detail: React.FC = () => {
  let { id } = useParams()

  const { data, error, isLoading, isValidating } = useSWR<BlobItem>(Api.blobURL + id, fetcher)

  const imgRef = useRef<HTMLImageElement>(null)

  const handleClick = async () => {
    // Fallback for Firefox and other browsers
    console.log('fallback')

    // blob to base64
    //const bytes = new Uint8Array(buffer)
    //const len = bytes.byteLength
    //for (let i = 0; i < len; i++) {
    //  binary += String.fromCharCode(bytes[i])
    //}
    //console.log('fallback - str: ', binary)
    //const base64String = btoa(binary)
    //const dataURL = `data:image/gif;base64,${data?.gif}`
    //const textArea = document.createElement('textarea')
    //textArea.value = dataURL
    //document.body.appendChild(textArea)
    //console.log('fallback - created child')
    //textArea.select()

    if (navigator.clipboard && (navigator.clipboard.write as any)) {
      // Create an Image element
      const img = new Image()

      img.onload = function () {
        // Create a canvas element
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height

        // Draw the image onto the canvas
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)

        // Convert canvas content to data URL (PNG format)
        const dataUrl = canvas.toDataURL('image/png')

        // Copy the Data URL to the clipboard
        navigator.clipboard
          .write([
            new ClipboardItem({
              'image/png': canvas.toBlob(), // The actual content is still GIF
              'text/plain': new Blob([dataUrl], { type: 'text/plain' }), // Faked as PNG
            }),
          ])
          .then(() => {
            console.log('Image copied to clipboard successfully')
          })
          .catch((err) => {
            console.error('Failed to copy image to clipboard:', err)
          })
      }
      return
    }

    if (imgRef.current) {
      imgRef.current.focus()
      document.execCommand('copy')
      //document.body.removeChild(textArea)
      console.log('Copied to clipboard successfully (fallback)!')
    }
  }

  return (
    <>
      {data && <img ref={imgRef} src={`data:image/png;base64,${data.gif}`} alt="" onClick={() => handleClick()} />}

      <p>Id: {data?.id}</p>
      <p>Title: {data?.title}</p>
      {data?.tags?.map((tag) => (
        <p key={tag}>Tag: {tag}</p>
      ))}
    </>
  )
}

export default Detail
