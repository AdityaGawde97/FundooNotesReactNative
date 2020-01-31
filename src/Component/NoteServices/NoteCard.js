import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { styles4 } from '../../Css/NoteService.style';
import { Chip, Icon } from 'material-bread';
import { globalStyle } from '../../Css/GlobalStyle.style';
import moment from 'moment';

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
            onPress={() => props.Navigate.navigation.navigate('NoteCreator',
                {
                    'noteObj': item,
                    backToPage: props.page,
                    'uid': props.uid
                }
            )}
        >
            <Card.Content style={{ paddingVertical: 5 }}>
                {
                    item.Title !== '' && <Title style={{ fontSize: 18 }}> {item.Title} </Title>
                }
                {
                    item.Content !== '' && <Paragraph> {item.Content} </Paragraph>
                }

                {
                    item.ReminderDate !== undefined &&
                    <Chip
                        style={{ margin: 5, }}
                        text={
                            moment(item.ReminderDate).format('MMM D')
                            + ', ' + item.ReminderTime
                        }
                        chipStyle='outlined'
                        leftIcon={<Icon name='alarm' size={20} color={globalStyle.inherit} />}
                    />
                }

            </Card.Content>
        </Card>
    );
}

export default NoteCard;