import React from 'react';
import BrandPage from './components/Brand';
import ProductPage from './components/Product';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productPage: false,
    }

    this.openPageClick = this.openPageClick.bind(this);
  }

  openPageClick(page) {
   this.setState({ productPage: page });
  }

  render() {
    let { productPage } = this.state;

    return (
      <div className="App">
          {productPage ?
          <div class='row'>
            <div className="tabCol">
              <button className='activeTab'onClick={()=>this.openPageClick(true)}><h2 className="tabProductTxt">Product</h2></button>
              <button className='tab' onClick={()=>this.openPageClick(false)}><h2 className="tabBrandTxt">Brand</h2></button>
            </div>
            <div className='mainCol'>
              <ProductPage /> 
            </div>
          </div>
          : 
          <div class='row'>
            <div className="tabCol">
              <button className='tab'onClick={()=>this.openPageClick(true)}><h2 className="tabProductTxt">Product</h2></button>
              <button className='activeTab' onClick={()=>this.openPageClick(false)}><h2 className="tabBrandTxt">Brand</h2></button>
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
