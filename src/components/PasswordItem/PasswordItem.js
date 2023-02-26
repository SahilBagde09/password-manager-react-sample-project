import './PasswordItem.css'

const PasswordItem = props => {
  const {passDetails, showPassword, onDeletePass} = props
  const {webName, userName, password, randomClass, passId} = passDetails

  const onClickDeletePass = () => {
    onDeletePass(passId)
  }

  return (
    <li className="passItem">
      <div className="pass-initial-and-details-container">
        <div className={`${randomClass} initial-letter-container`}>
          <p className="name-initial">{userName.slice(0, 1).toUpperCase()}</p>
        </div>
        <div className="pass-details-container">
          <p className="web-name">{webName}</p>
          <p className="user-name">{userName}</p>
          {showPassword ? (
            <p className="password">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="pass-image"
            />
          )}
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onClickDeletePass}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-logo"
        />
      </button>
    </li>
  )
}

export default PasswordItem
