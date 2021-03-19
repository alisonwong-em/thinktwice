/*global chrome*/
import React from 'react';
import BrandPage from './components/Brand';
import ProductPage from './components/Product';
import { getCurrentTab } from "./common/Utils";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productWebpage: false, // If the user is on a product listing while using the extension
      showingProductTab: false, // If the user is on the product tab in the extension
    }

    this.changeTabClick = this.changeTabClick.bind(this);
  }

  componentDidMount() {
    // Get the URL of the current tab the extension is being used on to determine if on a product page or not
    getCurrentTab((tab) => {
      // The response is the current tab's url
      chrome.runtime.sendMessage({type: 'popupInit', tabUrl: tab.url}, (response) => {
          if (response) {           
            let url = response; 

            // Determine if the user is on a product listing right now or not
            if(url.indexOf('product') > -1 || url.indexOf('html') > -1) {
              // If the user is on a product page, then 
              this.setState({ productWebpage: true, showingProductTab: true });
            }
          }
      });
    });    
  }

  changeTabClick(page) {
   this.setState({ showingProductTab: page });
  }

  render() {
    let { productWebpage, showingProductTab } = this.state;

    return (
      <div className="App">
          {showingProductTab ?
          <div class='row'>
            <div className="tabCol">
              <button className='activeTab'onClick={()=>this.changeTabClick(true)}><h2 className="tabProductTxt">Product</h2></button>
              <button className='tab' onClick={()=>this.changeTabClick(false)}><h2 className="tabBrandTxt">Brand</h2></button>
            </div>
            <div className='mainCol'>
              <ProductPage /> 
            </div>
          </div>
          : 
          <div class='row'>
            <div className="tabCol">
              {/* Ensures we only show the product tab if the user is on a product webpage */}
              {productWebpage ? <button className='tab'onClick={()=>this.changeTabClick(true)}><h2 className="tabProductTxt">Product</h2></button> : <div/> }
              <button className='activeTab' onClick={()=>this.changeTabClick(false)}><h2 className="tabBrandTxt">Brand</h2></button>
            </div>
            <div className='mainCol'>
              <BrandPage />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
