import React, { Component } from 'react';
import { View,TouchableHighlight,TouchableOpacity,StyleSheet,AsyncStorage } from 'react-native';
import { Container, Header, Content, Footer, Text, Form, Item, Input, Button, Body,List,ListItem, Right, Left } from 'native-base';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Col, Row, Grid } from 'react-native-easy-grid';


export default class ChatList extends Component {

    state = {
        visible: false,
        name : ''
    }

     async componentWillMount(){
        const name = await AsyncStorage.getItem('name')
        this.setState({name:name})
    }

    render(){
        const cekUser = this.props.name
        
        return(
            <View>
                <TouchableOpacity onPress={()=>(cekUser == this.state.name) ? this.setState({visible:true} ) : alert('bukan user')}>
                    <Grid>
                        <Row style={ (cekUser == this.state.name) ? styles.listChatUser : styles.listChat }>
                            <Grid>
                                <Row>
                                    <Text style={{ fontWeight: 'bold', }}>{this.props.name}</Text>
                                </Row>
                                <Row>
                                    <Text>{this.props.chat}</Text>
                                </Row>
                            </Grid>
                        </Row>
                    </Grid>
               </TouchableOpacity>

               <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                    >
                    <DialogContent style={{ height:100, width:150,marginTop:10 }}>
                        <Button full transparent onPress={()=>{
                            this.setState({ visible: false })
                            this.props.edit()
                        }}>
                        <Text style={{ color:'black' }}>
                            Edit
                        </Text>
                        </Button>

                        <Button full transparent onPress={()=>{
                            this.setState({ visible: false })
                            this.props.delete()
                        }} >
                        <Text style={{ color:'black' }}>
                            Delete
                        </Text>
                        </Button>
                    </DialogContent>
                </Dialog>
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    listChat: {
        backgroundColor: 'white',
        marginTop:20,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 'auto',
        width:'50%'
    },
    listChatUser: {
        backgroundColor: '#dfe3ee',
        marginTop:20,
        height: 'auto',
        borderRadius: 5,
        marginRight: 5,
        marginLeft: 'auto',
        width:'50%',
    }
})