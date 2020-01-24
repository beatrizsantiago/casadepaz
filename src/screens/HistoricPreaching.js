import React, { useState, useEffect } from 'react'
import { View, Text, Modal, Alert, ActivityIndicator } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Pdf from 'react-native-pdf'
import moment from 'moment'

import PreachingService from '../services/PreachingService'

import { ViewModal } from './styles/MainStyled'
import { ContainerGray, FilePdf, TextBoxPdf, CloseModal, ButtonResend, TextResend } from './styles/HistoricPreachingStyled'

export default HistoricPreaching = () => {

    const [allFiles, setAllFiles] = useState([])
    const [selectFile, setSelectFile] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        listAllFiles()
    }, [])

    listAllFiles = () => {
        setLoading(true)
        PreachingService.GetAllFiles()
            .then(files => {
                setAllFiles(files)
                setLoading(false)
            })
    }

    const openModalPdf = file => {
        setSelectFile(file)
        setIsModalVisible(true)
    }

    const resendPreaching = () => {
        PreachingService.Resend(selectFile.id)
            .then(() => {
                setIsModalVisible(false)
                return Alert.alert('Sucesso!', `"${selectFile.title}" foi reenviada como a palavra atual da semana.`, [{ text: 'OK', onPress: () => listAllFiles() }])
            })
    }

    return (
        <ContainerGray>
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#f68121" />
                    </View>
                    :
                    allFiles.map((file, idx) => (
                        <View key={idx} style={{ marginBottom: 5, alignItems: 'center' }}>
                            <FilePdf onPress={() => openModalPdf(file)}>
                                <Icon name="pdf-box" size={50} color="#9c9c9c" style={{ margin: -5 }} />
                                <TextBoxPdf>{file.title}</TextBoxPdf>
                            </FilePdf>
                            <Text>{moment(file.dateUpload.seconds * 1000).format('DD-MM-YYYY')}</Text>
                        </View>
                    ))
            }
            <Modal animationType="fade" transparent={true} visible={isModalVisible}>
                <ViewModal>
                    <Pdf scale={1.0} source={{ uri: selectFile.urlPdfPreaching || '' }} activityIndicatorProps={{ color: '#fff', progressTintColor: '#fff' }} style={{ width: '100%', height: '85%', paddingLeft: 35, paddingRight: 35 }} />
                    <ButtonResend onPress={() => resendPreaching()}>
                        <TextResend>Reenviar Palavra</TextResend>
                    </ButtonResend>
                    <CloseModal onPress={() => setIsModalVisible(false)}>
                        <Icon name="close-circle" color="#fff" size={32} />
                    </CloseModal>
                </ViewModal>
            </Modal>
        </ContainerGray>
    )
}