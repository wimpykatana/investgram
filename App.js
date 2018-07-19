import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';

import Home from './screens/Home';
import Loginlogo from './component/loginlogo/loginlogo';
import Profile from './screens/Profile';
import Chart from './screens/Chart';


class LoginActivity extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userPassword: ''
        }

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
              <View style={styles.container}>
                  <Loginlogo/>
                   <Text style={{fontSize: 30, marginBottom: 20, color: '#fff'}}>
                       Sign In
                   </Text>
                  <View style={styles.signinHolder}>
                  <TextInput

                      // Adding hint in Text Input using Place holder.
                      placeholder="Enter User Email"
                      placeholderTextColor='gray'
                      autoCapitalize="none"

                      onChangeText={userName => this.setState({userName})}

                      // Making the Under line Transparent.
                      underlineColorAndroid='transparent'

                      style={styles.fontColor}
                  />

                  <TextInput

                      // Adding hint in Text Input using Place holder.
                      placeholder="Enter User Password"
                      placeholderTextColor='gray'
                      autoCapitalize="none"

                      onChangeText={userPassword => this.setState({userPassword})}

                      // Making the Under line Transparent.
                      underlineColorAndroid='transparent'

                      style={styles.fontColor}

                      secureTextEntry={true}
                  />
                  </View>

                  <TouchableOpacity
                      style={styles.buttonStyle}
                      onPress={this.UserLoginFunction}
                  >
                      <Text style={{fontSize: 14, fontWeight: '600', color: '#333'}}>Sign In</Text>
                  </TouchableOpacity>
              </View>
            </SafeAreaView>
        );
    }

    UserLoginFunction = () => {
        console.log("click button");

        const { userName }  = this.state ;
        const { userPassword }  = this.state ;

        // fetch('http://investorsukses.com/reactphp/login.php',{
        fetch('http://192.168.100.2:8888/reactphp/login.php',{
           method: 'post',
            headers: {
               'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                'username': this.state.userName,
                'password': this.state.userPassword
            })
        })
            .then((respon) => respon.json())
            .then((res)=> {
                if(res.message === 'Data Matched')
                {
                    //Alert.alert(res.username+" "+res.userid+" "+res.usergender+" "+res.usergroup);
                    //Then open Profile activity and send user email to profile activity.
                    this.props.navigation.navigate('Home', { Data: res });
                }
                else{

                    Alert.alert(res);
                }
            }).catch(( error )=>{
                console.error(error);
            })
    }
}

export default MainProject = createStackNavigator(
    {
        First: {
                screen: LoginActivity,
        },
        Home:{
            screen: Home
        }

    },
    {
        headerMode: 'none',
    });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
      paddingTop: 30
  },
  fontColor:{
    color:'#333',
    backgroundColor: 'white',
      fontSize: 14,
      width: 250,
      height: 30,
      paddingHorizontal: 8,
      marginBottom: 10,
      borderRadius: 3,
      textAlignVertical: 'center'
  },
    signinHolder:{
        borderWidth: 2, borderColor: 'rgba(255,255,255,0.15)',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderRadius: 8
    },
    buttonStyle:{
      backgroundColor: '#f3ce21',
        marginVertical: 20,
        width: 290,
        borderRadius: 10,
        paddingVertical: 8,
        alignItems: 'center',

    }
});
