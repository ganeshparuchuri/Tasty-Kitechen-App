import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {VscListFilter} from 'react-icons/vsc'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import ReactSlider from '../CarasoulAdds'
import Footer from '../Footer'
import RestaurantsList from '../RestaurantsList'
import Counter from '../Counter'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]
const ApiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    caroSelAdds: [],
    activePage: 1,
    CurrentApiStatus: ApiStatus.initial,
    restaurantsList: [],
    sortByOption: sortByOptions[1].value,
  }

  componentDidMount() {
    this.restaurantsListApi()
  }

  restaurantsListApi = async () => {
    this.setState({CurrentApiStatus: ApiStatus.loading})
    const {activePage, sortByOption} = this.state
    const LIMIT = 9
    const offset = (activePage - 1) * LIMIT
    const JwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${JwtToken}`},
    }

    const restaurantsUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortByOption}`
    const CarouselImages = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const restaurantsResponse = await fetch(restaurantsUrl, options)

    const CarouselData = await CarouselImages.json()
    const restaurantaData = await restaurantsResponse.json()
    if (restaurantsResponse.ok === true) {
      this.setState({CurrentApiStatus: ApiStatus.success})

      const UpdatedAdds = CarouselData.offers.map(e => ({
        imageUrl: e.image_url,
        id: e.id,
      }))

      const restaurantsUpdation = restaurantaData.restaurants.map(e => ({
        costForTwo: e.cost_for_two,
        cuisine: e.cuisine,
        groupByTime: e.group_by_time,
        hasOnlineDelivery: e.has_online_delivery,
        hasTableBooking: e.has_table_booking,
        id: e.id,
        imageUrl: e.image_url,
        isDeliveringNow: e.is_delivering_now,
        location: e.location,
        menuType: e.menu_type,
        name: e.name,
        opensAt: e.opens_at,
        userRating: {
          rating: e.user_rating.rating,
          ratingColor: e.user_rating.rating_color,
          ratingText: e.user_rating.rating_text,
          totalReviews: e.user_rating.total_reviews,
        },
      }))
      this.setState({
        caroSelAdds: UpdatedAdds,
        restaurantsList: restaurantsUpdation,
      })
    }
  }

  forwardButton = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        () => {
          this.restaurantsListApi()
        },
      )
    }
  }

  prevButton = () => {
    const {activePage} = this.state

    if (activePage > 1) {
      this.setState({CurrentApiStatus: ApiStatus.loading})
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        () => {
          this.restaurantsListApi()
        },
      )
    }
  }

  dropDownChange = event => {
    this.setState({sortByOption: event.target.value}, this.restaurantsListApi)
  }

  restaurantsListsAndCarouselList = () => {
    const {caroSelAdds, restaurantsList, activePage} = this.state

    return (
      <>
        <div>
          <ReactSlider slider={caroSelAdds} />
        </div>
        <div className="restarants-list-container">
          <h1 className="popular-reastarants-heading">Popular Restaurants</h1>
          <div className="sortby-heading-container">
            <p className="popular-restarunts-description">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <VscListFilter className="filter-icon" />
              <p className="sort-heading" htmlFor="selsect">
                Sort By
              </p>
              <select className="select" onChange={this.dropDownChange}>
                {sortByOptions.map(e => (
                  <option key={e.id} value={e.value}>
                    {e.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="hr-line" />

          <div className="rest-list-container">
            {restaurantsList.map(e => (
              <RestaurantsList eachRestaurent={e} key={e.id} />
            ))}
          </div>
        </div>
        <Counter
          counterValue={activePage}
          prevButton={this.prevButton}
          forwardButton={this.forwardButton}
        />
        <Footer />
      </>
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

  changeApiStatus = status => {
    switch (status) {
      case ApiStatus.success:
        return this.restaurantsListsAndCarouselList()
      case ApiStatus.loading:
        return this.loadingStatus()
      default:
        return null
    }
  }

  render() {
    const {CurrentApiStatus, activePage} = this.state
    console.log(activePage)

    return (
      <div className="home-container">
        <Navbar />
        {this.changeApiStatus(CurrentApiStatus)}
      </div>
    )
  }
}
export default Home
