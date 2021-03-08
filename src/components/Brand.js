import React from 'react';
import ThumbsUp from '../assets/img/thumbsup.svg';
import ThumbsDown from '../assets/img/thumbsdown.svg';
import CircleCheck from '../assets/img/circlecheck.svg';
import PatagoniaLogo from '../assets/img/alts/patagoniaLogo.png';
import AdidasLogo from '../assets/img/alts/adidasLogo.png';
// import LeftArrow from '../assets/img/leftarrow.png';
// import RightArrow from '../assets/img/rightarrow.png';
import './Pages.css';

class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryText: 'Gap is working towards becoming carbon neutral and also eliminating single-use plastic. In additon they aim to improve the working conditions of their factories.',
      hovering: false,
      pass: true,
    }

    this.transHover = this.transHover.bind(this);
    this.susEffHover = this.susEffHover.bind(this);
    this.envImpHover = this.envImpHover.bind(this);
    this.ethLabHover = this.ethLabHover.bind(this);
    this.categoryLeave = this.categoryLeave.bind(this);
  }

  transHover() {
    this.setState({ hovering: true, pass: true, categoryText: 'Gap scores a B in this category' });
  }

  susEffHover() {
    this.setState({ hovering: true, pass: true, categoryText: 'Gap is part of various efforts to adress sustainability. This can be confirmed through sustainability information provided on their website.' });
  }

  envImpHover() {
    this.setState({ hovering: true, pass: true, categoryText: 'Gap scores a A- in this category' });
  }

  ethLabHover() {
    this.setState({ hovering: true, pass: false, categoryText: 'Gap scores a D+ in this category' });
  }

  categoryLeave() {
    this.setState({ hovering: false, categoryText: 'Gap is working towards becoming carbon neutral and also eliminating single-use plastic. In additon they aim to improve the working conditions of their factories.' });
  }

  render() {
  // These would change based on info fetched from DB
  let brandName = 'Gap';
  let sustainable = false;
  let { hovering, pass, categoryText } = this.state;

  return (
    <div className='mainContent'>
      <h2 className='heading'>{brandName}</h2>
      {sustainable ? 
      <div class='sustainable'>Sustainable</div>
      : <div class='unsustainable'>Unsustainable</div>
      }
      <div>
        <div class='row' align='center'>
          <div class='categoryColumn'>
            <button className='transparency' onMouseOver={this.transHover} onMouseLeave={this.categoryLeave}>
              Transparency
            </button>
            <button className='susEffort' onMouseEnter={this.susEffHover} onMouseLeave={this.categoryLeave}>
              Sustainability Efforts
            </button>
            <button className='envImpact' onMouseEnter={this.envImpHover} onMouseLeave={this.categoryLeave}>
              Environmental Impacts
            </button>
            <button className='ethLabour' onMouseEnter={this.ethLabHover} onMouseLeave={this.categoryLeave}>
              Ethical Labour
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
        <h2 className='susAltHeading'>Sustainable Alternatives   <img src={CircleCheck}/></h2>
        <div class='row' align='center'>
          {/* <div class='arrowColumn'>
            <input type="image" src={LeftArrow} />
          </div> */}
          <div className='leftAltCol'>
            <img src={PatagoniaLogo} className='altImg'/>
            <p className='text'>Patagonia</p>
          </div>
          <div className='rightAltCol'>
            <img src={AdidasLogo} className='altImg'/>
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
    </div>
  )}
}

export default Brand;