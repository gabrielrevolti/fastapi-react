const styleButton = {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '13.78125rem',   
    height: '3.28125rem',     
    color: 'white',
    borderRadius: '1.53125rem', 
    cursor: 'pointer'
  };

  
const Button = ({ text, disabled, func}) => {

    return (
        <div style={styleButton} disabled={disabled} onClick={func}>
            <span style={{fontSize: 'var(--font-md)'}}>{text}</span>
        </div>
    )
}

export default Button