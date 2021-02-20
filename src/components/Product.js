import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ThumbsUp from '../assets/img/thumbsup.svg'
import ThumbsDown from '../assets/img/thumbsdown.svg'
import './Pages.css';

function Product() {
  // These would change based on info fetched from DB
  let productName = 'Turtleneck Sweater';
  let sustainability = 'Unsustainable';
  let categoryText = 'Lots of words';

  return (
    <div>
      <h1 className='heading'>{productName}</h1>
      <Box>
        {sustainability}
      </Box>
      <div class='row' align='center'>
        <div class='categoryColumn'>
          <Button className='recycleMat'>
            Recycled Material
          </Button>
          <Button className='orgMat'>
            Organic Material
          </Button>
          <Button className='plasticFree'>
            Plastic Free
          </Button>
        </div>
        <div class='categoryColumn'>
          <p><b className='pass'>PASS <img src={ThumbsUp}/></b>{categoryText}</p>
        </div>
      </div>
      {/* Sustainable Alternatives */}

      {/* STUFF GOES HERE */}
      <Button className='learnBtn'>
        Learn More
      </Button>
    </div>
  )
}

export default Product;