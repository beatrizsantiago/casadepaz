import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import IconIonicon from 'react-native-vector-icons/Ionicons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import Collapsible from 'react-native-collapsible';

import { ContainerGray } from './styles/MainStyled'
import { BigCard, Row, CardLeft, LargeCard, Circle, ItemIcon, TextCard, SimpleCard, HeaderCard } from './styles/FeedbackDetailsStyled'

export default class FeedbackDetails extends Component {
    state = {
        collapsed: true,
        feedback: {}
    }

    componentDidMount() {
        const { feedback } = this.props.navigation.state.params
        this.setState({ feedback })
    }

    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const { feedback } = this.state

        return (
            <ContainerGray>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <BigCard>
                        <Text style={{ fontSize: 15 }}>Líder: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{feedback.leader}</Text></Text>
                        <Text style={{ fontSize: 15 }}>Sublíder: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{feedback.subLeader}</Text></Text>
                        <Text style={{ fontSize: 15 }}>Supervisor: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{feedback.supervisor}</Text></Text>
                    </BigCard>
                    <Row>
                        <CardLeft>
                            <ItemIcon>
                                <Icon name="users" size={22} color="#f68121" />
                            </ItemIcon>
                            <TextCard>{feedback.quantityPeople} pessoas</TextCard>
                        </CardLeft>
                        <CardLeft>
                            <ItemIcon>
                                <Icon name="bar-chart-2" size={25} color="#f68121" />
                            </ItemIcon>
                            <TextCard>{feedback.quantityConversion} Conversões</TextCard>
                        </CardLeft>
                    </Row>
                    {
                        feedback.miracles ?
                            (<View>
                                <LargeCard>
                                    <Circle>
                                        <IconFontAwesome name="smile-o" size={30} color="#f68121" />
                                    </Circle>
                                    <TextCard>{feedback.quantityMiracles} milagres</TextCard>
                                </LargeCard>
                                <SimpleCard>
                                    <HeaderCard onPress={() => this.toggleExpanded()}>
                                        <Text style={{ fontSize: 14, textTransform: "uppercase", color: '#fff', fontWeight: 'bold' }}>Descrição dos Milagres</Text>
                                        <IconIonicon name={this.state.collapsed ? "ios-arrow-down" : "ios-arrow-up"} size={22} color="#fff" />
                                    </HeaderCard>
                                    <Collapsible style={{ backgroundColor: '#fff' }} collapsed={this.state.collapsed} duration={500}>
                                        <View>
                                            <Text style={{ marginHorizontal: 10, marginVertical: 5, textAlign: 'center', fontSize: 15 }}>{feedback.descriptionMiracles ? feedback.descriptionMiracles : "Não há nenhuma descrição"}</Text>
                                        </View>
                                    </Collapsible>
                                </SimpleCard>
                            </View>)
                            :
                            (<LargeCard>
                                <Circle>
                                    <Icon name="alert-triangle" size={22} color="#f68121" />
                                </Circle>
                                <TextCard>Não houve milagre hoje!</TextCard>
                            </LargeCard>)
                    }

                </ScrollView>
            </ContainerGray>
        )
    }
}