import React from 'react';
import { createDrawerNavigator } from "react-navigation-drawer";
import Label from '../Component/MainScreens/DrawerPages/Label';
import CountChart from "../Component/MainScreens/DrawerPages/CountChart";
import EditLabels from '../Component/MainScreens/DrawerPages/EditLabels'
import ContentComponent from '../Component/MainScreens/Dashboard/ContentComponent';
import DisplayNotes from '../Component/MainScreens/DrawerPages/DisplayNotes';
import DraggableList from '../Component/MainScreens/DrawerPages/DraggableList';
import DnD from '../Component/MainScreens/DrawerPages/DnD';
import GoogleMap from '../Component/MainScreens/DrawerPages/GoogleMap';
import FastImageDemo from '../Component/MainScreens/DrawerPages/FastImageDemo';
import WebWorker from '../Component/MainScreens/DrawerPages/WebWorker';
import HeadlessJs from '../Component/MainScreens/DrawerPages/HeadlessJs';
import MyDrawer from '../Component/MainScreens/Dashboard/MyDrawer';
import PushApp from '../Component/MainScreens/DrawerPages/PushApp';
import Sqlite from '../Component/MainScreens/DrawerPages/Sqlite';
import Settings from '../Component/MainScreens/DrawerPages/Settings';

export const DrawerNavigator = createDrawerNavigator(
    {
        DisplayNotes: { screen: DisplayNotes },
        Label: { screen: Label },
        CountChart: { screen: CountChart },
        EditLabels: { screen: EditLabels },
        DraggableList: { screen: DraggableList },
        DnD: { screen: DnD },
        GoogleMap: { screen: GoogleMap },
        FastImage: { screen: FastImageDemo },
        WebWorker: { screen: WebWorker },
        MyDrawer: { screen: MyDrawer },
        PushApp: { screen: PushApp },
        Sqlite: { screen: Sqlite },
        Settings: {screen:Settings}
        //HeadlessJs: { screen: HeadlessJs }
    },
    {
        initialRouteName: 'DisplayNotes',
        contentComponent: ContentComponent,
        drawerWidth: 330,
    }
);

