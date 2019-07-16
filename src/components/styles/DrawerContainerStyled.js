import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.View`
    background-color: #fff;
`

export const Header = styled.View`
    background-color: pink;
    height: 150px;
`

export const Item = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
`

export const Title = styled.Text`
    margin-left: 10px;
    font-size: 22px;
    color: #000;
`