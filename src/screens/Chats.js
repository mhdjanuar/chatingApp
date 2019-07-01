import React, { Component } from 'react';
import { AsyncStorage,TouchableOpacity,Modal,View,TouchableHighlight } from 'react-native';
import { Container, Header, Content, Footer, Text, Form, Item, Input, Button, Body,List,ListItem, Right, Left } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ChatList from '../components/ChatList';
import axios from 'axios';

const url = 'http://192.168.43.61:5000';
export default class Chats extends Component {

  state = {
      userChat : [],
      id_users: '',
      chat: '',
      time: '',
      isUpdate:false
  }  

  componentDidMount(){
      setInterval(()=>{
        this.getData()
      }, 500);
  }

  async getData(){
    const token = await AsyncStorage.getItem('token')
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

  const rest =  axios.get(`${url}/chats`,config)
    .then((res)=>{
      this.setState({
        userChat : res.data
      })
    })

  }

  async postData(){
    const name = await AsyncStorage.getItem('name')
    
    const res = axios({
      method: 'post',
      url: `${url}/chats`,
      data: {
        name:name,
        chat:this.state.chat,
        time:'20.00'
      }
    });

    if(res){
      this.setState({chat:''})
    }
  }

  async patchData(){
    const name = await AsyncStorage.getItem('name')
    
    const res = axios({
      method: 'patch',
      url: `${url}/chats/${this.state.id_users}`,
      data: {
        name:name,
        chat:this.state.chat,
        time:'20.00'
      }
    });

    if(res){
      this.setState({chat:''})
    }
  }

  handleDelete(id){
    const res =  axios.delete(`${url}/chats/${id}`).then((res)=>{
      this.getData()
    })
  }

  handleEdit(id,chat){
    this.setState({
        id_users:id,
        chat:chat,
        isUpdate:true
       })
  }

  handleSubmit(){
    if(this.state.isUpdate == true){
      this.patchData()
      this.setState({isUpdate:false})
    }
    else{
      this.postData()
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor:'#CBCEFA' }}>
        <Header>
          <Right/>
          <Body style={{ marginRight:30 }}>
            <Text style={{ color:'white',fontWeight:'bold',fontSize:23 }}>ChatApp</Text>
          </Body>
          <Left/>
        </Header>
     
        <Content>
          {this.state.userChat.map((data)=>(
            <ChatList 
              name={data.name} 
              chat={data.chat} 
              delete={()=>this.handleDelete(data.id)} 
              edit={()=>this.handleEdit(data.id,data.chat)}
             />
          ))}
        </Content>
      
        <Footer style={{backgroundColor:'white'}}>
        <Content>
                <Grid>
                    <Col style={{ width:'82%' }}>
                        <Form>
                            <Item regular style={{
                                    height: 45
                            }}>
                            <Input placeholder='Send Chat'
                                        onChangeText={(chat) => this.setState({ chat })}
                                        value={this.state.chat}
                                    />
                            </Item>
                        </Form>
                    </Col>
                    <Col style={{ width:'20%' }}>
                        <Button onPress={()=>this.handleSubmit()}>
                            <Text>
                                send
                            </Text>
                        </Button>
                    </Col>
                </Grid>
                 
        </Content>
        </Footer>

      </Container>
    );
  }
}