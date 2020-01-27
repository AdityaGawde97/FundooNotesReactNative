import { createSwitchNavigator } from 'react-navigation'
import NoteCreator from '../Component/NoteServices/NoteCreator'
import NoteEditor from '../Component/NoteServices/NoteEditor'

export const ServiceNavigator = createSwitchNavigator(
    {
        NoteCreator: { screen: NoteCreator },
        NoteEditor: { screen: NoteEditor }
    }
)