import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    background-color: #f2f2f2;
`

export const Row = styled.View`
    display: flex;
    flex-direction: row;
    margin: 5px 0px;
`

export const Column = styled.View`
    display: flex;
    flex-direction: column;
`

export const BigBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 95%;
    height: 130px;
    padding: 10px;
    background-color: #fff;
`

export const Circle = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin: 0 20px 0 10px;
    border-radius: 50px;
    background-color: #f68121;
`

export const MediumBox = styled.View`
    display: flex;
    flex-direction: column;
    width: 46%;
    height: 100px;
    margin: 0px 6px;
    background-color: #fff;
`

export const LargeBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 95%;
    height: 100px;
    margin: 0px 6px;
    background-color: #fff;
`