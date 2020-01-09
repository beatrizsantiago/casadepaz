import React from 'react'
import styled from 'styled-components/native'

export const InputTextRadius = styled.TextInput`
    height: 42px;
    margin: 5px 12px 5px 12px;
    padding: 5px;
    border: solid 1px #bfbfbf;
    border-radius: 5px;
    font-size: 20px;
`

export const RowSelectFile = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    padding: 0px 12px;
`

export const ButtonSelect = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28%;
    height: 40px;
    margin-right: 6px;
    background-color: #f68121;
`

export const TextSelect = styled.Text`
    font-size: 13px;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
`

export const TextNameFile = styled.Text`
    width: 70%;
    color: #828282;
    font-size: 14px;
`

export const ButtonOutline = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin: 20px 25%;
    border: solid 1px #f68121;
    background-color: #fff;
`

export const TextButtonOrange = styled.Text`
    font-size: 16px;
    text-transform: uppercase;
    color: #f68121;
`
