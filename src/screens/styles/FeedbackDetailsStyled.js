import React from 'react'
import styled from 'styled-components/native'

export const BigCard = styled.View`
    display: flex;
    flex-direction: column;
    width: 97%;
    margin: 4px 0px 4px 5px;
    padding: 10px;
    background-color: #fff;
`

export const Row = styled.View`
    width: 97%;
    margin-left: 5px;
    display: flex;
    flexDirection: row;
    justifyContent: space-between;
`

export const CardLeft = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 49%;
    height: 60px;
    margin: 4px 0px;
    padding: 15px 8px;
    background-color: #fff;
    border-left-width: 2px;
    border-left-color: #f68121;
`

export const CardRight = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 49%;
    height: 60px;
    margin: 4px 0px;
    padding: 15px 8px;
    background-color: #fff;
    border-right-width: 2px;
    border-right-color: #f68121;
`

export const LargeCard = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 97%;
    height: 60px;
    margin: 4px 0px 4px 5px;
    background-color: #fff;
    border-bottom-width: 1.2px;
    border-bottom-color: #f68121;
`

export const Circle = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    margin: 0 6px;
    border-radius: 50px;
    background-color: rgba(246, 129, 33, 0.2);
`

export const ItemIcon = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18%;
`

export const TextCard = styled.Text`
    font-size: 16px;
    color: #000;
    text-transform: uppercase;
`

export const SimpleCard = styled.View`
    display: flex;
    flex-direction: column;
    width: 97%;
    margin: 4px 0px 4px 5px;
`

export const HeaderCard = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #f68121;
`

export const Description = styled.Text`
    margin: 5px 10px 5px 10px;
    text-align: center;
    font-size: 15px;
`

export const ImgCard = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 97%;
    margin: 4px 0px 4px 5px;
    padding: 4px;
    border: solid 1px #ffb980;
    border-radius: 4px;
    background-color: #fff;
`

export const ButtonClose = styled.TouchableOpacity`
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
`