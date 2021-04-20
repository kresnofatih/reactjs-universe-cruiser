import React from 'react'
import styled from 'styled-components'
import Objects from './Objects'

function ObjectRow({
    rowPosY,
    counter,
    numOfGrids,
    screenWidth,
    planePosX,
    planePosY,
    triggerCrash,
    triggerGainPoint
}) {
    const [rowData, setRowData] = React.useState([...Array(numOfGrids).keys()].map(num=>{
        if(Math.random()>=0.5){
            return {state: true, posX: num*screenWidth/numOfGrids, type: Math.random()>=0.2 ? 'asteroid': 'gem'};
        } else {
            return {state: false, posX: num*screenWidth/numOfGrids};
        }
    }));

    React.useEffect(()=>{
        // see if plane collides with objects
        if(rowPosY===planePosY){
            setRowData(
                rowData.map((object)=>{
                    if(Math.abs(object.posX.toFixed(2)-planePosX.toFixed(2))<=screenWidth/(2*numOfGrids)){
                        if(object.type==='gem'){
                            triggerGainPoint();
                            return {state: false, posX: object.posX}
                        } else {
                            triggerCrash();
                            return object;
                        }
                    } else {
                        return object;
                    }
                })
            );
        }
    }, [planePosX, counter]);

    // randomize gem & asteroid distribution
    React.useEffect(()=>{
        if(rowPosY<0){
            setRowData([...Array(numOfGrids).keys()].map(num=>{
                if(Math.random()>=0.5){
                    return {state: true, posX: num*screenWidth/numOfGrids, type: Math.random()>=0.2 ? 'asteroid': 'gem'};
                } else {
                    return {state: false, posX: num*screenWidth/numOfGrids};
                }
            }))
        }
    }, [rowPosY])
    return (
        <ObjectRowContainer>
            {rowData.map(data=>{
                if(data.state){
                    return (
                        <Objects
                            key={data.posX+"&"+rowPosY}
                            objectPosX={data.posX}
                            objectPosY={rowPosY}
                            objectType={data.type}
                            objectWidth={screenWidth/numOfGrids}
                        />
                    )
                }
            })}
        </ObjectRowContainer>
    )
}

export default ObjectRow

const ObjectRowContainer = styled.div``;