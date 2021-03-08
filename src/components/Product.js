import React from 'react';
import ThumbsUp from '../assets/img/thumbsup.svg';
import ThumbsDown from '../assets/img/thumbsdown.svg';
import CircleCheck from '../assets/img/circlecheck.svg';
// import LeftArrow from '../assets/img/leftarrow.png';
// import RightArrow from '../assets/img/rightarrow.png';
import './Pages.css';


// First result when searching "black sweater" on gap's website
// https://www.gapcanada.ca/browse/product.do?pid=647909013&pcid=999&vid=1&&searchText=black%20sweater#pdp-page-content


class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryText: '',
      hovering: false,
      pass: false,
    }

    this.recycleHover = this.recycleHover.bind(this);
    this.organicHover = this.organicHover.bind(this);
    this.plasticHover = this.plasticHover.bind(this);
    this.categoryLeave = this.categoryLeave.bind(this);
  }

  recycleHover() {
    this.setState({ hovering: true, pass: true, categoryText: '' });
  }

  organicHover() {
    this.setState({ hovering: true, pass: true, categoryText: '' });
  }

  plasticHover() {
    this.setState({ hovering: true, pass: true, categoryText: '' });
  }

  categoryLeave() {
    this.setState({ hovering: false, categoryText: '' });
  }

  render() {
  // These would change based on info fetched from DB
  let productName = 'True Soft Textured Crewneck Sweater';
  let sustainable = false;
  let { hovering, pass, categoryText } = this.state;

  return (
    <div className='mainContent'>
      <h2 className='heading'>{productName}</h2>
      {sustainable ? 
      <div class='sustainable'>Sustainable</div>
      : <div class='unsustainable'>Unsustainable</div>
      }
      <div>
        <div class='row' align='center'>
          <div class='categoryColumn'>
            <button className='recycleMat' onMouseOver={this.recycleHover} onMouseLeave={this.categoryLeave}>
              Recycled Material
            </button>
            <button className='orgMat' onMouseEnter={this.organicHover} onMouseLeave={this.categoryLeave}>
              Organic Material
            </button>
            <button className='plasticFree' onMouseEnter={this.plasticHover} onMouseLeave={this.categoryLeave}>
              Plastic Free
            </button>
          </div>
          <div class='categoryColumn'>
            {hovering ? 
              <p className='text'>{pass ? <b className='pass'>Pass <img src={ThumbsUp}/>: </b> : <b className='fail'>Fail <img src={ThumbsDown}/>: </b>}{categoryText}</p>
              :
              <p className='text'>{categoryText}</p>
            }
          </div>
        </div>

        <h3 className='thinkTwiceTxt'><em>Think Twice about the necessity of this purchase</em></h3>
        {/* Sustainable Alternatives */}
        <h2 className='susAltHeading'>Sustainable Alternatives <img src={CircleCheck}/></h2>
        <div class='row' align='center'>
          {/* <div class='arrowColumn'>
            <input type="image" src={LeftArrow} />
          </div> */}
          <div className='leftAltCol'>
            {/* <img /> */}
            <p className='text'>Patagonia Sweater</p>
            <p className='price'>$315.00</p>
          </div>
          <div className='rightAltCol'>
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
    </div>
  )}
}

export default Product;