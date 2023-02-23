import {Component} from 'react'
import {VscListFilter} from 'react-icons/vsc'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import ReactSlider from '../CarasoulAdds'
import Footer from '../Footer'
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

class Home extends Component {
  state = {caroSelAdds: []}

  componentDidMount() {
    this.restaurantsListApi()
  }

  restaurantsListApi = async () => {
    const JwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${JwtToken}`},
    }
    const CarouselImages = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const CarouselData = await CarouselImages.json()
    const UpdatedAdds = CarouselData.offers.map(e => ({
      imageUrl: e.image_url,
      id: e.id,
    }))
    this.setState({caroSelAdds: UpdatedAdds})
  }

  render() {
    const {caroSelAdds} = this.state

    return (
      <div className="home-container">
        <Navbar />
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
              <label className="sort-heading" htmlFor="selsect">
                Sort by Lowest
              </label>
              <select className="select">
                {sortByOptions.map(e => (
                  <option key={e.id}>{e.displayText}</option>
                ))}
              </select>
            </div>
          </div>
          <hr className="hr-line" />
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
