import React from 'react'

import Dashboard from '../../screens/Dashboard'
import SearchCap from '../../screens/SearchCap'
import Cap from '../../screens/Cap'
import ListCaps from '../../screens/ListCaps'
import RegisterCap from '../../screens/RegisterCap'
import Feedback from '../../screens/Feedback'
import FeedbackList from '../../screens/FeedbackList'
import FeedbackDetails from '../../screens/FeedbackDetails'
import LeaderCap from '../../screens/LeaderCap'
import ListLeaderCap from '../../screens/ListLeaderCap'
import RegisterLeaderCap from '../../screens/RegisterLeaderCap'

const Routes = [
    {
        id: 'Dashboard',
        title: 'Dashboard',
        icon: 'view-dashboard-outline',
        screen: Dashboard,
        hide: false,
    },
    {
        id: 'Pesquisar Cap',
        title: 'Pesquisar Cap',
        icon: 'map-search-outline',
        screen: SearchCap,
        hide: false,
    },
    {
        id: 'Casa de Paz',
        title: 'Casa de Paz',
        icon: 'home-outline',
        screen: Cap,
        hide: false,
    },
    {
        id: 'Listar Caps',
        title: 'Listar Caps',
        icon: 'pin-outline',
        screen: ListCaps,
        hide: true,
    },
    {
        id: 'Cadastrar Cap',
        title: 'Cadastrar Cap',
        icon: 'pin-outline',
        screen: RegisterCap,
        hide: true,
    },
    {
        id: 'Feedback',
        title: 'Feedback',
        icon: 'ballot-recount-outline',
        screen: Feedback,
        hide: false,
    },
    {
        id: 'Listar Feedbacks',
        title: 'Listar Feedbacks',
        icon: 'ballot-recount-outline',
        screen: FeedbackList,
        hide: true,
    },
    {
        id: 'Detalhes do Feedback',
        title: 'Detalhes do Feedback',
        icon: 'ballot-recount-outline',
        screen: FeedbackDetails,
        hide: true,
    },
    {
        id: 'Líderes de Cap',
        title: 'Líderes de Cap',
        icon: 'account-multiple-outline',
        screen: LeaderCap,
        hide: false,
    },
    {
        id: 'Listar Líderes',
        title: 'Listar Líderes',
        icon: 'account-multiple-outline',
        screen: ListLeaderCap,
        hide: true,
    },
    {
        id: 'Cadastrar Líder',
        title: 'Cadastrar Líder',
        icon: 'account-multiple-outline',
        screen: RegisterLeaderCap,
        hide: true,
    },
]

export default Routes
