import React from 'react'
import styled from 'styled-components'
import GameHeader from './GameHeader'
import useWindowDimensions from '../utils/WindowDimensions'
import useKeypress from 'react-use-keypress';
import Plane from './Plane'
import Objects from './Objects';
import ObjectRow from './ObjectRow';

function Game() {
    // dimensions
    const {height, width} = useWindowDimensions()
    const numOfGrids = 25;
    const midX = Math.floor(numOfGrids/2)*(width/numOfGrids);
    const [currentPlanePosX, setCurrentPlanePosX] = React.useState(midX);

    // keypress
    useKeypress(['ArrowLeft', 'ArrowRight'], (event) => {
        if (event.key === 'ArrowLeft') {
            if((currentPlanePosX-width/(numOfGrids)).toFixed(0)>=0){
                setCurrentPlanePosX(i=>i-width/(numOfGrids));
            }
        } else if(event.key === 'ArrowRight'){
            if((currentPlanePosX+width/(numOfGrids)).toFixed(0)<=width-width/(2*numOfGrids)){
                setCurrentPlanePosX(i=>i+width/(numOfGrids));
            }
        }
    });
    return (
        <GameContainer>
            <GameHeader/>
            <ObjectRow rowPosY={15*width/numOfGrids} numOfGrids={numOfGrids} screenWidth={width}/>
            <ObjectRow rowPosY={12*width/numOfGrids} numOfGrids={numOfGrids} screenWidth={width}/>
            <ObjectRow rowPosY={9*width/numOfGrids} numOfGrids={numOfGrids} screenWidth={width}/>
            <ObjectRow rowPosY={6*width/numOfGrids} numOfGrids={numOfGrids} screenWidth={width}/>
            <ObjectRow rowPosY={3*width/numOfGrids} numOfGrids={numOfGrids} screenWidth={width}/>
            <ObjectRow rowPosY={0*width/numOfGrids} numOfGrids={numOfGrids} screenWidth={width}/>
            <Plane planeWidth={width/numOfGrids} planePosX={currentPlanePosX} planePosY={0}/>
        </GameContainer>
    )
}

export default Game

const GameContainer = styled.div`
    height: 100vh;
`;