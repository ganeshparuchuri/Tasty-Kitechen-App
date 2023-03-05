import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Footer from '../Footer'
import Navbar from '../Navbar'
import './index.css'

class Cart extends Component {
  state = {cartItems: [], isPaymentSuccess: false}

  componentDidMount() {
    try {
      const localStorageData = localStorage.getItem('cartData')
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData)
        this.setState({cartItems: parsedData})
      }
    } catch (error) {
      console.log(error)
    }
  }

  addButton = id => {
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
    }

    localStorage.setItem('cartData', JSON.stringify(cartData))
    // update quantity in state
    this.setState({cartItems: cartData})
  }

  removeButton = id => {
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
        // If the item quantity is updated, update its cost
        existingCartItem.cost =
          (existingCartItem.cost / (existingCartItem.quantity + 1)) *
          existingCartItem.quantity
      }

      localStorage.setItem('cartData', JSON.stringify(cartData))
      this.setState({cartItems: cartData})
    }
  }

  placeOrderButton = () => {
    localStorage.removeItem('cartData')
    this.setState({isPaymentSuccess: true})
  }

  paymentSuccesssView = () => (
    <>
      <div className="payment-success-container">
        <img
          src="https://res.cloudinary.com/dr33vdv2n/image/upload/v1677585846/Vector_2_xqtuf6.png"
          alt=""
          className="success-image"
        />
        <h1 className="Payment-heading">Payment Successful</h1>
        <p className="payment-description">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <Link to="/">
          <button type="button" className="payment-btn">
            Go To Homepage
          </button>
        </Link>
      </div>
    </>
  )

  renderCartItems = () => {
    const {cartItems, isPaymentSuccess} = this.state
    let totalCost = 0

    cartItems.forEach(e => {
      totalCost += e.cost
    })

    return isPaymentSuccess ? (
      this.paymentSuccesssView()
    ) : (
      <>
        <ul className="cartList-container">
          <div className="item-quantity-price-container">
            <p className="item-quantity-price-heading">Item</p>
            <p className="item-quantity-price-heading">Quantity</p>
            <p className="item-quantity-price-heading">Price</p>
          </div>
          {cartItems.map(e => (
            <li key={e.id} className="cart-list">
              <img src={e.imageUrl} alt="" className="cart-image" />
              <div
                style={{marginLeft: '16px'}}
                className="responsive-cart-container"
              >
                <h2 className="cart-item-name">{e.name}</h2>
                <div className="add-remove-button-container">
                  <button
                    data-testid="increment-quantity"
                    type="button"
                    className="custom-button"
                    onClick={() => this.addButton(e.id)}
                  >
                    +
                  </button>

                  <p data-testid="item-quantity">{e.quantity}</p>
                  <button
                    type="button"
                    className="custom-button"
                    onClick={() => this.removeButton(e.id)}
                  >
                    -
                  </button>
                </div>
                <p className="cart-item-cost">
                  <BiRupee />
                  {e.cost}
                </p>
              </div>
            </li>
          ))}
          <hr className="cart-items-line" />
          <div className="cart-list">
            <h1 className="order-total">Order Total : </h1>
            <p data-testid="total-price" className="total">
              <BiRupee />
              {totalCost}
            </p>
          </div>
          <button
            onClick={this.placeOrderButton}
            type="button"
            className="place-order-btn"
          >
            Place Order
          </button>
        </ul>
        <Footer />
      </>
    )
  }

  renderEmptyView = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dr33vdv2n/image/upload/v1677582625/OBJECTS_nkimcm.png"
        alt="empty cart"
      />
      <h1 className="no-orders-yet">No Order Yet!</h1>
      <p className="cart-is-empty">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="ordernow-button">
          Order Now
        </button>
      </Link>
    </div>
  )

  render() {
    const {cartItems} = this.state
    return (
      <>
        <Navbar />
        {cartItems.length === 0
          ? this.renderEmptyView()
          : this.renderCartItems()}
      </>
    )
  }
}
export default Cart
