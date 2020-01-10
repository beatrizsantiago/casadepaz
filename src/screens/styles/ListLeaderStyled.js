import styled from 'styled-components/native'

export const LeaderCard = styled.View`
    display: flex;
    flex-direction: column;
    width: 96%;
    margin: 5px 0px 5px 6px;
    padding: 4px;
    background-color: #fff;
    border-left-width: 3px;
    border-left-color: #f68121;
`

export const ViewImageProfile = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 120px;
    padding: 4px;
    border: solid 1px #e3e3e3;
    border-radius: 5px;
`

export const ViewInfo = styled.View`
    width: 70%;
    height: 120px;
`

export const LargeField = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 2px 5px;
`

export const TextField = styled.Text`
    width: 88%;
    font-size: 16px;
`

export const ViewButtons = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    padding: 8px;
`

export const ButtonEnable = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 35px;
    background-color: #f68121;
`

export const ButtonDisable = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 35px;
    border: solid 1px #f68121;
    background-color: #fff;
`
