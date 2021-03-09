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
      categoryText: 'H&M scores a A- in this category',
      pass: false,
      recMatActive: true,
      orgMatActive: false,
      plasFreeActive: false,
    }

    this.recMatActive = this.recMatActive.bind(this);
    this.orgMatActive = this.orgMatActive.bind(this);
    this.plasFreeActive = this.plasFreeActive.bind(this);
  }

  recMatActive() {
    this.setState({ pass: true, categoryText: 'H&M scores a A- in this category', recMatActive: true, orgMatActive: false, plasFreeActive: false });
  }

  orgMatActive() {
    this.setState({ pass: true, categoryText: 'H&M is part of various', recMatActive: false, orgMatActive: true, plasFreeActive: false });
  }

  plasFreeActive() {
    this.setState({ pass: true, categoryText: 'H&M scores a A+ in this category', recMatActive: false, orgMatActive: false, plasFreeActive: true });
  }

  render() {
    // These would change based on info fetched from DB
    let productName = 'Turtleneck Sweater';
    let sustainable = false;
    let { pass, categoryText, recMatActive, orgMatActive, plasFreeActive } = this.state;

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
              {recMatActive ?
                <button className='recMatActive' onMouseOver={this.recMatActive}>
                  Recycled Material
                </button>
                :
                <button className='recycleMat' onMouseOver={this.recMatActive}>
                  Recycled Material
                </button>
              }
              {orgMatActive ?
                <button className='orgMatActive' onMouseEnter={this.orgMatActive}>
                  Organic Material
                </button>
                :
                <button className='orgMat' onMouseEnter={this.orgMatActive}>
                  Organic Material
                </button>
              }
              {plasFreeActive ?
                <button className='plasFreeActive' onMouseEnter={this.plasFreeActive}>
                  Plastic Free
                </button>
                :
                <button className='plasticFree' onMouseEnter={this.plasFreeActive}>
                  Plastic Free
                </button>
              }
            </div>
            <div class='categoryColumn'>
              <p className='text'>{pass ? <b className='pass'>Pass <img src={ThumbsUp}/>: </b> : <b className='fail'>Fail <img src={ThumbsDown}/>: </b>}{categoryText}</p>
            </div>
          </div>

          <h3 className='thinkTwiceTxt'><em>Think Twice about the necessity of this purchase</em></h3>
          {/* Sustainable Alternatives */}
          {sustainable ?
          <div/>
          :
          <div>
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
          </div>
          }

          <button className='learnBtn'>
            <a href="https://xenodochial-rosalind-8f6d27.netlify.app/about" target="_blank">
              Learn More
            </a>
          </button>
        </div>
      </div>
  )}
}

export default Product;