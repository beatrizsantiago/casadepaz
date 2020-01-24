import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Pdf from 'react-native-pdf'
import moment from 'moment'

import PreachingService from '../services/PreachingService'

import { ViewModal } from './styles/MainStyled'
import { ContainerGray, FilePdf, TextBoxPdf, CloseModal } from './styles/HistoricPreachingStyled'

export default HistoricPreaching = () => {

    const [allFiles, setAllFiles] = useState([])
    const [selectFile, setSelectFile] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        listAllFiles()
    }, [])

    listAllFiles = () => {
        PreachingService.GetAllFiles()
            .then(files => {
                setAllFiles(files)
            })
    }

    const openModalPdf = url => {
        setSelectFile(url)
        setIsModalVisible(true)
    }

    return (
        <ContainerGray>
            {
                allFiles.map((file, idx) => (
                    <View key={idx} style={{ marginBottom: 5, alignItems: 'center' }}>
                        <FilePdf onPress={() => openModalPdf(file.urlPdfPreaching)}>
                            <Icon name="pdf-box" size={50} color="#9c9c9c" style={{ margin: -5 }} />
                            <TextBoxPdf>{file.title}</TextBoxPdf>
                        </FilePdf>
                        <Text>{moment(file.dateUpload.seconds * 1000).format('DD-MM-YYYY')}</Text>
                    </View>
                ))
            }
            <Modal animationType="fade" transparent={true} visible={isModalVisible}>
                <ViewModal>
                    <Pdf scale={1.0} source={{ uri: selectFile || '' }} activityIndicatorProps={{ color: '#fff', progressTintColor: '#fff' }} style={{ width: '100%', height: '85%', paddingLeft: 35, paddingRight: 35 }} />
                    <CloseModal onPress={() => setIsModalVisible(false)}>
                        <Icon name="close-circle" color="#fff" size={32} />
                    </CloseModal>
                </ViewModal>
            </Modal>
        </ContainerGray>
    )
}