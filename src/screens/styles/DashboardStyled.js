import React from 'react'
import styled from 'styled-components/native'

export const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
`

export const Column = styled.View`
    display: flex;
    flex-direction: column;
`

export const RowBar = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 96%;
    height: 40px;
    border-bottom-width: 1px;
    border-bottom-color: #f68121;
    background-color: #fff;
`

export const BigBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 96%;
    height: 130px;
    padding: 10px;
    background-color: #fff;
`

export const Circle = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin: 0 20px 0 10px;
    border-radius: 50px;
    background-color: #f68121;
`

export const CircleMedim = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    margin: 0 6px;
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0.3);
`

export const CircleMediumOrange = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    margin: 0 6px;
    border-radius: 50px;
    background-color: rgba(246, 129, 33, 0.2);
`

export const MediumBoxWhite = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 46.5%;
    height: 90px;
    margin: 0px 6px;
    background-color: #fff;
`

export const MediumBoxOrange = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 46.5%;
    height: 90px;
    margin: 0px 6px;
    background-color: #f68121;
`

export const LargeBox = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 96%;
    height: 80px;
    margin: 0px 6px;
    background-color: #fff;
`

export const HeaderBox = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 35%;
    background-color: #f68121;
`

export const CardScroll = styled.View`
    display: flex;
    flex-direction: row;
    width: 96%;
    height: 220px;
    background-color: #fff;
`

export const LeftBoxCard = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12%;
    height: 100%;
    background-color: #f68121;
`

export const Gallery = styled.ScrollView`
    height: 100%;
    padding: 5px;
`

export const BoxEmptyImage = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 88%;
    height: 100%;
`

export const TitleInfo = styled.Text`
    font-size: 15px;
    text-transform: uppercase;
    color: #000;
`

export const TitleQuantity = styled.Text`
    font-size: 22px;
    color: #fff;
`

export const SubtitleQuantity = styled.Text`
    font-size: 12px;
    text-transform: uppercase;
    color: #fff;
`

export const TitleQuantityOrange = styled.Text`
    font-size: 22px;
    color: #f68121;
`

export const SubtitleQuantityOrange = styled.Text`
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    color: #f68121;
`

export const TitleHeaderBox = styled.Text`
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
`

export const TitleBox = styled.Text`
    font-size: 22px;
    text-transform: uppercase;
    color: #000;
    margin-left: 10px;
`