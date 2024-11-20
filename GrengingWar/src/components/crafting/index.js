import React from 'react'
import GWNav from "../GWNav"
import GWheader from "../GWheader"
import GWinventory from "../inventory/GWinventory";
import Workshop from './workshop';
import Itemlist from './Itemlist';
import "GrengingWar/src/components/crafting/index.css"

const Crafting = () => {
  return (

<div className='container'>
    <header>
    <GWheader/>
    </header>
    <div>
        <GWNav />
    </div>
    <div className='gameplay'>
        <div>
            {/* inventory  */}
            <GWinventory/>
        </div>
        <div>
          <p className='color' >content</p>
          <Workshop/>
        </div>
        <div>
          <p className='color' >listing</p>
          <Itemlist />
        </div>
      </div>
      </div>
  )
}

export default Crafting;
