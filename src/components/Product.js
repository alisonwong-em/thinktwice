/*global chrome*/
import React from 'react';
import ThumbsUp from '../assets/img/thumbsup.svg';
import ThumbsDown from '../assets/img/thumbsdown.svg';
import CircleCheck from '../assets/img/circlecheck.svg';
import NoImage from '../assets/img/alts/noImage.png';
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
      productNameResponse: [],
      productDetailsResponse: [],
      altsResponse: [],
      descLoaded: false, // if the product desc and word matching content has been returned
      altsLoaded: false, // if the alternatives have loaded
      url: '',
      brandName: '',
    }

    this.recMatActive = this.recMatActive.bind(this);
    this.orgMatActive = this.orgMatActive.bind(this);
    this.plasFreeActive = this.plasFreeActive.bind(this);
    this.fetchAlts = this.fetchAlts.bind(this);
  }

  componentDidMount() {
    this.setState({ descLoaded: false, altsLoaded: false });

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
              brandName = 'oldnavy';
            } else {
              // Looks for the period after the 'https://www.' or 'http://www.' to try to extract the actual name of the brand
              brandName = url.slice(url.indexOf('.') + 1, url.indexOf('.', 12));
              
              // Switching the brand names to be capital because capitals are needed for the DB api
              if(brandName === 'gapcanada') {
                brandName = 'gap';
              }
            }

            this.setState({ brandName, url });

            // Sends the brand name and product url to get the product details
            fetch(`http://127.0.0.1:5000/scrape_product_details?brand=${brandName}&url=${url}`)
            .then(response => response.json())
            .then(data => {
              // Update the recycled material blurb
              if(data !== []) {
                let categoryText = '';
                let totRecMatPercent = 0;
          
                // If there is no recycled material in the product
                if(data.recycled_materials === undefined || data.recycled_materials === null || data.recycled_materials.length === 0) {
                  categoryText += 'Made with 0% recycled material';
                } else {
                  // Meaning there is recycled material in the product
                  categoryText += 'Made with ';
                  for(let i = 0; i < data.recycled_materials.length; i++) {
                    if(i != 0) {
                      categoryText += ', ';
                    }
          
                    categoryText += `${data.recycled_percents[i]}% recycled ${data.recycled_materials[i]}`;
                    totRecMatPercent += data.recycled_percents[i];
                  }
                }
          
                let pass = false;
                // See if the product passes the benchmark of >=20% recycled material for the material to pass the category
                if(totRecMatPercent >= 20) {
                  pass = true;
                }
              
                this.setState({
                  productDetailsResponse: data,
                  descLoaded: true,
                  pass, categoryText, recMatActive: true, orgMatActive: false, plasFreeActive: false
                });
              }
            })
            .catch(error => console.log(error));

            // Sends the brand name and product url to get the product name
            fetch(`http://127.0.0.1:5000/scrape_product_name_overview?brand=${brandName}&url=${url}`)
            .then(response => response.json())
            .then(data => this.setState({
                productNameResponse: data,
              })
            )
            .catch(error => console.log(error));
          }
      });
    });    
  }

  fetchAlts() {
    const { brandName, url } = this.state;

    // Sends the brand name and product url to get the alternatives
    fetch(`http://127.0.0.1:5000/get_alternatives?brand=${brandName}&url=${url}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        altsResponse: data,
        altsLoaded: true,
      })

      return <div/>;
    })
    .catch(error => console.log(error));
    return <div class="altsLoader" />;
  }

  recMatActive() {
    const { productDetailsResponse } = this.state;
    if(productDetailsResponse !== []) {
      let categoryText = '';
      let totRecMatPercent = 0;

      // If there is no recycled material in the product
      if(productDetailsResponse.recycled_materials === undefined || productDetailsResponse.recycled_materials === null || productDetailsResponse.recycled_materials.length === 0) {
        categoryText += 'Made with 0% recycled material';
      } else {
        // Meaning there is recycled material in the product
        categoryText += 'Made with ';
        for(let i = 0; i < productDetailsResponse.recycled_materials.length; i++) {
          if(i != 0) {
            categoryText += ', ';
          }

          categoryText += `${productDetailsResponse.recycled_percents[i]}% recycled ${productDetailsResponse.recycled_materials[i]}`;
          totRecMatPercent += productDetailsResponse.recycled_percents[i];
        }
      }

      let pass = false;
      // See if the product passes the benchmark of >=20% recycled material for the material to pass the category
      if(totRecMatPercent >= 20) {
        pass = true;
      }

      this.setState({ pass, categoryText, recMatActive: true, orgMatActive: false, plasFreeActive: false });
    }
  }

  orgMatActive() {
    const { productDetailsResponse } = this.state;
    if(productDetailsResponse !== []) {
      let categoryText = '';
      let totOrgMatPercent = 0;

      // If there is no organic material in the product
      if(productDetailsResponse.organic_materials === undefined || productDetailsResponse.organic_materials === null || productDetailsResponse.organic_materials.length === 0) {
        categoryText += '0% of this product is organic';
      } else {
        // Meaning there is organic material in the product
        for(let i = 0; i < productDetailsResponse.organic_materials.length; i++) {
          if(i != 0) {
            categoryText += ', ';
          }

          categoryText += `${productDetailsResponse.organic_percents[i]}% of the product is organic ${productDetailsResponse.organic_materials[i]}`;
          totOrgMatPercent += productDetailsResponse.organic_percents[i];
        }
      }

      let pass = false;
      // See if the product passes the benchmark of >=95% organic material for the material to pass the category
      if(totOrgMatPercent >= 95) {
        pass = true;
      }

      this.setState({ pass, categoryText, recMatActive: false, orgMatActive: true, plasFreeActive: false });
    }
  }

  plasFreeActive() {
    const { productDetailsResponse } = this.state;
    if(productDetailsResponse !== []) {
      let categoryText = '';
      
      // If there is no plastic material in the product
      if(productDetailsResponse.plastic_materials === undefined || productDetailsResponse.plastic_materials === null || productDetailsResponse.plastic_materials.length === 0) {
        categoryText += '0% of this item is made of plastic';
      } else {
        // Meaning there is plastic material in the product
        categoryText += `${productDetailsResponse.plastic_percent}% of this product is made of plastic because of its `;
        for(let i = 0; i < productDetailsResponse.plastic_materials.length; i++) {
          if(i != 0) {
            if(i === productDetailsResponse.plastic_materials.length -1) {
              categoryText += ', and ';
            } else {
              categoryText += ', ';
            }
          }

          categoryText += productDetailsResponse.plastic_materials[i];
        }
      }

      let pass = true;
      // See if the product passes the benchmark of =0% plastic material for the material to pass the category
      if(productDetailsResponse.plastic_percent > 0) {
        pass = false;
      }

      this.setState({ pass, categoryText, recMatActive: false, orgMatActive: false, plasFreeActive: true });
    }
  }

  render() {
    const { altsLoaded, descLoaded, pass, categoryText, recMatActive, orgMatActive, plasFreeActive, productNameResponse, productDetailsResponse, altsResponse } = this.state;

    return (
      <div>
      { descLoaded ?
        <div className='mainContent'>
          <h2 className='heading'>{productNameResponse.product_name}</h2>
          {productDetailsResponse.sus_rating ? 
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
            {productDetailsResponse.sus_rating ?
              <div/>
              :
              <div>
                <h2 className='susAltHeading'>Sustainable Alternatives <img src={CircleCheck}/></h2>
                { altsLoaded ?
                  <div class='row' align='center'>
                    {/* <div class='arrowColumn'>
                      <input type="image" src={LeftArrow} />
                    </div> */}
                      <div className='leftAltCol'>
                        <a href={altsResponse[0].url} target="_blank">
                          {altsResponse[0].image === undefined ? 
                            <img src={NoImage} className='altImg'/> 
                            : 
                            <img src={altsResponse[0].image} className='altImg'/>
                          }
                        </a>
                        <p className='text'>{altsResponse[0].product_name}</p>
                        <p className='price'>{altsResponse[0].product_price}</p>
                      </div>
                      <div className='rightAltCol'>
                        <a href={altsResponse[1].url} target="_blank">
                          {altsResponse[1].image === undefined ? 
                            <img src={NoImage} className='altImg'/> 
                            : 
                            <img src={altsResponse[1].image} className='altImg'/>
                          }
                        </a>
                        <p className='text'>{altsResponse[1].product_name}</p>
                        <p className='price'>{altsResponse[1].product_price}</p>
                      </div>
                    {/* <div class='arrowColumn'>
                      <input type="image" src={RightArrow} />
                    </div> */}
                  </div>
                  :
                  this.fetchAlts()
                }
              </div>
            }

            <button className='learnBtn'>
              <a href="https://xenodochial-rosalind-8f6d27.netlify.app/about" target="_blank" className="learnMoreLink">
                Learn More About Think Twice
              </a>
            </button>
          </div>
        </div>
        :
        <div class="loader" />
      }
    </div>
  )}
}

export default Product;