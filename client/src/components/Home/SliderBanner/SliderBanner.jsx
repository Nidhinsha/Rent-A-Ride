import Carousel from 'react-bootstrap/Carousel';

function SliderBanner() {
  
  return (
    <Carousel >
    <Carousel.Item interval={1000}>
      <img
        className="d-block w-100 "
        src="https://yorindia.com/backend/web/imageupload/A5SaB7eSMR6eP7oij5IpLIRUvHpiQifa.jpg"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Best Site For Rent</h3>
        <p>One of the main attraction is the price.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={500}>
      <img
        className="d-block w-100 "
        src="https://yorindia.com/backend/web/imageupload/PEUVgxVeyz0ZRLv-4BRBlhxrVj6cn8Rs.jpg"
        alt="Second slide"
        // height="500"
      />
      <Carousel.Caption>
      <h3>Best Site For Rent</h3>
        <p>One of the main attraction is the price.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100 "
        src="https://yorindia.com/backend/web/imageupload/cE3sD9d_fX4ClgJ8OZ4y55qDAZmhTmiZ.jpg"
        alt="Third slide"
        // height="500"
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