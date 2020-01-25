import { createSwitchNavigator } from 'react-navigation'
import NoteCreator from '../Component/NoteServices/NoteCreator'
import Profile from '../Component/NoteServices/Profile'

export const ServiceNavigator = createSwitchNavigator(
    {
        NoteCreator: { screen: NoteCreator }
    },
    {
        initialRouteName: 'NoteCreator'
    }
)