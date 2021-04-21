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
import CrashSound from '../CrashSound.mp3'

function Game({setPage, setHighScore}) {
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
    const [playCrashSound, setPlayCrashSound] = React.useState(false);
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
    const crashSoundRef = React.useRef(null);
    // time-speed play sound
    React.useEffect(()=>{
        if(counter!==0){
            setPlayPointSound(true);
        }
        const pointSoundEvent = setInterval(()=>{
            if(counter!==0){
                setPlayPointSound(false);
                pointSoundRef.current.seek(0);
            }
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

    // crash listener
    React.useEffect(()=>{
        if(crash===true){
            setPlayCrashSound(true);
        };
        const crashSoundEvent = setInterval(()=>{
            if(crash===true){
                setPlayCrashSound(false);
                crashSoundRef.current.seek(0);
                setHighScore(points*100);
                setPage('home');
            }
        }, 200);

        return ()=>clearInterval(crashSoundEvent);
    },[crash])

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
            <ReactHowler
                ref={crashSoundRef}
                src={CrashSound}
                playing={playCrashSound}
                volume={0.5}
            />
            <GameHeader
                points={points*100}
                playingStatus={playingStatus}
                setPlayingStatus={setPlayingStatus}
                setPageToHome={()=>{
                    setHighScore(-1);
                    setPage('home');
                }}
            />
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