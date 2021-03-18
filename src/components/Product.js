/*global chrome*/
import React from 'react';
import ThumbsUp from '../assets/img/thumbsup.svg';
import ThumbsDown from '../assets/img/thumbsdown.svg';
import CircleCheck from '../assets/img/circlecheck.svg';
// import LeftArrow from '../assets/img/leftarrow.png';
// import RightArrow from '../assets/img/rightarrow.png';
import { getCurrentTab } from "../common/Utils";
import './Pages.css';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryText: '',
      pass: false,
      recMatActive: true,
      orgMatActive: false,
      plasFreeActive: false,
      productDetailsResponse: [],
    }

    this.recMatActive = this.recMatActive.bind(this);
    this.orgMatActive = this.orgMatActive.bind(this);
    this.plasFreeActive = this.plasFreeActive.bind(this);
  }

  componentDidMount() {
    // Get the URL of the current tab the extension is being used on
    getCurrentTab((tab) => {
      // The response is the current tab's url
      chrome.runtime.sendMessage({type: 'popupInit', tabUrl: tab.url}, (response) => {
          if (response) {           
            let url = response; 
            let brandName = '';

            // Extract what the brand name is from the URL
            
            // If the brand is Old Navy url (since they don't have www. in their url)
            if(url.indexOf('oldnavy') !== -1) {
              // brandName = brandUrl.slice(0, brandUrl.indexOf('.'));
              brandName = 'Old Navy';
            } else {
              // Looks for the period after the 'https://www.' or 'http://www.' to try to extract the actual name of the brand
              brandName = url.slice(url.indexOf('.') + 1, url.indexOf('.', 12));
              
              // Switching the brand names to be capital because capitals are needed for the DB api
              if(brandName === 'gapcanada') {
                brandName = 'gap';
              }
            }

            // Sends the brand name to the DB to get the brand info
            // fetch(`http://127.0.0.1:5000/scrape_product_details?brand=patagonia&url=https://www.patagonia.com/product/mens-recycled-cashmere-crewneck-sweater/50525.html?dwvar_50525_color=FGE`)
            fetch(`http://127.0.0.1:5000/scrape_product_details?brand=${brandName}&url=${url}`)
            .then(response => response.json())
            .then(data => {
              this.setState({
                productDetailsResponse: data,
              });

              // Update the default catergory text
              this.recMatActive();
            })
            .catch(error => console.log(error));
          }
      });
    });    
  }

  recMatActive() {
    const { productDetailsResponse } = this.state;
    if(productDetailsResponse !== []) {
      let categoryText = '';

      // Meaning there is recycled material in the product
      if(productDetailsResponse.recycled_materials.length > 0) {
        categoryText += 'Made with ';
        for(let i = 0; i < productDetailsResponse.recycled_materials.length; i++) {
          if(i != 0) {
            categoryText += ', '
          }

          categoryText += `${productDetailsResponse.recycled_percents[i]}% recycled ${productDetailsResponse.recycled_materials[i]}`
        }
      } else {
        // If there is no recycled material in the product
        categoryText += 'Made with 0% recycled material';
      }

      this.setState({ pass: true, categoryText, recMatActive: true, orgMatActive: false, plasFreeActive: false });
    }
  }

  orgMatActive() {
    const { productDetailsResponse } = this.state;
    if(productDetailsResponse !== []) {
      let categoryText = '';

      // Meaning there is recycled materail in the product
      if(productDetailsResponse.organic_materials.length > 0) {
        for(let i = 0; i < productDetailsResponse.recycled_materials.length; i++) {
          if(i != 0) {
            categoryText += ', ';
          }

          categoryText += `${productDetailsResponse.organic_percents[i]}% of the product is organic ${productDetailsResponse.organic_materials[i]}`
        }
      } else {
        // If there is no organic material in the product
        categoryText += '0% of this product is organic';
      }

      this.setState({ pass: true, categoryText, recMatActive: false, orgMatActive: true, plasFreeActive: false });
    }
  }

  plasFreeActive() {
    const { productDetailsResponse } = this.state;
    if(productDetailsResponse !== []) {
      let categoryText = '';

      // Meaning there is recycled materail in the product
      if(productDetailsResponse.organic_materials.length > 0) {
        categoryText += `${productDetailsResponse.plastic_percent}% of this product is made of plastic because of its `;
        for(let i = 0; i < productDetailsResponse.recycled_materials.length; i++) {
          if(i != 0) {
            if(i === productDetailsResponse.recycled_materials.length -1) {
              categoryText += ', and ';
            } else {
              categoryText += ', ';
            }
          }

          categoryText += productDetailsResponse.plastic_materials[i];
        }
      } else {
        // If there is no organic material in the product
        categoryText += '0% of this item is made of plastic';
      }

      this.setState({ pass: true, categoryText, recMatActive: false, orgMatActive: false, plasFreeActive: true });
    }
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
                    A category pass means the product has met the category benchmark
                  </p>
                  :
                  <p className='text'>
                    A category fail means the product has not met the category benchmark
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