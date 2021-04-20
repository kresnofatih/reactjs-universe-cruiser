import React from 'react'
import styled from 'styled-components'
import GameHeader from './GameHeader'
import useWindowDimensions from '../utils/WindowDimensions'
import useKeypress from 'react-use-keypress';
import Plane from './Plane'
import ObjectRow from './ObjectRow';
import sayurisong from '../SayuriAoibashi.mp3'
import {Howl, Howler} from 'howler';


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
        soundplay(sayurisong);
        id.current= window.setInterval(()=>{
            setCounter(time=>time+1);
        }, 1000);

        return ()=>clearTimer();
    },[]);

    // sound controls
    Howler.volume(0.8);
    const soundplay = (src)=>{
        const sound = new Howl({
            src
        });
        sound.play();
    }

    return (
        <GameContainer>
            <GameHeader points={points}/>
            {[...Array(Math.floor(numOfGrids/gridDepthDistance)).keys()].map(num=>(
                <ObjectRow
                    key={num}
                    rowPosY={gridDepth-num*gridDepthDistance-(counter%17)<-1 ? 
                        (32-num*gridDepthDistance-(counter%17))*width/numOfGrids :
                        (gridDepth-num*gridDepthDistance-(counter%17))*width/numOfGrids
                    }
                    numOfGrids={numOfGrids}
                    counter={counter}
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