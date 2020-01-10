import React from 'react'
import styled from 'styled-components/native'

export const ContainerGray = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    flex: 1;
    background-color: #f2f2f2;
`

export const FilePdf = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center
    width: 100px;
    height: 120px;
    margin: 5px;
    border: solid 1px #e3e3e3;
    border-radius: 5px;
    background-color: #fff;
`

export const TextBoxPdf = styled.Text`
    width: 90%;
    text-align: center;
    font-size: 12px;
    color: #616161;
`

export const CloseModal = styled.TouchableOpacity`
    position: absolute;
    top: 8px;
    right: 8px;
`