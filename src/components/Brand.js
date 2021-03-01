import React from 'react';
import ThumbsUp from '../assets/img/thumbsup.svg';
import ThumbsDown from '../assets/img/thumbsdown.svg';
import CircleCheck from '../assets/img/circlecheck.svg';
// import LeftArrow from '../assets/img/leftarrow.png';
// import RightArrow from '../assets/img/rightarrow.png';
import './Pages.css';

class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryText: '',
      pass: false,
    }

    this.transClick = this.transClick.bind(this);
    this.susEffClick = this.susEffClick.bind(this);
    this.envImpClick = this.envImpClick.bind(this);
    this.ethLabClick = this.ethLabClick.bind(this);
  }

  transClick() {
    this.setState({ pass: true, categoryText: 'H&M scores a A- in this category' });
  }

  susEffClick() {
    this.setState({ pass: true, categoryText: 'H&M is part of various' });
  }

  envImpClick() {
    this.setState({ pass: true, categoryText: 'H&M scores a A+ in this category' });
  }

  ethLabClick() {
    this.setState({ pass: false, categoryText: 'H&M scores a C- in this category' });
  }

  render() {
  // These would change based on info fetched from DB
  let brandName = 'H&M';
  let sustainability = 'Unsustainable';
  let { pass, categoryText } = this.state;

  return (
    <div>
      <h2 className='heading'>{brandName}</h2>
      <div class='sustainable'>{sustainability}</div>
      <div class='row' align='center'>
        <div class='categoryColumn'>
          <button className='transparency' onMouseOver={this.transClick}>
            Transparency
          </button>
          <button className='susEffort' onMouseEnter={this.susEffClick}>
            Sustainability Efforts
          </button>
          <button className='envImpact' onMouseEnter={this.envImpClick}>
            Environmental Impacts
          </button>
          <button className='ethLabour' onMouseEnter={this.ethLabClick}>
            Ethical Labour
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
          <p className='text'>Patagonia</p>
        </div>
        <div className='altsColumn'>
          {/* <img /> */}
          <p className='text'>Adidas</p>
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

export default Brand;