import { createSwitchNavigator } from 'react-navigation'
import NoteCreator from '../Component/NoteServices/NoteCreator'
import EditLabels from '../Component/MainScreens/DrawerPages/EditLabels'
import AddLabel from '../Component/NoteServices/AddLabel'
import { createStackNavigator } from 'react-navigation-stack'
import SearchNotes from '../Component/NoteServices/SearchNotes'

export const ServiceNavigator = createStackNavigator(
    {
        NoteCreator: { screen: NoteCreator, navigationOptions: { headerShown: false }, path: 'notecreator' },
        EditLabels: { screen: EditLabels, navigationOptions: { headerShown: false } },
        AddLabel: { screen: AddLabel, navigationOptions: { headerShown: false } },
        Search: { screen: SearchNotes, navigationOptions: { headerShown: false } }
    }
)