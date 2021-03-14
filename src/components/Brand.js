import React from 'react';
import ThumbsUp from '../assets/img/thumbsup.svg';
import ThumbsDown from '../assets/img/thumbsdown.svg';
import CircleCheck from '../assets/img/circlecheck.svg';
import PatagoniaLogo from '../assets/img/alts/patagoniaLogo.png';
import AdidasLogo from '../assets/img/alts/adidasLogo.png';
// import LeftArrow from '../assets/img/leftarrow.png';
// import RightArrow from '../assets/img/rightarrow.png';
import './Pages.css';

// $(document).ready(function(){
//   $('body').on('click', 'a', function(){
//     chrome.tabs.create({url: $(this).attr('href')});
//     return false;
//   });
// });

class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryText: 'Gap scores a B in this category',
      pass: true,
      transActive: true,
      susEffActive: false,
      envImpActive: false,
      ethLabActive: false,
    }

    this.transActive = this.transActive.bind(this);
    this.susEffActive = this.susEffActive.bind(this);
    this.envImpActive = this.envImpActive.bind(this);
    this.ethLabActive = this.ethLabActive.bind(this);
  }

  transActive() {
    this.setState({ pass: true, categoryText: 'Gap scores a B in this category', transActive: true, susEffActive: false, envImpActive: false, ethLabActive: false });
  }

  susEffActive() {
    this.setState({ pass: true, categoryText: 'Gap is part of various efforts to adress sustainability. This can be confirmed through sustainability information provided on their website.', transActive: false, susEffActive: true, envImpActive: false, ethLabActive: false });
  }

  envImpActive() {
    this.setState({ pass: true, categoryText: 'Gap scores a A- in this category', transActive: false, susEffActive: false, envImpActive: true, ethLabActive: false });
  }

  ethLabActive() {
    this.setState({ pass: false, categoryText: 'Gap scores a D+ in this category', transActive: false, susEffActive: false, envImpActive: false, ethLabActive: true });
  }

  render() {
    // These would change based on info fetched from DB
    let brandName = 'Gap';
    let sustainable = false;
    let { pass, categoryText, transActive, susEffActive, envImpActive, ethLabActive } = this.state;

    return (
      <div className='mainContent'>
        <h2 className='heading'>{brandName}</h2>
        {sustainable ? 
        <div class='sustainable'>This brand is Sustainable</div>
        : <div class='unsustainable'>This brand is Unsustainable</div>
        }
        <div>
          <div class='row' align='center'>
            <div class='categoryColumn'>
              {transActive ?
                <button className='transActive' onMouseOver={this.transActive}>
                  Transparency
                </button>
                :
                <button className='transparency' onMouseOver={this.transActive}>
                  Transparency
                </button>
              }
              {susEffActive ?
                <button className='susEffActive' onMouseEnter={this.susEffActive}>
                  Sustainability Efforts
                </button>
                :
                <button className='susEffort' onMouseEnter={this.susEffActive}>
                  Sustainability Efforts
                </button>
              }
              {envImpActive ?
                <button className='envImpActive' onMouseEnter={this.envImpActive}>
                  Environmental Impacts
                </button>
                :
                <button className='envImpact' onMouseEnter={this.envImpActive}>
                  Environmental Impacts
                </button>
              }
              {ethLabActive ?
                <button className='ethLabActive' onMouseEnter={this.ethLabActive}>
                  Ethical Labour
                </button>
                :
                <button className='ethLabour' onMouseEnter={this.ethLabActive}>
                  Ethical Labour
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
                  A category pass means the brand has a B- ranking or higher in each category
                </p>
                :
                <p className='text'>
                  A category fail means the brand does not has a B- ranking or higher in the failed category
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
              <h2 className='susAltHeading'>Sustainable Alternatives   <img src={CircleCheck}/></h2>
              <div class='row' align='center'>
                {/* <div class='arrowColumn'>
                  <input type="image" src={LeftArrow} />
                </div> */}
                <div className='leftAltCol'>
                  <a href="https://www.patagonia.ca/home/" target="_blank"><img src={PatagoniaLogo} className='altImg'/></a>
                  <a href="https://www.patagonia.ca/home/" target="_blank"><p className='text'>Patagonia</p></a>
                </div>
                <div className='rightAltCol'>
                  <a href="https://www.adidas.ca/en" target="_blank"><img src={AdidasLogo} className='altImg'/></a>
                  <a href="https://www.adidas.ca/en" target="_blank"><p className='text'>Adidas</p></a>
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

export default Brand;