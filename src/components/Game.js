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
    const gridDepthDistance = 3;
    const gridDepth = Math.floor((height-100)/(width/numOfGrids));
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

    // triggers
    const [crash, setCrash] = React.useState(false);
    const [points, setPoints] = React.useState(0);

    // time controls
    const [counter, setCounter] = React.useState(0);
    const id = React.useRef(null);
    const clearTimer = ()=>{
        window.clearInterval(id.current)
    }

    React.useEffect(()=>{
        id.current= window.setInterval(()=>{
            setCounter(time=>time+1);
        }, 1000);

        return ()=>clearTimer();
    },[]);

    return (
        <GameContainer>
            <GameHeader points={points+" "+counter}/>
            {[...Array(Math.floor(numOfGrids/gridDepthDistance)).keys()].map(num=>(
                <ObjectRow
                    rowPosY={(gridDepth-num*gridDepthDistance-(counter)%(gridDepth+1))*width/numOfGrids}
                    numOfGrids={numOfGrids}
                    screenWidth={width}
                    planePosX={currentPlanePosX}
                    planePosY={0}
                    triggerCrash={()=>setCrash(true)}
                    triggerGainPoint={()=>setPoints(i=>i+1)}
                    />
            ))}
            <Plane planeWidth={width/numOfGrids} planePosX={currentPlanePosX} planePosY={0}/>
        </GameContainer>
    )
}

export default Game

const GameContainer = styled.div`
    height: 100vh;
`;