import Slider from 'react-slick'

import './index.css'

const ReactSlider = props => {
  const {slider} = props

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }
  return (
    <Slider {...settings}>
      {slider.map(e => (
        <div>
          <img src={e.imageUrl} className="image-carosel" />
        </div>
      ))}
    </Slider>
  )
}
export default ReactSlider
