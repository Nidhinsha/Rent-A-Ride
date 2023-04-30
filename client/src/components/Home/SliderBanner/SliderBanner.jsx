import Carousel from 'react-bootstrap/Carousel';

function SliderBanner() {
  
  return (
    <Carousel >
    <Carousel.Item interval={1000}>
      <img
        className="d-block w-100 "
        src={require("../../../assests/images/banner5.jpg")}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Best Site For Rent</h3>
        <p>One of the main attraction is the price.</p>
      </Carousel.Caption>
    </Carousel.Item>
    
  </Carousel>
  );
}

export default SliderBanner;