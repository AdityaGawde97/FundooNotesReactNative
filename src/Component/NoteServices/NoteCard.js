import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { styles4 } from '../../Css/NoteService.style';

function NoteCard(props) {
    return (
        <Card style={
            [
                styles4.noteCard,
                {
                    backgroundColor: props.BgColor,
                    borderWidth: props.BgColor === '#ffffff' ? 1 : 0
                }
            ]
        }
        >
            <Card.Content style={{paddingVertical: 5}}>
                <Title style={{ fontSize: 18 }}> {props.Title} </Title>
                <Paragraph> {props.Content} </Paragraph>
            </Card.Content>
        </Card>
    );
}

export default NoteCard;