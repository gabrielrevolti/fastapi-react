const styleButton = {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '250px',
    height: '60px',
    color: 'white',
    borderRadius: '28px'
}
const Button = ({ text, disabled, func}) => {

    return (
        <div style={styleButton} disabled={disabled} onClick={func}>
            <span>{text}</span>
        </div>
    )
}

export default Button