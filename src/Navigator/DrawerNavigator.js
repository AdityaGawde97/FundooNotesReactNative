import React from 'react';
import { createDrawerNavigator } from "react-navigation-drawer";
import Notes from "../Component/MainScreens/DrawerPages/Notes";
import Reminder from "../Component/MainScreens/DrawerPages/Reminder";
import Archive from '../Component/MainScreens/DrawerPages/Archive';
import CountChart from "../Component/MainScreens/DrawerPages/CountChart";
import Trash from "../Component/MainScreens/DrawerPages/Trash"
import ContentComponent from '../Component/MainScreens/Dashboard/ContentComponent';

export const DrawerNavigator = createDrawerNavigator(
    {
        Notes: { screen: Notes },
        Reminder: { screen: Reminder },
        Archive: { screen: Archive },
        CountChart: { screen: CountChart },
        Trash: { screen: Trash }
    },
    {
        initialRouteName: 'Notes',
        contentComponent: ContentComponent,
        drawerWidth: 330
    }
);

