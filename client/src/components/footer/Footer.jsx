import React from 'react'

const styleFooter = {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '8vh',
}

const Footer = () => {

  return (
    <div style={styleFooter}>
        <p style={{fontSize: 'var(--font-md)'}}>Todos direitos reservados Mactek ©{new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer 