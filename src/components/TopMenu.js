import React, { Component } from 'react'
import { Text, View, StyleSheet,Image,TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome,  faBars, faTimes, faCaretDown, faEdit ,faCog, faSignOutAlt, faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
export default class TopMenu extends Component {
    render() {
        return (
            <React.Fragment>
                <View style={styles.under}>
                        
                    <TouchableOpacity style={styles.userBtn} onPress={() => this.props.navigation.goBack()}  >
                    <FontAwesomeIcon 
                         
                         icon={faArrowLeft} 
                         color="white" 
                         size={24} 
                         style={{}} />
                    
                    <Text style={styles.precedent}>PRECEDENT</Text>
                    </TouchableOpacity>
                     
                   
                </View>
      
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    under: {
        backgroundColor : "#d3d3d3",
       opacity : 0.95,
        padding: hp("3%"),
        width: wp('50%'),
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
       marginBottom : 20,
       marginLeft : 20,
       borderRadius : 5
        
    },
    userBtn : {
        flexDirection : "row"
    },
    precedent : {
        marginLeft : 5,
        letterSpacing : 2,
        fontWeight : "bold",
        color : "#fff"
    },  
    title1: {
        fontSize: 26,
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    },
    logo: {
        backgroundColor: "white"
    },
    under2: {
        backgroundColor: "#008AC8",
        position: "absolute",
        top: 0,
        //left: wp('-50%'),
        zIndex: 99
    },
    under3: {
        flexDirection: 'row',
        paddingTop: 60,

        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',


    },
    textinput: {
        marginLeft: wp("15%"),
        textAlign: 'center',
        height: 50,
        width: wp("70%"),
        paddingLeft: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: hp('2%')
    },
    link: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: wp('25%'),
        paddingTop: hp("1%"),
        paddingBottom: hp("1%")
    },
    imgLink: {
        width: wp('15%'),
        height: wp('15%'),
        backgroundColor: '#008AC8',
        borderRadius: 400 / 2,
        marginRight: wp('2%')
    },
    imgText: {
        color: "white",
        fontSize: 24
    },
    decoView: {
        marginBottom: hp('5%'),
        alignItems: "center"
    },
    deco: {
        width: wp('60%'),
        borderWidth: 1,
        borderColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: hp('1%'),
        paddingTop: hp('1%')
    },
    imgDeco: {
        width: wp('11%'),
        height: wp('11%'),
        backgroundColor: '#008AC8',
        borderRadius: 400 / 2,
        marginRight: wp('2%')
    },
    decoText: {
        fontSize: 18,
        color: "white"
    },
    choice: {
        backgroundColor: "white",
        width: wp('70%'),
        position: "absolute",
        top: hp('5%'),
        zIndex: 34
    },
    choiceItem: {
        alignItems: "center",
        justifyContent: 'center',
        paddingBottom: hp("2%"),
        paddingTop: hp("2%"),

    }
})
