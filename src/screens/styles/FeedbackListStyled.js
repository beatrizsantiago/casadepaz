import React from 'react'
import styled from 'styled-components/native'

export const DateFeedbackCard = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 98%;
    padding: 15px 8px;
    background-color: #fff;
    border-bottom-width: 1px;
    border-bottom-color: #e3e3e3;
`

export const EmptyFeedback = styled.View`
    display: flex;
    flex-direction: column;
    flex: 1;
    justifyContent: center;
    alignItems: center;
`

export const TextEmptyFeedback = styled.Text`
    font-size: 18;
    color: #969696;
`