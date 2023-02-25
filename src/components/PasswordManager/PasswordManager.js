import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import PasswordItem from '../PasswordItem/PasswordItem'
import './PasswordManager.css'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    showPassword: false,
    searchPasswordInput: '',
    webName: '',
    userName: '',
    password: '',
  }

  onSubmitDetails = event => {
    event.preventDefault()
    const {webName, userName, password} = this.state
    const classList = [
      'purple',
      'yellow',
      'green',
      'orange',
      'till',
      'red',
      'blue',
    ]
    const randomClass =
      classList[Math.ceil(Math.random() * (classList.length - 1))]
    const newPassDetails = {
      webName,
      userName,
      password,
      randomClass,
      passId: uuidV4(),
    }
    // console.log(newPassDetails)
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassDetails],
      webName: '',
      userName: '',
      password: '',
    }))
  }

  onChangeWebName = event => {
    // console.log(event.target.value)
    this.setState({webName: event.target.value})
  }

  onChangeUserName = event => {
    // console.log(event.target.value)
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    // console.log(event.target.value)
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchPasswordInput: event.target.value})
  }

  onShowPasswords = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onDeletePass = passId => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(
        eachPass => eachPass.passId !== passId,
      ),
    }))
  }

  render() {
    const {
      passwordList,
      webName,
      userName,
      password,
      searchPasswordInput,
      showPassword,
    } = this.state
    console.log(passwordList)
    const filteredListIncludingSearchInput = passwordList.filter(eachPass =>
      eachPass.webName.toLowerCase().includes(searchPasswordInput),
    )
    let toDisplay
    if (filteredListIncludingSearchInput.length === 0) {
      toDisplay = (
        <div className="no-password-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-show-img"
          />
          <p className="no-password">No Passwords</p>
        </div>
      )
    } else {
      toDisplay = (
        <ul className="pass-list-container">
          {filteredListIncludingSearchInput.map(eachPass => (
            <PasswordItem
              passDetails={eachPass}
              showPassword={showPassword}
              onDeletePass={this.onDeletePass}
              key={eachPass.passId}
            />
          ))}
        </ul>
      )
    }
    return (
      <div className="main-bg-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="password-input-container">
          <form onSubmit={this.onSubmitDetails} className="form-container">
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-containers">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-container-image"
              />
              <input
                type="text"
                onChange={this.onChangeWebName}
                value={webName}
                className="input-element"
                placeholder="Enter Website"
              />
            </div>
            <div className="input-containers">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-container-image"
              />
              <input
                type="text"
                onChange={this.onChangeUserName}
                value={userName}
                className="input-element"
                placeholder="Enter Username"
              />
            </div>
            <div className="input-containers">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-container-image"
              />
              <input
                type="password"
                onChange={this.onChangePassword}
                value={password}
                className="input-element"
                placeholder="Enter Password"
              />
            </div>
            <button className="submit-button" type="submit">
              Add
            </button>
          </form>
          <div className="password-container-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="lg-password-img"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="sm-password-img"
            />
          </div>
        </div>

        <div className="password-display-container">
          <div className="search-pass-count-container">
            <div className="pass-count">
              <h1 className="passwords">Your Passwords</h1>
              <p className="count">{passwordList.length}</p>
            </div>
            <div className="search-input-containers">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-input-container-image"
              />
              <input
                type="search"
                onChange={this.onChangeSearchInput}
                className="search-element"
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="horizontal-rule" />
          <div className="checkbox-input-containers">
            <input
              type="checkbox"
              onChange={this.onShowPasswords}
              className="checkbox-element"
              id="checkbox"
            />
            <label htmlFor="checkbox" className="show-pass">
              Show passwords
            </label>
          </div>
          {toDisplay}
        </div>
      </div>
    )
  }
}

export default PasswordManager
