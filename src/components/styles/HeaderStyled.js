import React from 'react'
import styled from 'styled-components/native'

export const Bar = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 60px;
    border-bottom-color: #ebebeb;
    border-bottom-width: 2px;
    background-color: #f68121;
`

export const Button = styled.TouchableOpacity`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
`

export const TitleCenter = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const Title = styled.Text`
    font-size: 23px;
`