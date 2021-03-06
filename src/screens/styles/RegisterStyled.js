import React from 'react'
import styled from 'styled-components/native'

export const Label = styled.Text`
    margin: 14px 12px 0px 12px;
    font-size: 18px;
    color: #000;
    font-weight: bold;
`

export const InputText = styled.TextInput`
    height: 42px;
    margin: 0px 12px;
    padding: 1px;
    border-bottom-width: 2px;
    border-bottom-color: #9c9c9c;
    font-size: 20px;
`

export const ViewAutoComplete = styled.View`
    width: 97%;
    margin-top: 1.5%;
    background-color: #fff;
    z-index: 100;
`

export const MediumInput = styled.View`
    display: flex;
    flex-direction: row;
`

export const ColMediumInput = styled.View`
    display: flex;
    flex-direction: column;
    width: 50%;
`

export const Button = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin: 12px;
    background-color: #f68121;
`

export const TextButton = styled.Text`
    font-size: 22px;
    text-transform: uppercase;
    color: #fff;
`

export const RowHour = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin: 0 12px;
`

export const RedText = styled.Text`
    color: #ff0000;
`

export const ViewButtons = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 12px;
`

export const ButtonAlter = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 48%;
    height: 60px;
    background-color: #f68121;
`

export const ButtonBack = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 48%;
    height: 60px;
    border: solid 1px #f68121;
    background-color: #fff;
`