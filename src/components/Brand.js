import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ThumbsUp from '../assets/img/thumbsup.svg'
import ThumbsDown from '../assets/img/thumbsdown.svg'
import './Pages.css';

function Brand() {
  // These would change based on info fetched from DB
  let brandName = 'H&M';
  let sustainability = 'Unsustainable';
  let categoryText = 'Lots of words';

  return (
    <div>
      <h1 className='heading'>{brandName}</h1>
      <Box>
        {sustainability}
      </Box>
      <div class='row' align='center'>
        <div class='categoryColumn'>
          <Button className='transparency'>
            Transparency
          </Button>
          <Button className='susEffort'>
            Sustainability Efforts
          </Button>
          <Button className='envImpact'>
            Environmental Impacts
          </Button>
          <Button className='ethLabour'>
            Ethical Labour
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

export default Brand;