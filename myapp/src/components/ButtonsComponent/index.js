import './index.css'

const ButtonsComponent = props => {
  const {details, clickButton, isActive} = props
  const {optionId, displayText} = details

  const tabBtnClassName = isActive ? 'buttons active' : 'buttons'

  const onClickButton = () => {
    clickButton(optionId)
  }

  return (
    <li className="list-class">
      <button onClick={onClickButton} className={tabBtnClassName} type="button">
        {displayText}
      </button>
    </li>
  )
}

export default ButtonsComponent
