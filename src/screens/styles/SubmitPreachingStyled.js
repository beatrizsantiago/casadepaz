import React from 'react'
import styled from 'styled-components/native'

export const RowSelectFile = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 5px;
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