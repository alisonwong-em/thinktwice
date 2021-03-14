import React from 'react';
import ThumbsUp from '../assets/img/thumbsup.svg';
import ThumbsDown from '../assets/img/thumbsdown.svg';
import CircleCheck from '../assets/img/circlecheck.svg';
// import LeftArrow from '../assets/img/leftarrow.png';
// import RightArrow from '../assets/img/rightarrow.png';
import PatagoniaAlt from '../assets/img/alts/patagoniaAlt.png';
import AdidasAlt from '../assets/img/alts/adidasAlt.png';
import './Pages.css';


// First result when searching "black sweater" on gap's website
// https://www.gapcanada.ca/browse/product.do?pid=647909013&pcid=999&vid=1&&searchText=black%20sweater#pdp-page-content


class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryText: 'Made with 0% recycled material.',
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
    this.setState({ pass: false, categoryText: 'Made with 0% recycled material.', recMatActive: true, orgMatActive: false, plasFreeActive: false });
  }

  orgMatActive() {
    this.setState({ pass: false, categoryText: '0% of the item is organic.', recMatActive: false, orgMatActive: true, plasFreeActive: false });
  }

  plasFreeActive() {
    this.setState({ pass: false, categoryText: '44% of the item is made of plastic.', recMatActive: false, orgMatActive: false, plasFreeActive: true });
  }

  render() {
    // These would change based on info fetched from DB
    let productName = 'Supersoft Brushed Turtleneck Sweater Gap';
    let sustainable = false;
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
                <a href="https://www.patagonia.ca/product/womens-recycled-cashmere-turtleneck-sweater/50715.html?dwvar_50715_color=FEA&cgid=womens-sweaters" target="_blank"><img src={PatagoniaAlt} className='altImg'/></a>
                <a href="https://www.patagonia.ca/product/womens-recycled-cashmere-turtleneck-sweater/50715.html?dwvar_50715_color=FEA&cgid=womens-sweaters" target="_blank"><p className='text'>Patagonia Sweater</p></a>
                <p className='price'>$315.00</p>
              </div>
              <div className='rightAltCol'>
                <a href="https://www.adidas.ca/en/essentials-comfort-funnel-neck-sweatshirt/GD2594.html" target="_blank"><img src={AdidasAlt} className='altImg'/></a>
                <a href="https://www.adidas.ca/en/essentials-comfort-funnel-neck-sweatshirt/GD2594.html" target="_blank"><p className='text'>Adidas Sweater</p></a>
                <p className='price'>$55.00</p>
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