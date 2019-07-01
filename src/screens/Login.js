import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import axios from 'axios';


const url = 'http://192.168.43.61:5000';
export default class InlineLabelExample extends Component {

    state = {
        email: '',
        password: '',
        res: []
    }



    async handleLogin() {
        axios.post(`${url}/login`, {
            email: this.state.email,
            password: this.state.password
        })
            .then((res) => {
                if (res.data.token != null) {
                    AsyncStorage.setItem('token', res.data.token )  
                    AsyncStorage.setItem('name', res.data.name)
                    this.props.navigation.navigate('Chats')
                }
                else {
                    alert(res.data.error)
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }


    render() {
        return (
            <Container style={{marginTop:120,alignItems:'center'}}>
                <Text style={{ fontWeight:'bold',marginBottom:30,fontSize:35 }}>Login ChatApp</Text>
                <Content style={{ width:'90%' }}>
                    <Form >
                        <Item regular style={{
                            height: 45
                        }}>
                            <Input placeholder='Email'
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                            />
                        </Item>
                        <Item regular style={{
                            height: 45,
                            marginTop: 10
                        }}>
                            <Input 
                                secureTextEntry={true}
                                placeholder='Password'
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}

                            />
                        </Item>
                    </Form>
                    <Button block info style={{ marginTop: 15,borderRadius:10 }} onPress={() => this.handleLogin()}>
                        <Text>Log In</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}