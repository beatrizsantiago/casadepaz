import React from 'react'
import styled from 'styled-components/native'

export const Header = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 50px 0px 20px 0px;
`

export const Label = styled.Text`
    margin: 10px 40px;
    font-size: 15px;
    text-transform: uppercase;
    color: #707070;
    font-weight: bold;
`

export const InputText = styled.TextInput`
    margin: 0px 40px;
    padding: 8px;
    border: solid 1px #9c9c9c;
    border-radius: 5px;
    font-size: 20px;
`

export const Button = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    margin: 15px 40px;
    border-radius: 5px;
    background-color: #f68121;
`

export const Footer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 8px;
`