import React from 'react'
import styled from 'styled-components'
import GameHeader from './GameHeader'
import useWindowDimensions from '../utils/WindowDimensions'
import useKeypress from 'react-use-keypress';
import Plane from './Plane'
import ObjectRow from './ObjectRow';
import sayurisong from '../SayuriAoibashi.mp3'
import ReactHowler from 'react-howler'
import PointSound from '../pointsound.mp3'

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
    const [playPointSound, setPlayPointSound] = React.useState(false);
    const [crash, setCrash] = React.useState(false);
    const [points, setPoints] = React.useState(0);

    // time controls
    const [counter, setCounter] = React.useState(0);
    const id = React.useRef(null);
    const clearTimer = ()=>{
        window.clearInterval(id.current)
    }
    const [speed, setSpeed] = React.useState(1000);
    const pointSoundRef = React.useRef(null);
    // time-speed
    React.useEffect(()=>{
        setPlayPointSound(true);
        const pointSoundEvent = setInterval(()=>{
            setPlayPointSound(false);
            pointSoundRef.current.seek(0);
        }, 200);
        setSpeed(i=>i-10);
        // setPlayPointSound(false);

        return ()=>clearInterval(pointSoundEvent);
    }, [points]);
    // time-counter
    React.useEffect(()=>{
        id.current= window.setInterval(()=>{
            setCounter(time=>time+1);
        }, speed);

        return ()=>clearTimer();
    },[speed]);

    const [playingStatus, setPlayingStatus] = React.useState(true);

    return (
        <GameContainer>
            <ReactHowler
                src={sayurisong}
                playing={playingStatus}
                loop={true}
                volume={0.5}
            />
            <ReactHowler
                ref={pointSoundRef}
                src={PointSound}
                playing={playPointSound}
                volume={0.5}
            />
            <GameHeader points={points+" "+playPointSound} playingStatus={playingStatus} setPlayingStatus={setPlayingStatus}/>
            {[...Array(Math.floor(gridDepth/gridDepthDistance)).keys()].map(num=>(
                <ObjectRow
                    key={num}
                    rowPosY={gridDepth-num*gridDepthDistance-(counter%(gridDepth+2))<-1 ? 
                        ((4+(gridDepth-1)*2)-num*gridDepthDistance-(counter%(gridDepth+2)))*width/numOfGrids :
                        (gridDepth-num*gridDepthDistance-(counter%(gridDepth+2)))*width/numOfGrids
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