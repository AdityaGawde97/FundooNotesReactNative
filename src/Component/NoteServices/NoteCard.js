import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { styles4 } from '../../Css/NoteService.style';

function NoteCard(props) {
    const item = props.Item
    return (
        <Card style={
            [
                styles4.noteCard,
                {
                    backgroundColor: item.BgColor,
                    borderWidth: item.BgColor === '#ffffff' ? 1 : 0
                }
            ]
        }
        onPress={()=>props.Navigate.navigation.navigate('NoteCreator',{'noteObj':item})}
        >
            <Card.Content style={{paddingVertical: 5}}>
                <Title style={{ fontSize: 18 }}> {item.Title} </Title>
                <Paragraph> {item.Content} </Paragraph>
            </Card.Content>
        </Card>
    );
}

export default NoteCard;