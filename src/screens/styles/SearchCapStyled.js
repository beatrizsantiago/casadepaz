import styled from 'styled-components/native'

export const Container = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    background-color: #fff;
`

export const SearchContainer = styled.View`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
`

export const AutocompleteContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 87%;
`

export const SelectContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 8px 1px 0px 1px;
`

export const Select = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48.8%;
    height: 43px;
    background-color: #fff;
    border: solid 1px #c2c2c2;
    border-radius: 5px;
`

export const ButtonClose = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 42px;
    margin-right: 4px;
    border-radius: 5px;
    background-color: #f68121;
`

export const ButtonCentralize = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 42px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.8);
`

export const ButtonCloseSelect = styled.TouchableOpacity`
    position: absolute;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 42px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #f68121;
`

export const ButtonCloseCard = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 16px;
`

export const LargeInput = styled.View`
    display: flex;
    flex-direction: row;
    max-width: 90%;
    margin: 3px 0px;
    align-items: center;
`

export const TextLarge = styled.Text`
    font-size: 18px;
`

export const MediumInput = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const TextMedim = styled.Text`
    width: 40%;
    margin: 3px 0px;
    font-size: 18px;
`

export const IconsInput = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
`