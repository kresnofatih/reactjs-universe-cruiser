import React from 'react'
import styled from 'styled-components'
import Objects from './Objects'

function ObjectRow({rowPosY, numOfGrids, screenWidth}) {
    const [rowData, setRowData] = React.useState([...Array(numOfGrids).keys()].map(num=>{
        if(Math.random()>=0.5){
            return {state: true, num: num, type: Math.random()>=0.2 ? 'asteroid': 'gem'};
        } else {
            return {state: false, num: num};
        }
    }))
    return (
        <ObjectRowContainer>
            {rowData.map(data=>{
                if(data.state){
                    return (
                        <Objects
                            objectPosX={data.num*screenWidth/numOfGrids}
                            objectPosY={rowPosY}
                            objectType={data.type}
                            objectWidth={screenWidth/numOfGrids}
                        />
                    )
                }
            })}
            {/* {[...Array(numOfGrids).keys()].map(num=>{
                if(Math.random()>=0.5){
                    return (
                        <Objects
                            objectPosX={num*screenWidth/numOfGrids}
                            objectPosY={rowPosY}
                            objectType={Math.random()>=0.1 ? 'asteroid': 'gem'}
                            objectWidth={screenWidth/numOfGrids}
                        />
                    )
                }
            })} */}
        </ObjectRowContainer>
    )
}

export default ObjectRow

const ObjectRowContainer = styled.div``;