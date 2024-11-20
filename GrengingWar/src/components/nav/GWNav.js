import { Link } from 'react-router-dom';
import GWnavbutton from "../gwbutton/GWnavbutton";
import './gwnav.css'

const GWNav = ({toggle}) => {  
    return (        
        <nav className='nav-container'>

            {/* <Link to="/" style={styles.Link}><img src={Logo} alt="Trio Wolf logo" style={styles.logo} /></Link> */}
            {/* <GWnavbutton style={styles.tab} btntext="Content comming soon" /> */}
            <Link to='/home' ><GWnavbutton className='tab' btntext="map" /></Link>
            <Link to='/crafting'  ><GWnavbutton className='tab' btntext="Crafting" /></Link>
            <GWnavbutton className='tab' btntext="Smithing" />
            <GWnavbutton className='tab' btntext="Fletching" />
            <GWnavbutton className='tab' btntext="Bank" />
            <GWnavbutton className='tab' btntext="Stats" />
        </nav>
    )
}
export default GWNav;
