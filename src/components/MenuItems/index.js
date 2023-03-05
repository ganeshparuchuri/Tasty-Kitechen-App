import {Component} from 'react'
import './index.css'
import {BiRupee} from 'react-icons/bi'
import {AiOutlineStar} from 'react-icons/ai'

class MenuItem extends Component {
  state = {
    quantity: 0, // initial quantity is 0
  }

  addButton = () => {
    const {quantity} = this.state
    const {menuList, addButtonClick} = this.props
    const {id, imageUrl, name, cost} = menuList
    addButtonClick(id)

    let cartData = []
    try {
      cartData = JSON.parse(localStorage.getItem('cartData')) || []
    } catch (error) {
      console.error('Error parsing cart data:', error)
    }

    const existingCartItem = cartData.find(item => item.id === id)

    if (existingCartItem) {
      // If the item already exists, update its quantity
      existingCartItem.quantity += 1
      existingCartItem.cost =
        (existingCartItem.cost / (existingCartItem.quantity - 1)) *
        existingCartItem.quantity
    } else {
      // If the item does not exist, add it to the cart
      cartData.push({
        id,
        imageUrl,
        name,
        quantity: 1,
        cost,
      })
    }

    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.setState({quantity: quantity + 1}) // update quantity in state
  }

  removeButton = () => {
    const {quantity} = this.state
    const {menuList} = this.props
    const {id} = menuList

    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const existingCartItem = cartData.find(item => item.id === id)

    if (existingCartItem) {
      // If the item exists in cart, decrement its quantity

      existingCartItem.quantity -= 1

      if (existingCartItem.quantity === 0) {
        // If the quantity becomes zero, remove the item from cart
        const index = cartData.indexOf(existingCartItem)
        cartData.splice(index, 1)
      } else {
        existingCartItem.cost =
          (existingCartItem.cost / (existingCartItem.quantity + 1)) *
          existingCartItem.quantity
      }
      localStorage.setItem('cartData', JSON.stringify(cartData))
      if (quantity >= 1) {
        this.setState({quantity: quantity - 1})
      }
      // update quantity in state
    }
  }

  render() {
    const {menuList, check} = this.props
    const {cost, imageUrl, name, rating} = menuList
    const {quantity} = this.state // get quantity from state

    return (
      <div className="menuitems-container" data-testid="foodItem">
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
          {check ? (
            <div className="add-remove-button-container">
              <button
                data-testid="increment-count"
                type="button"
                className="custom-button"
                onClick={this.addButton}
              >
                +
              </button>
              <p data-testid="active-count">{quantity}</p>
              <button
                data-testid="decrement-count"
                type="button"
                className="custom-button"
                onClick={this.removeButton}
              >
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
