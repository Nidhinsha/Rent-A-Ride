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
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
        <h3>Third slide label</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  );
}

export default SliderBanner;