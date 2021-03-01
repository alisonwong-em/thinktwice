import React from 'react';
import ThumbsUp from '../assets/img/thumbsup.svg';
import ThumbsDown from '../assets/img/thumbsdown.svg';
import CircleCheck from '../assets/img/circlecheck.svg';
// import LeftArrow from '../assets/img/leftarrow.png';
// import RightArrow from '../assets/img/rightarrow.png';
import './Pages.css';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryText: '',
      pass: false,
    }

    this.recycleClick = this.recycleClick.bind(this);
    this.organicEffClick = this.organicClick.bind(this);
    this.plasticClick = this.plasticClick.bind(this);
  }

  recycleClick() {
    this.setState({ pass: true, categoryText: 'H&M scores a A- in this category' });
  }

  organicClick() {
    this.setState({ pass: true, categoryText: 'H&M is part of various' });
  }

  plasticClick() {
    this.setState({ pass: true, categoryText: 'H&M scores a A+ in this category' });
  }

  render() {
  // These would change based on info fetched from DB
  let productName = 'Turtleneck Sweater';
  let sustainability = 'Unsustainable';
  let { pass, categoryText } = this.state;

  return (
    <div>
      <h2 className='heading'>{productName}</h2>
      <div class='sustainable'>{sustainability}</div>
      <div class='row' align='center'>
        <div class='categoryColumn'>
          <button className='recycleMat' onMouseOver={this.recycleClick}>
            Recycled Material
          </button>
          <button className='orgMat' onMouseEnter={this.organicClick}>
            Organic Material
          </button>
          <button className='plasticFree' onMouseEnter={this.plasticClick}>
            Plastic Free
          </button>
        </div>
        <div class='categoryColumn'>
          <p className='text'>{pass ? <b className='pass'>PASS <img src={ThumbsUp}/>: </b> : <b className='fail'>FAIL<img src={ThumbsDown}/>: </b>}{categoryText}</p>
        </div>
      </div>

      <h3><em>Think Twice about the necessity of this purchase</em></h3>
      {/* Sustainable Alternatives */}
      <h2 className='susAltHeading'>Sustainable Alternatives <img src={CircleCheck}/></h2>
      <div class='row' align='center'>
        {/* <div class='arrowColumn'>
          <input type="image" src={LeftArrow} />
        </div> */}
        <div className='altsColumn'>
          {/* <img /> */}
          <p className='text'>Patagonia Sweater</p>
          <p className='price'>$315.00</p>
        </div>
        <div className='altsColumn'>
          {/* <img /> */}
          <p className='text'>Adidas Sweater</p>
          <p className='price'>$75.99</p>
        </div>
        {/* <div class='arrowColumn'>
          <input type="image" src={RightArrow} />
        </div> */}
      </div>

      {/* STUFF GOES HERE */}
      <button className='learnBtn'>
        <a href="www.thinktwice.eco" target="_blank">
          Learn More
        </a>
      </button>
    </div>
  )}
}

export default Product;