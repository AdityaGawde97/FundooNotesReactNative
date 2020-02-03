import React from 'react';
import { createDrawerNavigator } from "react-navigation-drawer";
import Notes from "../Component/MainScreens/DrawerPages/Notes";
import Reminder from "../Component/MainScreens/DrawerPages/Reminder";
import Archive from '../Component/MainScreens/DrawerPages/Archive';
import CountChart from "../Component/MainScreens/DrawerPages/CountChart";
import Trash from "../Component/MainScreens/DrawerPages/Trash"
import ContentComponent from '../Component/MainScreens/Dashboard/ContentComponent';
import Label from '../Component/MainScreens/DrawerPages/Label';
import DisplayNotes from '../Component/MainScreens/DrawerPages/DisplayNotes';

export const DrawerNavigator = createDrawerNavigator(
    {
        Notes: { screen: Notes },
        DisplayNotes : { screen: DisplayNotes },
        Reminder: { screen: Reminder },
        Label: { screen: Label },
        Archive: { screen: Archive },
        CountChart: { screen: CountChart },
        Trash: { screen: Trash }
    },
    {
        initialRouteName: 'Notes',
        contentComponent: ContentComponent,
        drawerWidth: 330,
    }
);

