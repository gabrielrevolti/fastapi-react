import React from 'react'

const styleFooter = {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100px',
    position: 'fixed',
    bottom: '0',
    left: '0',
    zIndex: '1000',
}

const Footer = () => {

  return (
    <div style={styleFooter}>
        <p>Todos direitos reservados Mactek ©{new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer 