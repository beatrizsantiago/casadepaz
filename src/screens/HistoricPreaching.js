import React, { Component } from 'react'
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Pdf from 'react-native-pdf'
import moment from 'moment'

import PreachingService from '../services/PreachingService'

import { ViewModal } from './styles/MainStyled'
import { ContainerGray, FilePdf, TextBoxPdf, CloseModal } from './styles/HistoricPreachingStyled'

export default class HistoricPreaching extends Component {

    state = {
        allFiles: [],
        selectFile: '',
        isModalVisible: false,
        loadingPdf: false,
    }

    componentDidMount() {
        this.listAllFiles()
    }

    listAllFiles = () => {
        PreachingService.GetAllFiles(file => {
            let oldFiles = this.state.allFiles
            oldFiles.push(file)
            this.setState({ allFiles: oldFiles })
        })
    }

    openModalPdf = url => {
        this.setState({ selectFile: url, isModalVisible: true })
    }

    render() {
        return (
            <ContainerGray>
                {
                    this.state.allFiles.map((file, idx) => (
                        <View key={idx} style={{ marginBottom: 5, alignItems: 'center' }}>
                            <FilePdf onPress={() => this.openModalPdf(file.urlPdfPreaching)}>
                                <Icon name="pdf-box" size={50} color="#9c9c9c" style={{ margin: -5 }} />
                                <TextBoxPdf>{file.title}</TextBoxPdf>
                            </FilePdf>
                            <Text>{moment(file.dateUpload.seconds * 1000).format('DD-MM-YYYY')}</Text>
                        </View>
                    ))
                }
                <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
                    <ViewModal>
                        <Pdf scale={1.0} source={{ uri: this.state.selectFile || '' }} activityIndicatorProps={{ color:'#fff', progressTintColor: '#fff' }} style={{ width: '100%', height: '85%', paddingLeft: 35, paddingRight: 35 }} />
                        <CloseModal onPress={() => this.setState({ isModalVisible: false })}>
                            <Icon name="close-circle" color="#fff" size={32} />
                        </CloseModal>
                    </ViewModal>
                </Modal>
            </ContainerGray>
        )
    }
}