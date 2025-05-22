import React from 'react'

const Field = ({title, description}) => {
  return (
    <>
      <p><strong>{title}:</strong> {description ? description : '-----'}</p>
    </>
  )
}

export default Field