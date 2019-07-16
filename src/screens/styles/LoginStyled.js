import React from 'react'
import styled from 'styled-components/native'

export const Header = styled.View`
    display: flex;
    flex: 8;
`

export const Main = styled.View`
    display: flex;
    flex: 8;
`

export const Label = styled.Text`
    display: flex;
    flex: 2;
    margin: 10px 40px 0px 40px;
    font-size: 15px;
    text-transform: uppercase;
    color: #707070;
    font-weight: bold;
`

export const InputText = styled.TextInput`
    display: flex;
    flex: 2;
    margin: 0px 40px;
    border: solid 1px #9c9c9c;
    border-radius: 5px;
    font-size: 25px;
`

export const Button = styled.TouchableOpacity`
    display: flex;
    flex: 3;
    justify-content: center;
    align-items: center;
    margin: 15px 40px 0px 40px;
    border-radius: 5px;
    background-color: yellow;
`

export const Footer = styled.View`
    display: flex;
    flex: 3;
`