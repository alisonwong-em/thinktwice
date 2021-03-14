import React from 'react';
import ThumbsUp from '../assets/img/thumbsup.svg';
import ThumbsDown from '../assets/img/thumbsdown.svg';
import CircleCheck from '../assets/img/circlecheck.svg';
// import LeftArrow from '../assets/img/leftarrow.png';
// import RightArrow from '../assets/img/rightarrow.png';
import './Pages.css';

// https://www.patagonia.ca/product/womens-long-sleeved-capilene-cool-merino-shirt/44555.html?dwvar_44555_color=UPBL&cgid=womens-t-shirts-long-sleeve
// Found by going to women's>t-shirts>first one under long-sleeve

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryText: 'Made with 95% recycled cashmere.',
      pass: true,
      recMatActive: true,
      orgMatActive: false,
      plasFreeActive: false,
    }

    this.recMatActive = this.recMatActive.bind(this);
    this.orgMatActive = this.orgMatActive.bind(this);
    this.plasFreeActive = this.plasFreeActive.bind(this);
  }

  recMatActive() {
    this.setState({ pass: true, categoryText: 'Made with 95% recycled cashmere.', recMatActive: true, orgMatActive: false, plasFreeActive: false });
  }

  orgMatActive() {
    this.setState({ pass: true, categoryText: '95% of this item is organic cashmere.', recMatActive: false, orgMatActive: true, plasFreeActive: false });
  }

  plasFreeActive() {
    this.setState({ pass: true, categoryText: '0% of this product is made of plastic.', recMatActive: false, orgMatActive: false, plasFreeActive: true });
  }

  render() {
    // These would change based on info fetched from DB
    let productName = 'Recycled Cashmere Turtleneck';
    let sustainable = true;
    let { pass, categoryText, recMatActive, orgMatActive, plasFreeActive } = this.state;

    return (
      <div className='mainContent'>
        <h2 className='heading'>{productName}</h2>
        {sustainable ? 
        <div class='sustainable'>This product is Sustainable</div>
        : <div class='unsustainable'>This product is Unsustainable</div>
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
              <p className='text'>
                  {pass ? 
                    <b className='pass'>PASS <img src={ThumbsUp}/>: </b> 
                    : 
                    <b className='fail'>FAIL <img src={ThumbsDown}/>: </b>
                  }
                  {categoryText}
                  <br/>
                </p>
                {pass ?
                  <p className='text'>
                    A category pass means the product has a B- ranking or higher in each category
                  </p>
                  :
                  <p className='text'>
                    A category fail means the product does not have a B- ranking or higher in the failed category
                  </p>
                }
              </div>
            </div>

          <h3 className='thinkTwiceTxt'><em>Do you really need this? Think twice!</em></h3>
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
            <a href="https://xenodochial-rosalind-8f6d27.netlify.app/about" target="_blank" className="learnMoreLink">
              Learn More About Think Twice
            </a>
          </button>
        </div>
      </div>
  )}
}

export default Product;