import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import Api from '../services/APIService'

const { Meta } = Card

type SpotlightItemProps = {
  title: string
  id: string
  previewImgBase64: string
}

const IMG_WIDTH = 150
const IMG_HEIGHT = 150

const SpotlightItem: React.FC<SpotlightItemProps> = ({ title, previewImgBase64, id }) => {
  const navigate = useNavigate()

  const imgString = `data:image/png;base64,${previewImgBase64}`

  const onDetailsClick = () => {
    navigate('/details/' + id)
  }

  const handleOnClick = async () => {
    const gif = await fetch(Api.gifURL + id)

    //atob(blob.gif)
    // Check if Clipboard API is supported
    if (navigator.clipboard && (navigator.clipboard.write as any)) {
      // Use Clipboard API for Chrome

      /*
      const blob = await gif.blob()
      const data = new ClipboardItem({ 'image/png': new Blob([blob]) })
      await navigator.clipboard.write([data])
      */

      const handler = async (e: ClipboardEvent) => {
        // response to string
        const buffer = await gif.arrayBuffer()
        const decoder = new TextDecoder('utf-8')
        const str = decoder.decode(buffer)

        e.clipboardData?.setData('image/gif', str)
        //e.preventDefault()
        document.removeEventListener('copy', handler)
        console.log('Copied to clipboard successfully!', str)
      }
      document.addEventListener('copy', handler)

      document.execCommand('copy')
    } else {
      // Fallback for Firefox and other browsers
      console.log('fallback')

      // blob to base64
      const buffer = await gif.arrayBuffer()
      //console.log('fallback - buffer: ', buffer)
      //let binary = ''
      //const bytes = new Uint8Array(buffer)
      //const len = bytes.byteLength
      //for (let i = 0; i < len; i++) {
      //  binary += String.fromCharCode(bytes[i])
      //}
      //console.log('fallback - str: ', binary)
      //const base64String = btoa(binary)
      //const dataURL = `data:image/gif;base64,${base64String}`
      //const textArea = document.createElement('textarea')
      //textArea.value = dataURL
      //document.body.appendChild(textArea)
      //console.log('fallback - created child')
      //textArea.select()
      //document.execCommand('copy')
      //document.body.removeChild(textArea)
      //console.log('Copied to clipboard successfully (fallback)!')

      const bytes = new Uint8Array(buffer)
      const blob = new Blob([bytes], { type: 'image/jpeg' })
      const img = URL.createObjectURL(blob)

      navigator.clipboard.writeText(img)
      console.log('Copied to clipboard successfully (fallback)!')
    }
  }

  return (
    <Card hoverable style={{ width: 240 }} cover={<img src={imgString} alt="" onClick={() => onDetailsClick()} />}>
      <Meta title={title} />
    </Card>
  )
}

export default SpotlightItem
