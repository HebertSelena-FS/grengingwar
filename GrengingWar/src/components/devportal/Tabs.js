import './tabs.css';
import GWnavButton from "../gwbutton/GWnavbutton"

function Tabs() {


  return (
      <div className="tabs-main-container">
        <GWnavButton btntext='Resources'/>
        <GWnavButton btntext='NPC'/>
        <GWnavButton btntext='Faction'/>
      </div>
      
  )
}

export default Tabs