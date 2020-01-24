import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.View`
    display: flex;
    flex: 1;
    background-color: #fff;
`

export const ContainerGray = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    background-color: #f2f2f2;
`

export const ViewModal = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
`

export const ButtonCloseModal = styled.TouchableOpacity`
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 8px;
`