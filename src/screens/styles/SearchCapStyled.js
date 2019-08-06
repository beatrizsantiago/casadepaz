import React from 'react'
import styled from 'styled-components/native'

export const SearchContainer = styled.View`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 18px;
`

export const AutocompleteContainer = styled.View`
    display: flex;
    flex-direction: row;
`

export const SelectContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 8px 1px 0px 1px;
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