import React, { useState, useEffect } from 'react'
import { View, Text, Alert, ScrollView, TouchableOpacity } from "react-native"
import DocumentPicker from 'react-native-document-picker'

import { Container } from './styles/MainStyled'
import { Label, InputText, InputTextRadius, RedText } from './styles/RegisterStyled'
import { RowSelectFile, ButtonSelect, TextSelect, TextNameFile } from './styles/SubmitPreachingStyled'

export default function SubmitPreaching(props) {

    const [titlePreaching, setTitlePreaching] = useState('')
    const [urlVideo, setUrlVideo] = useState('')
    const [datasFile, setDatasFile] = useState({})

    const alertMessage = message => Alert.alert('Atenção!', message, [{ text: 'OK' }])

    const selectDocument = async () => {
        try {
            const response = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles] })
            console.warn(response);

            let extensionFile = response.name.split('.')[1]
            if (extensionFile != "pdf") {
                alertMessage(`Não é possível submeter um arquivo do tipo ${extensionFile}. Por favor, selecione um do tipo pdf.`)
            } else {
                setDatasFile(response)
            }

        } catch (error) {
            alertMessage('Houve um erro ao selecionar esse arquivo. Tente novamente.')
            console.warn("Error SelectDocument", error);
            throw error
        }
    }

    return (
        <Container>
            <ScrollView>
                <Label>Tema <RedText>*</RedText></Label>
                <InputTextRadius onChangeText={title => setTitlePreaching(title)} value={titlePreaching} />

                <Label>URL do Vídeo</Label>
                <InputTextRadius onChangeText={url => setUrlVideo(url)} value={urlVideo} />

                <Label>Palavra <RedText>*</RedText></Label>

                <RowSelectFile>
                    <ButtonSelect onPress={() => selectDocument()}>
                        <TextSelect>Selecionar</TextSelect>
                    </ButtonSelect>
                    <TextNameFile>{datasFile.name || 'Nenhum arquivo selecionado.'}</TextNameFile>
                </RowSelectFile>
            </ScrollView>
        </Container>
    )
}