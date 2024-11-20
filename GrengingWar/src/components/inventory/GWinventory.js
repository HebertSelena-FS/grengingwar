import React from "react";
import './gwinventory.css'

const GWinventory = ({ inventory }) => {
    const title = 'Inventory';
    return (
        <div className="scrol">
            <div className="inventory">
                <div className="inventory-title">{title}</div>
                <div className=" inventory-items">
                    {inventory.map((item, index) => (
                        <div className="inventory-row" key={index}>
                            <button className="inventory-btn">
                                <div className="inventory-name">{item.name}:</div>
                                <div className="inventory-count">{item.loot}</div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GWinventory;
