import React from 'react'
import styled from 'styled-components/native'

export const Bar = styled.View`
    display: flex;
    flex-direction: row;
    height: 60px;
    border-bottom-color: #ebebeb;
    border-bottom-width: 2px;
`

export const Button = styled.TouchableOpacity`
    position: absolute;
    padding-top: 5px;
    padding-left: 10px;
    justify-content: center;
    align-items: center;
`

export const TitleCenter = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const Title = styled.Text`
    font-size: 23px;
`