import { NavLink } from 'react-router-dom';

import './LandingPage.css';

const LandingPage = () => {
  return (
    <>
      <div className="container">

        <div className="icon">
          <ion-icon class='icon-pic' name="play-outline"></ion-icon>
        </div>
        <div className="icon-heading">
          Semantic Online <span className='icon-heading-IDE-word'>IDE</span>
        </div>

        <div className="landing-para">
          The <span className='online-word'>ONLINE Code Editor</span> which lets you code in trending programming languages with ZERO setup
        </div>

        <button className='get-started-btn'>
          <NavLink className='btn-text-link' to='/compiler'>Get Started</NavLink>
        </button>

      </div>
    </>
  )
}

export default LandingPage;