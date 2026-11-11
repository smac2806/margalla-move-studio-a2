import { useState } from 'react'

// Falls back to a plain labelled block when the image is missing or fails to load.
function ClassImage({ src, alt, type }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="image-fallback" aria-hidden="true">
        {type}
      </div>
    )
  }

  return <img src={import.meta.env.BASE_URL + src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
}

export default ClassImage
