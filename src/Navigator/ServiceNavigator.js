import { createSwitchNavigator } from 'react-navigation'
import NoteCreator from '../Component/NoteServices/NoteCreator'
import AddLabel from '../Component/NoteServices/AddLabel'
import { createStackNavigator } from 'react-navigation-stack'
import SearchNotes from '../Component/NoteServices/SearchNotes'

export const ServiceNavigator = createStackNavigator(
    {
        NoteCreator:
        {
            screen: NoteCreator,
            navigationOptions: {
                headerShown: false,
            },
            path: 'notecreator'
        },
        AddLabel: { screen: AddLabel, navigationOptions: { headerShown: false } },
        Search: { screen: SearchNotes, navigationOptions: { headerShown: false } }
    }
)