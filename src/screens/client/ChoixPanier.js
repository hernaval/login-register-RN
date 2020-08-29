import React, { Component, memo } from 'react'
import { Text, View, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native'
import { panierClient, simplePanier } from '../../API/client/list'
import { TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { TouchableRipple, Avatar, Button, List, Badge } from 'react-native-paper'
import { commander } from '../../API/client/commande'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MENU_URI } from "../../core/config";
import { currentClient, getAllKey, getDate, remoteDate } from "../../core/session";
import TopMenu from "../../components/TopMenu"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import DateTimePicker from '@react-native-community/datetimepicker';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'

class ChoixPanier extends Component {
    constructor() {
        super()
        this.state = {
            carts : [],
            paniers: [],
            
           
            isLoading: false,

            isOpenDate: false,
            isOpenTime: false,

            dateRecep : new Date(),
            heureRecep : new Date(),

            isSurPlace : true
        }
            

    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        
        await this.fetchMaPanierKey()
        await this.fetchMaPanierProduit()

        this.setState({ isLoading: false })
        console.log("eto e",this.state.paniers[0])
    }

    fetchMaPanierProduit = async() =>{
        const keys = this.state.carts
        let ids = [];
        
        for(let i=0;i<keys.length;i++) {
            let panier = await getDate(keys[i])

            let ob = JSON.parse(panier)
            
            ids.push(ob[0])
        }

        this.setState({paniers : ids})
        
    }

    fetchMaPanierKey = async() =>{
        const allKeyStorage = await getAllKey()
        const cart = []

        allKeyStorage.forEach(el=>{
            el.split("_")[0] === "carts" ? cart.push(el) : ""
        })
        this.setState({carts : cart})
    }
   
    removeCart = async  id =>{
        const key = "carts_"+id
        await remoteDate(id)
        await this.fetchMaPanierProduit()
    }

    

    
    renderPanier = (index, image, nom_menu, prix) => (
        <List.Item
            key={index}
            style={{ backgroundColor: "#d3d3d3", margin: 10 }}
            title={nom_menu}
            titleStyle={{ fontWeight: "bold" }}
            //  descriptionStyle={}
            left={props => <Avatar.Image source={{ uri: `${MENU_URI}/${image}` }} size={70} />}
            right={props => <TouchableOpacity style={{ ...props }, { alignItems: "center" }} onPress={() => this.removeCart(index)}>
                     <Text style={{ fontWeight: "bold",color : "red" }}>supprimer X</Text>
                     
                 </TouchableOpacity>}
        />
    )
    _formatTime(date) {
        hour = date.getHours()
        minutes = date.getMinutes()

        hour = hour < 10 ? "0" + hour : hour
        minutes = minutes < 10 ? "0" + minutes : minutes

        return hour + ":" + minutes
    } 
    
    _fortmatDate(date) {
        year = date.getFullYear();
        month = date.getMonth() + 1;
        dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return year + '-' + month + '-' + dt
    }
    render() {
        return (
            <ImageBackground
                source={require("../../../assets/large2.jpg")}
                style={{ flex: 1, width: "100%" }}
            >
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}

                <View style={{margin : 10}}
                >
                    <Text style={styles.sellers}>MES PANIERS</Text>
                    <View style={styles.divider}></View>
                </View>
               
                <View style={{ backgroundColor: "white", margin: 10, maxHeight: hp("60%") }} >

                    <ScrollView>
                        {this.state.paniers !== undefined && this.state.paniers.map((panier, i) => {
                            return this.renderPanier(panier.Code_produit, panier.file, panier.Nom_menu, panier.Prix)
                        })}


                    </ScrollView>


                </View>

                <Button onPress={()=> this.props.navigation.navigate("ChoixCommander" , {Num_prestataire : this.props.navigation.state.params.Num_prestataire2 })}
                 style={{backgroundColor :"red"}} mode="contained">Commencer maintenant</Button>

                <View>
                    <TopMenu navigation={this.props.navigation}   />
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        zIndex: 10,
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sellers : {
        color : "#ffff",
        opacity : 0.7,
        fontSize : 20,
        
    },
    divider : {
        borderTopWidth : 1,
        borderTopColor : "#fff"
    },
})

export default memo(ChoixPanier)
