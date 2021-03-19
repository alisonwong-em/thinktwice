/*global chrome*/
import React from 'react';
import ThumbsUp from '../assets/img/thumbsup.svg';
import ThumbsDown from '../assets/img/thumbsdown.svg';
import CircleCheck from '../assets/img/circlecheck.svg';
import PatagoniaLogo from '../assets/img/alts/patagoniaLogo.png';
import AdidasLogo from '../assets/img/alts/adidasLogo.png';
// import LeftArrow from '../assets/img/leftarrow.png';
// import RightArrow from '../assets/img/rightarrow.png';
import { getCurrentTab } from "../common/Utils";
import './Pages.css';

class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryText: '',
      pass: true,
      transActive: true,
      susEffActive: false,
      envImpActive: false,
      ethLabActive: false,
      brandName: '',
      // brandResponse: {id: null, name:"", transparency: null, worker_emp: null, env_mgmt: null, url: null},
      brandResponse: [],
      sustainable: false,
      loaded: false,
    }

    this.transActive = this.transActive.bind(this);
    this.susEffActive = this.susEffActive.bind(this);
    this.envImpActive = this.envImpActive.bind(this);
    this.ethLabActive = this.ethLabActive.bind(this);
    this.convertToGrades = this.convertToGrades.bind(this);
    this.categoryPass = this.categoryPass.bind(this);
    this.susEffPass = this.susEffPass.bind(this);
  }

  componentDidMount() {
    this.setState({ loaded: false });
    let brandName = '';

    // Get the URL of the current tab the extension is being used on
    getCurrentTab((tab) => {
      // The response is the current tab's url
      chrome.runtime.sendMessage({type: 'popupInit', tabUrl: tab.url}, (response) => {
          if (response) {            
            let brandUrl = response;

            // Extract what the brand name is from the URL
            
            // If the brand is Old Navy url (since they don't have www. in their url)
            if(brandUrl.indexOf('oldnavy') !== -1) {
              // brandName = brandUrl.slice(0, brandUrl.indexOf('.'));
              brandName = 'Old Navy';
            } else {
              // Looks for the period after the 'https://www.' or 'http://www.' to try to extract the actual name of the brand
              brandName = brandUrl.slice(brandUrl.indexOf('.') + 1, brandUrl.indexOf('.', 12));
              
              // Switching the brand names to be capital because capitals are needed for the DB api
              // Except adidas is lowercase in the DB
              switch(brandName) {
                case 'gapcanada':
                  brandName = 'Gap';
                  break;
                case 'patagonia':
                  brandName = 'Patagonia';
                  break;
              }
            }

            this.setState({ brandName });

            // Sends the brand name to the DB to get the brand info
            fetch(`http://127.0.0.1:5000/get_brand_data?brand=${brandName}`)
            .then(response => response.json())
            .then(data => {

              let sustainable = true
              // if any of the category fails, then the brand is not sustainable
              if(!this.categoryPass(data.transparency) || !this.categoryPass(data.env_mgmt)
              || !this.categoryPass(data.worker_emp) || !this.susEffPass(data.name)) {
                sustainable = false;
              }

              this.setState({
                loaded: true,
                sustainable,
                brandResponse: data,
                // Update the default catergory text to match the fetched data - for the transparency category
                categoryText: `${data.name} scores a ${this.convertToGrades(data.transparency)} in this category`,
                transActive: true, susEffActive: false, envImpActive: false, ethLabActive: false
              })
            })
            .catch(error => console.log(error));
          }
      });
    });    
  }

  transActive() {
    const { brandName, brandResponse } = this.state;
    if(brandResponse !== []) {
      this.setState({ pass: this.categoryPass(brandResponse.transparency), categoryText: `${brandName} scores a ${this.convertToGrades(brandResponse.transparency)} in this category`, transActive: true, susEffActive: false, envImpActive: false, ethLabActive: false });
    }
  }

  susEffActive() {
    const { brandName } = this.state;
    this.setState({ pass: this.susEffPass(), categoryText: `${brandName} is part of various efforts to adress sustainability. This can be confirmed through sustainability information provided on their website.`, transActive: false, susEffActive: true, envImpActive: false, ethLabActive: false });
  }

  envImpActive() {
    const { brandName, brandResponse } = this.state;
    if(brandResponse !== []) {
      this.setState({ pass: this.categoryPass(brandResponse.env_mgmt), categoryText: `${brandName} scores a ${this.convertToGrades(brandResponse.env_mgmt)} in this category`, transActive: false, susEffActive: false, envImpActive: true, ethLabActive: false });
    }
  }

  ethLabActive() {
    const { brandName, brandResponse } = this.state;
    if(brandResponse !== []) {
      this.setState({ pass: this.categoryPass(brandResponse.worker_emp), categoryText: `${brandName} scores a ${this.convertToGrades(brandResponse.worker_emp)} in this category`, transActive: false, susEffActive: false, envImpActive: false, ethLabActive: true });
    }
  }

  categoryPass(grade) {
    // If the catergory has a rating higher than or equal to a B- (which is a 7) then it passes
    if(grade >= 7) {
      return true;
    } else {
      return false;
    }
  }

  susEffPass() {
    const { brandName } = this.state;
    let pass = false;
    // Pass/Fail depending on the brand
    switch(brandName) {
      case 'Gap':
        pass = false;
        break;
      case 'Adidas':
        pass = true;
        break;
      case 'Patagonia':
        pass = true;
        break;
      case 'Old Navy':
        pass = false;
        break;
      default:
        pass = true;
        break;
    }

    return pass;
  }

  convertToGrades(gradeIdx) {
    let grade = '';
    switch(gradeIdx) {
        case 0:
            grade = 'F';
            break;
        case 1:
            grade = 'D-';
            break;
        case 2:
            grade = 'D';
            break;
        case 3:
            grade = 'D+';
            break;
        case 4:
            grade = 'C-';
            break;
        case 5:
            grade = 'C';
            break;
        case 6:
            grade = 'C+';
            break;
        case 7:
            grade = 'B-';
            break;
        case 8:
            grade = 'B';
            break;
        case 9:
            grade = 'B+';
            break;
        case 10:
            grade = 'A-';
            break;
        case 11:
            grade = 'A';
            break;
        case 12:
            grade = 'A+';
            break;
        default:
            grade = '';
            break;
    }

    return grade;
  }

  render() {
    const { loaded, sustainable, brandName, pass, categoryText, transActive, susEffActive, envImpActive, ethLabActive, brandResponse } = this.state;

    let categoryExplanation = '';
    if(pass) {
      if(susEffActive) {
        categoryExplanation = 'A category pass means the brand has sustainable efforts';
      } else {
        categoryExplanation = 'A category pass means the brand has a B- ranking or higher in each category';
      }
    } else {
      if(susEffActive) {
        categoryExplanation = 'A category fail means the brand does not have sustainable efforts';
      } else {
        categoryExplanation = 'A category fail means the brand does not has a B- ranking or higher in the failed category';
      }
    }

    return (
      <div>
        { loaded ?
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
                  <p className='text'>{categoryExplanation}</p>
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
        :
        <div class="loader" />
      }
    </div>
  )}
}

export default Brand;