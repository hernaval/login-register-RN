import React, { memo } from 'react'
import { View, Text, ImageBackground, StyleSheet,TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Avatar, Button } from 'react-native-paper';
const HomeScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require("../../assets/home.jpg")}
            style={{ flex: 1, width: "100%" }}>
            <View style={styles.container}>

                <View style={{flexDirection : "row",margin : 20}}>
                    <Text style={{color : "white",margin : 3,fontSize : 22}}>PIZZA</Text>
                    <Text style={{color : "#EDF514",margin  : 3,fontSize : 22}}>REUNION</Text>
                </View>

                <TouchableOpacity style={[styles.cardContainer, {
                    backgroundColor: "#046504", opacity: 0.75,
                    width: wp('90%'),
                    marginBottom : hp("1%")
                }]}
                // onPress={()=>navigation.navigate("LoginScreen",{express :false, isNewCli : false})} 
                onPress={()=>navigation.navigate("ChoixPizzeria") }
                >

                
                    <Avatar.Image size={70} source={require("../../assets/assietePizza.png")} />
                    <Text style={styles.label}>COMMANDER VOTRE PIZZA</Text>
                    <Text style={[styles.label,{fontSize : 10,margin : 2}]}>Sélectionnez votre pizzeria parmi nos nombreux partenaires</Text>
               
                </TouchableOpacity>

                

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={[styles.cardContainer, {
                        backgroundColor: "#A20F0F", opacity: 0.75,
                        width: wp('45%') }]}
                        onPress={()=> navigation.navigate("LoginScreen",{express : true, isNewCli : false})}
                   >
                   
                        <Avatar.Image size={70} source={require("../../assets/assietePizza.png")} />
                        <Text style={styles.label}>COMMANDE EXPRESS</Text>
                       
                   
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.cardContainer, {
                        backgroundColor: "#10AC9D", opacity: 0.75,
                        width: wp('45%')
                    }]}
                    onPress={()=>navigation.navigate("LoginPrestataire")}>
                        <Avatar.Image size={70} source={require("../../assets/assietePizza.png")} />
                        <Text style={styles.label}>PARTENARIAT</Text>
                     
                    </TouchableOpacity>
                    
                  
                </View>

            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    cardContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,


        marginRight: 10,
        borderRadius: 5
    },
    label : {
        color : "#E6F7F6",
        textAlign : "center"
    }
})



export default memo(HomeScreen)