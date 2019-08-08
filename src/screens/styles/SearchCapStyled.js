import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    background-color: #fff;
`

export const SearchContainer = styled.View`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
`

export const AutocompleteContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 85.5%;
`

export const SelectContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 8px 1px 0px 1px;
`

export const Select = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48.6%;
    height: 43px;
    background-color: #fff;
    border: solid 1px #c2c2c2;
    border-radius: 5px;
`

export const ButtonClose = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 42px;
    border-radius: 5px;
    background-color: #f68121;
`
export const ButtonCloseCard = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 22px;
`