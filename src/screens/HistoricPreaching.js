import React, { Component } from 'react'
import { View, Text, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

import PreachingService from '../services/PreachingService'

import { ContainerGray, FilePdf, TextBoxPdf } from './styles/HistoricPreachingStyled'

export default class HistoricPreaching extends Component {

    state = {
        allFiles: []
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

    openModalPdf = () => {
        console.warn("Clicou");
        
    }

    render() {
        return (
            <ContainerGray>
                {
                    this.state.allFiles.map((file, idx) => (
                        <View key={idx} style={{ marginBottom: 5, alignItems: 'center' }}>
                            <FilePdf onPress={() => this.openModalPdf()}>
                                <Icon name="pdf-box" size={50} color="#9c9c9c" />
                                <TextBoxPdf>{file.title}</TextBoxPdf>
                            </FilePdf>
                            <Text>{moment(file.dateUpload.seconds * 1000).format('DD-MM-YYYY')}</Text>
                        </View>
                    ))
                }
            </ContainerGray>
        )
    }
}