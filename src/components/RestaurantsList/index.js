import {Link} from 'react-router-dom'
import './index.css'
import {AiOutlineStar} from 'react-icons/ai'

const RestaurantsList = props => {
  const {eachRestaurent} = props
  const {imageUrl, name, userRating, cuisine, id} = eachRestaurent

  return (
    <Link to={`/restaurant/${id}`} className="link-class">
      <div className="eachreastaurant-container">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div style={{marginRight: '47px'}}>
          <h1 className="restaurant-name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="ratings-container">
            <AiOutlineStar className="star-class" />
            <p className="rating">{userRating.rating}</p>
            <p className="total-reviews">({userRating.totalReviews} ratings)</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default RestaurantsList
