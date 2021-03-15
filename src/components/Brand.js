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
      categoryText: 'H&M scores a A- in this category',
      pass: true,
      transActive: true,
      susEffActive: false,
      envImpActive: false,
      ethLabActive: false,
      test: "",
      brandResponse: [],
      // brandResponse: {id: null, name:"", transparency: null, worker_emp: null, env_mgmt: null, url: null},
    }

    this.transActive = this.transActive.bind(this);
    this.susEffActive = this.susEffActive.bind(this);
    this.envImpActive = this.envImpActive.bind(this);
    this.ethLabActive = this.ethLabActive.bind(this);
  }

  transActive() {
    this.setState({ pass: true, categoryText: 'H&M scores a A- in this category', transActive: true, susEffActive: false, envImpActive: false, ethLabActive: false });
  }

  susEffActive() {
    this.setState({ pass: true, categoryText: 'H&M is part of various', transActive: false, susEffActive: true, envImpActive: false, ethLabActive: false });
  }

  envImpActive() {
    this.setState({ pass: true, categoryText: 'H&M scores a A+ in this category', transActive: false, susEffActive: false, envImpActive: true, ethLabActive: false });
  }

  ethLabActive() {
    this.setState({ pass: false, categoryText: 'H&M scores a C- in this category', transActive: false, susEffActive: false, envImpActive: false, ethLabActive: true });
  }

  onTermSubmit = () => {
    console.log("HIIIIIII");
    this.setState({test: "WOWOWOW"});
    const brandName = "Gap"
    fetch(`http://127.0.0.1:5000/get_brand_data?brand=${brandName}`)
      .then(response => response.json())
      // .then(data => console.log(data));
      .then(data => this.setState({
        brandResponse: data
      }))
      .catch(error => console.log(error));
      // .then(data => this.setState({brandResponse: {id: data.id, name: data.name, transparency: data.transparency, worker_emp: data.worker_emp, env_mgmt: data.env_mgmt, url: data.url}}));
    console.log("FETCH DONE");
  }

  render() {
    // These would change based on info fetched from DB
    let brandName = 'H&M';
    let sustainable = false;
    let { pass, categoryText, transActive, susEffActive, envImpActive, ethLabActive } = this.state;

    return (
      <div className='mainContent'>
        <h2 className='heading'>{brandName}</h2>
        <h1 onClick={this.onTermSubmit}>HI</h1>
        <div>{this.state.test}</div>
        <div>{console.log(this.state.brandResponse)}</div>
        {sustainable ? 
        <div class='sustainable'>Sustainable</div>
        : <div class='unsustainable'>Unsustainable</div>
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
              <p className='text'>{pass ? <b className='pass'>Pass <img src={ThumbsUp}/>: </b> : <b className='fail'>Fail <img src={ThumbsDown}/>: </b>}{categoryText}</p>
            </div>
          </div>

          <h3 className='thinkTwiceTxt'><em>Think Twice about the necessity of this purchase</em></h3>
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
                  <a href="https://www.gapcanada.ca/" target="_blank"><img src={AdidasLogo} className='altImg'/></a>
                  <a href="https://www.gapcanada.ca/" target="_blank"><p className='text'>Adidas</p></a>
                </div>
                {/* <div class='arrowColumn'>
                  <input type="image" src={RightArrow} />
                </div> */}
              </div>
            </div>
          }

          <button className='learnBtn'>
            <a href="https://xenodochial-rosalind-8f6d27.netlify.app/about" target="_blank" className="learnMoreLink">
              Learn More
            </a>
          </button>
        </div>
      </div>
  )}
}

export default Brand;