import {Component} from 'react'
import './index.css'
import {BiRupee} from 'react-icons/bi'
import {AiOutlineStar} from 'react-icons/ai'

class MenuItem extends Component {
  addButton = () => {
    const {menuList, addButtonClick} = this.props
    const {id, imageUrl, name, cost} = menuList
    addButtonClick(id)

    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const existingCartItem = cartData.find(item => item.id === id)

    if (existingCartItem) {
      // If the item already exists, update its quantity
      existingCartItem.quantity += 1
    } else {
      // If the item does not exist, add it to the cart
      cartData.push({id, imageUrl, name, cost, quantity: 1})
    }

    localStorage.setItem('cartData', JSON.stringify(cartData))
  }

  render() {
    const {menuList, check} = this.props
    const {cost, imageUrl, name, rating} = menuList

    return (
      <div className="menuitems-container">
        <img className="menu-image" src={imageUrl} alt={name} />
        <div>
          <h1 className="menu-item-name">{name}</h1>
          <p className="custom-cost">
            <BiRupee />
            {cost}
          </p>
          <p className="custom-rating">
            <AiOutlineStar className="star" />
            {rating}
          </p>
          (
          {check ? (
            <div className="add-remove-button-container">
              <button type="button" className="custom-button">
                +
              </button>
              <p>1</p>
              <button type="button" className="custom-button">
                -
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="add-button"
              onClick={this.addButton}
            >
              ADD
            </button>
          )}
        </div>
      </div>
    )
  }
}
export default MenuItem
