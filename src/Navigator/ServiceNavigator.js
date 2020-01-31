import { createSwitchNavigator } from 'react-navigation'
import NoteCreator from '../Component/NoteServices/NoteCreator'
import EditLabels from '../Component/MainScreens/DrawerPages/EditLabels'
import AddLabel from '../Component/NoteServices/AddLabel'
import { createStackNavigator } from 'react-navigation-stack'

export const ServiceNavigator = createStackNavigator(
    {
        NoteCreator: { screen: NoteCreator, navigationOptions: { headerShown: false } },
        EditLabels: { screen: EditLabels, navigationOptions: { headerShown: false } },
        AddLabel: { screen: AddLabel, navigationOptions: { headerShown: false } }
    }
)