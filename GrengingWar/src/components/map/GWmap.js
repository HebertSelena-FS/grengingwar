import React, { useRef, useEffect, useState } from 'react';
import './GWmap.css';
import Content from '../../Utils/MapContent';
import Locationtag from '../gathering/Locationtag'
import GWresourceheld from '../resources/GWresource';
import NPC from '../gathering/NPC';
import GWlevels from '../statsandinfo/GWlevels';

const GWmap = ({ onLocationChange }) =>  {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [canMoveYellowDot, setCanMoveYellowDot] = useState(true);
  const [clickedButton, setClickedButton] = useState({ row: 0, col: 0 }); // Initial clicked button set to (0, 0)
  const [npcContent, setNpcContent] = useState(null); // State to store NPC content
  const [newlocation, setNewLocation] = useState(null); // State to store new location
  const prevMousePosition = useRef({ x: 0, y: 0 });

  const isAdjacent = (row, col) => {
    if (!clickedButton) {
      return false;
    }
    const { row: yellowRow, col: yellowCol } = clickedButton;

    return (
      (Math.abs(row - yellowRow) <= 1 && Math.abs(col - yellowCol) <= 1) &&
      !(row === yellowRow && col === yellowCol)
    );
  };

  const handleMouseDown = (e) => {
    if (e.button === 1) {
      setIsDragging(true);
      prevMousePosition.current.x = e.clientX;
      prevMousePosition.current.y = e.clientY;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - prevMousePosition.current.x;
      const dy = e.clientY - prevMousePosition.current.y;
      prevMousePosition.current.x = e.clientX;
      prevMousePosition.current.y = e.clientY;
      setPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    }
  };

  const handleWheel = (e) => {
    const panSensitivity = 20;
    const dx = e.deltaX * panSensitivity;
    const dy = e.deltaY * panSensitivity;
    setPosition((prevPosition) => ({
      x: prevPosition.x + dx,
      y: prevPosition.y + dy,
    }));
    e.preventDefault();
  };

  const handleButtonClick = (row, col) => {
    if (canMoveYellowDot && isAdjacent(row, col) && clickedButton) {
      const { row: clickedRow, col: clickedCol } = clickedButton;

      if (
        Math.abs(row - clickedRow) <= 1 &&
        Math.abs(col - clickedCol) <= 1 &&
        !(row === clickedRow && col === clickedCol)
      ) {
        setCanMoveYellowDot(false);

        setTimeout(() => {
          setCanMoveYellowDot(true);
        }, 10);

        setClickedButton({ row, col });

        const newNpcContent = Content[row][col].npc;
        setNpcContent(newNpcContent);
        
      }
    }
  };

  useEffect(() => {
    onLocationChange(`${clickedButton.row + 1}-${clickedButton.col + 1}`);
  })

  return (
    <div className='main-container-map'>
      <div className='container-map'>
        <div className='map-resources'>
          <Locationtag id={`Location`} className='location' count={`${clickedButton.row + 1}-${clickedButton.col + 1} `} name="location: " />
          <GWlevels/>
        </div>
        <div
          className="custom-map-container"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
        >
          <div
            className="custom-map"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
          >
            <div className="button-grid">
              <table>
                <tbody>
                  {Content.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((item, colIndex) => (
                        <td key={colIndex}>
                          <button
                            onClick={() => handleButtonClick(rowIndex, colIndex)}
                            className={(rowIndex === clickedButton.row && colIndex === clickedButton.col) ? 'yellow-button' : 'aqua-button'}
                            disabled={!isAdjacent(rowIndex, colIndex)}
                          >
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='npc-display-container'>
        {/* {npcContent && (
          <NPC
            id={npcContent.id}
            name={npcContent.name}
            type={npcContent.type}
            health={npcContent.health}
          />
        )} */}
      </div>
    </div>
  );
}

export default GWmap;
