import {Component} from 'react'
import {AiOutlineStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import Footer from '../Footer'
import MenuItem from '../MenuItems'
import './index.css'

class RestaurantsItem extends Component {
  state = {isLoading: true, Restauntsmenu: {}, currentId: ''}

  componentDidMount() {
    this.restaurantsListApi()
  }

  restaurantsListApi = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const JwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${JwtToken}`},
    }
    const restaurantsUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const restaurantsResponse = await fetch(restaurantsUrl, options)
    const restaurantsMenu = await restaurantsResponse.json()
    const upadatedMenu = {
      costForTwo: restaurantsMenu.cost_for_two,
      cuisine: restaurantsMenu.cuisine,
      foodItems: restaurantsMenu.food_items.map(e => ({
        cost: e.cost,
        id: e.id,
        foodType: e.food_type,
        imageUrl: e.image_url,
        name: e.name,
        rating: e.rating,
      })),
      imageUrl: restaurantsMenu.image_url,
      itemsCount: restaurantsMenu.items_count,
      location: restaurantsMenu.location,
      name: restaurantsMenu.name,
      opensAt: restaurantsMenu.opens_at,
      rating: restaurantsMenu.rating,
      reviewsCount: restaurantsMenu.reviews_count,
    }
    this.setState({Restauntsmenu: upadatedMenu, isLoading: false})
  }

  addButtonClick = id => {
    this.setState({currentId: id})
  }

  renderMenuItems = () => {
    const {Restauntsmenu, currentId} = this.state
    const {
      imageUrl,
      name,
      location,
      rating,
      costForTwo,
      reviewsCount,
    } = Restauntsmenu

    return (
      <div>
        <div className="banner-menu">
          <img src={imageUrl} alt="" className="banner-image" />
          <div>
            <h1 className="menu-hotel-name">{name}</h1>
            <p className="loaction-name">{location}</p>
            <div className="star-rating-container">
              <div>
                <div className="star-rating-container">
                  <AiOutlineStar className="menu-star" />
                  <p className="rating-menu">{rating}</p>
                </div>
                <p className="reviewscount">{reviewsCount}+ Ratings</p>
              </div>
              <hr className="custom-line" />
              <div>
                <p className="cost-for-two">
                  <BiRupee />
                  {costForTwo}
                </p>
                <p className="cost-for-two">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-items-container">
          {Restauntsmenu.foodItems.map(e => (
            <MenuItem
              key={e.id}
              menuList={e}
              addButtonClick={this.addButtonClick}
              check={currentId === e.id}
            />
          ))}
        </div>
      </div>
    )
  }

  loadingStatus = () => (
    <div className="loader-container" data-testid="restaurants-list-loader">
      <Loader
        type="Oval"
        color="rgba(247, 147, 30, 1)"
        height={30}
        width={30}
      />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-container">
        <Navbar />
        {isLoading ? this.loadingStatus() : this.renderMenuItems()}
        <Footer />
      </div>
    )
  }
}
export default RestaurantsItem
