type SpotlightItemProps = {
  title: string
  previewImgBase64: string
}

const SpotlightItem: React.FC<SpotlightItemProps> = ({ title, previewImgBase64 }) => {
  const imgString = `data:image/png;base64,${previewImgBase64}`

  return (
    <div>
      <img src={imgString} alt="" />
      <p>{title}</p>
    </div>
  )
}

export default SpotlightItem
