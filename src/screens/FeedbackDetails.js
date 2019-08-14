import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import IconIonicon from 'react-native-vector-icons/Ionicons'
import Collapsible from 'react-native-collapsible';

import { ContainerGray } from './styles/MainStyled'
import { BigCard, Row, CardLeft, LargeCard, Circle, ItemIcon, TextCard, SimpleCard, HeaderCard } from './styles/FeedbackDetailsStyled'

export default class FeedbackDetails extends Component {
    state = {
        collapsed: true,
    }

    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        return (
            <ContainerGray>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <BigCard>
                        <Text style={{ fontSize: 15 }}>Líder: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Annabeth Chase</Text></Text>
                        <Text style={{ fontSize: 15 }}>Sublíder: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Hermione Grange</Text></Text>
                        <Text style={{ fontSize: 15 }}>Supervisor: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Gina Weasley</Text></Text>
                    </BigCard>
                    <Row>
                        <CardLeft>
                            <ItemIcon>
                                <Icon name="users" size={22} color="#f68121" />
                            </ItemIcon>
                            <TextCard>10 pessoas</TextCard>
                        </CardLeft>
                        <CardLeft>
                            <ItemIcon>
                                <Icon name="bar-chart-2" size={25} color="#f68121" />
                            </ItemIcon>
                            <TextCard>10 Conversões</TextCard>
                        </CardLeft>
                    </Row>
                    <LargeCard>
                        <Circle>
                            <Icon name="feather" size={22} color="#f68121" />
                        </Circle>
                        <TextCard>10 milagres</TextCard>
                    </LargeCard>
                    <SimpleCard>
                        <HeaderCard onPress={() => this.toggleExpanded()}>
                            <Text style={{ fontSize: 14, textTransform: "uppercase", color: '#fff', fontWeight: 'bold' }}>Descrição dos Milagres</Text>
                            <IconIonicon name={this.state.collapsed ? "ios-arrow-down" : "ios-arrow-up"} size={22} color="#fff" />
                        </HeaderCard>
                        <Collapsible style={{ backgroundColor: '#fff' }} collapsed={this.state.collapsed} duration={500}>
                            <View>
                                <Text style={{ marginHorizontal: 10, marginVertical: 5, textAlign: 'center', fontSize: 15 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</Text>
                            </View>
                        </Collapsible>
                    </SimpleCard>
                </ScrollView>
            </ContainerGray>
        )
    }
}