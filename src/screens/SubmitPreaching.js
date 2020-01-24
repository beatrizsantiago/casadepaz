import React, { useState, useEffect } from 'react'
import { View, Text, Alert, ScrollView, TouchableOpacity, ActivityIndicator, Modal } from "react-native"
import DocumentPicker from 'react-native-document-picker'
import Pdf from 'react-native-pdf'
import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-controls'

import PreachingService from '../services/PreachingService'

import { Container, ViewModal } from './styles/MainStyled'
import { Label, RedText } from './styles/RegisterStyled'
import { InputTextRadius, RowSelectFile, ButtonSelect, TextSelect, TextNameFile, ButtonOutline, TextButtonOrange } from './styles/SubmitPreachingStyled'

export default function SubmitPreaching(props) {

    const [titlePreaching, setTitlePreaching] = useState('')
    const [urlVideo, setUrlVideo] = useState('')
    const [datasFile, setDatasFile] = useState('')
    const [loading, setLoading] = useState(false)

    const alertMessage = message => Alert.alert('Atenção!', message, [{ text: 'OK' }])

    const sendPreaching = async () => {
        setLoading(true)
        try {
            let idPreaching = await PreachingService.RegisterPreaching(titlePreaching, urlVideo)

            let urlFile = await PreachingService.UploadFilePreaching(datasFile.uri, datasFile.name)
            
            PreachingService.UpdatePreaching(idPreaching, urlFile)
                .then(() => {
                    setTitlePreaching('')
                    setUrlVideo('')
                    setDatasFile('')
                    return alertMessage('Palavra enviada com sucesso.')
                })
                    
        } catch (error) {
        	console.warn("Error Feedback: ", error);

        } finally {
        	setLoading(false)
        }
    }

    const validatePreaching = () => {
        
        if (titlePreaching == '') {
            return alertMessage('Por favor, informe o tema da palavra.')

        } else if (!datasFile.uri) {
            return alertMessage('Por favor, selecione o arquivo da palavra.')

        } else {
            sendPreaching()
        }
    }

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
            if (!DocumentPicker.isCancel(error)) {
                alertMessage('Houve um erro ao selecionar esse arquivo. Tente novamente.')
                console.warn("Error SelectDocument", error);
                throw error
            }
        }
    }

    return (
        <Container>
            <ScrollView>
                <Label>Tema <RedText>*</RedText></Label>
                <InputTextRadius onChangeText={title => setTitlePreaching(title)} value={titlePreaching} />

                {/* <Label>URL do Vídeo</Label>
                <InputTextRadius onChangeText={url => setUrlVideo(url)} value={urlVideo} /> */}

                <RowSelectFile>
                    <ButtonSelect onPress={() => selectDocument()}>
                        <TextSelect>Selecionar</TextSelect>
                    </ButtonSelect>
                    <TextNameFile>{datasFile.name || 'Nenhum arquivo selecionado.'}</TextNameFile>
                </RowSelectFile>

                {
                    datasFile.uri ?
                        <RowSelectFile>
                            <Pdf scale={1.6} source={{ uri: datasFile.uri || '' }} style={{ width: '100%', height: 300, marginTop: 3 }} />
                        </RowSelectFile>
                        : null
                }

                <ButtonOutline onPress={() => validatePreaching()}>
                    <TextButtonOrange>Enviar Palavra</TextButtonOrange>
                </ButtonOutline>

                <Modal animationType="fade" transparent={true} visible={loading}>
                    <ViewModal>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={{ color: '#fff', fontSize: 20, marginTop: 5 }}>Enviando a Palavra...</Text>
                    </ViewModal>
                </Modal>

            </ScrollView>
        </Container>
    )
}