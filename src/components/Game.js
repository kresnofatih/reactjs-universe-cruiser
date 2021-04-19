import React from 'react'
import styled from 'styled-components'
import GameHeader from './GameHeader'
import useWindowDimensions from '../utils/WindowDimensions'
import useKeypress from 'react-use-keypress';
import Plane from './Plane'

function Game() {
    // dimensions
    const {height, width} = useWindowDimensions()
    const midX = (width/2)-width/50;
    const [currentPlanePosX, setCurrentPlanePosX] = React.useState(midX);

    // keypress
    useKeypress(['ArrowLeft', 'ArrowRight'], (event) => {
        if (event.key === 'ArrowLeft') {
            if((currentPlanePosX-width/50)>-width/50){
                setCurrentPlanePosX(i=>i-width/50);
            }
        } else if(event.key === 'ArrowRight'){
            if((currentPlanePosX+width/50)<width-width/25){
                setCurrentPlanePosX(i=>i+width/50);
            }
        }
    });
    return (
        <GameContainer>
            <GameHeader/>
            <Plane planeWidth={width/25} planePosX={currentPlanePosX} planePosY={0}/>
        </GameContainer>
    )
}

export default Game

const GameContainer = styled.div`
    height: 100vh;
`;