import './index.css'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

const Counter = props => {
  const {counterValue, prevButton, forwardButton} = props

  const onDecrement = () => {
    prevButton()
  }

  const onIncrement = () => {
    forwardButton()
  }

  return (
    <div className="navigation-container">
      <button
        data-testid="pagination-left-button"
        type="button"
        onClick={onDecrement}
        className="navigation-button"
      >
        <IoIosArrowBack />
      </button>
      <p className="counter">
        <span data-testid="active-page-number">{counterValue}</span> of 4
      </p>
      <button
        data-testid="pagination-right-button"
        type="button"
        onClick={onIncrement}
        className="navigation-button"
      >
        <IoIosArrowForward />
      </button>
    </div>
  )
}

export default Counter
