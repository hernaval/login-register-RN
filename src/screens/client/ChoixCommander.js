import React, { Component, memo } from 'react'
import { Text, View, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native'
import { panierClient, simplePanier } from '../../API/client/list'
import { TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { TouchableRipple, Avatar, Button, List, Badge, TextInput } from 'react-native-paper'
import { commander } from '../../API/client/commande'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MENU_URI } from "../../core/config";
import { currentClient, getAllKey, getDate, remoteDate, clearAll } from "../../core/session";
import TopMenu from "../../components/TopMenu"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import DateTimePicker from '@react-native-community/datetimepicker';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
import { isUserExist, signUpClient } from '../../API/client/authClient'

class ChoixCommander extends Component {
    constructor() {
        super()
        this.state = {
            carts: [],
            paniers: [],


            isLoading: false,

            isOpenDate: false,
            isOpenTime: false,

            dateRecep: new Date(),
            heureRecep: new Date(),

            isSurPlace: true
        }

        this.nom = ""
        this.prenom = ""
        this.telephone = ""
        this.codepostal = ""
        this.email = ""

    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await this.fetchMaPanierKey()
        await this.fetchMaPanierProduit()

        this.setState({ isLoading: false })

        
        
    }

    fetchMaPanierProduit = async () => {
        const keys = this.state.carts
        let ids = [];

        for (let i = 0; i < keys.length; i++) {
            let panier = await getDate(keys[i])

            let ob = JSON.parse(panier)

            ids.push(ob[0])
        }

        this.setState({ paniers: ids })

    }

    fetchMaPanierKey = async () => {
        const allKeyStorage = await getAllKey()
        const cart = []

        allKeyStorage.forEach(el => {
            el.split("_")[0] === "carts" ? cart.push(el) : ""
        })
        this.setState({ carts: cart })
    }

    removeCart = async id => {
        const key = "carts_" + id
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
                <Text style={{ fontWeight: "bold", color: "red" }}>supprimer X</Text>

            </TouchableOpacity>}
        />
    )
    _formatTime(date) {
        let  hour = date.getHours()
        let minutes = date.getMinutes()

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

    _toPanierSimple = () =>{
        let paniers = this.state.paniers

        let ob = [
            {id_client : 1}
        ]
    }

    sendCommande = async () => {
        this.setState({ isLoading: true })
        
        let userExisting = await isUserExist(this.email)
        const now = new Date()
        let ref = Math.round(now.getTime() / 100000)
        let md = this.state.isSurPlace ===true ? "sur place" : "A emporter"

        if(userExisting == 0){
          await signUpClient({
            nom: this.nom,
           phone : this.prenom,
            pseudo:"ps_"+Math.random(111,222),
            email: this.email,
            password:Math.random().toString(36).substring(8)
          })

        } 
        
            let cartToSend = this.state.paniers
            for(let i =0;i<cartToSend.length;i++){
                cartToSend[i]["id_client"] = this.email
            }
            //console.log(cartToSend)
            let response = await commander(
                this.state.paniers,
                ref,
               this._fortmatDate(this.state.dateRecep),
               this._formatTime(this.state.heureRecep) ,
               md,
                ["1","2"],
                this.codepostal
            )

            await clearAll()
    
        this.setState({ isLoading: false })
        this.props.navigation.navigate("Notifications", { ref_commande: ref })

    }
    render() {
        return (
            <ImageBackground
                source={require("../../../assets/large2.jpg")}
                style={{ flex: 1, width: "100%", justifyContent: "center" }}
            >
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}



                <View style={styles.container}>
                    <View style={styles.details}>
                        <Text style={styles.greeting}>DETAILS : </Text>
                        <Text>Magasin : gastor</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.title}>Total : </Text>
                            <Text style={styles.greeting}>12</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.greeting}>NOM</Text>
                        <TextInput style={styles.input}
                            onChangeText={(text) => this.nom  =text}
                        />
                        <Text style={styles.greeting}>PRENOM</Text>
                        <TextInput style={styles.input}
                            onChangeText={(text) => this.prenom  =text}
                        />
                        <Text style={styles.greeting}>TELEPHONE</Text>
                        <TextInput style={styles.input}
                            onChangeText={(text) =>this.telephone = text}
                        />
                        <Text style={styles.greeting}>CODE POSTAL</Text>
                        <TextInput keyboardType={"numeric"} style={styles.input}
                            onChangeText={(text) => this.codepostal = text}
                        />
                        <Text style={styles.greeting}>EMAIL</Text>
                        <TextInput autoCapitalize="none" style={styles.input} 
                            onChangeText={(text) => this.email = text}
                        />

                        <View style={[styles.details,{marginTop : 9}]}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 9 }}>
                                <TouchableOpacity onPress={() => this.setState({ isOpenDate: true })} style={{ flexDirection: "row", alignItems: "center" }}>
                                    <FontAwesomeIcon color="#d3d3d3" size={24} icon={faCalendar} />
                                    <Text style={{ color: "#d3d3d3" }} >Date de réception</Text>
                                </TouchableOpacity>
                                <Text style={{ color: "#d3d3d3" }}>{this._fortmatDate(this.state.dateRecep)}</Text>
                            </View>

                            <View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between",marginTop : 9 }}>
                                        <TouchableOpacity onPress={() => this.setState({ isOpenTime: true })} style={{ flexDirection: "row", alignItems: "center" }}>
                                            <FontAwesomeIcon color="#d3d3d3" size={24} icon={faClock} />
                                            <Text style={{ color: "#d3d3d3" }} >Heure de réception</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: "#d3d3d3" }}>{this._formatTime(this.state.heureRecep)}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-evenly",marginTop : 9 }}>
                                    <TouchableOpacity onPress={() => this.setState({ isSurPlace: true })} style={this.state.isSurPlace === true ? { backgroundColor: "red", padding: 20 } : { backgroundColor: "#d3d3d3", padding: 20 }}>
                                        <Text >Sur place</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ isSurPlace: false })} style={this.state.isSurPlace === false ? { backgroundColor: "red", padding: 20 } : { backgroundColor: "#d3d3d3", padding: 20 }}>
                                        <Text>A emporter</Text>
                                    </TouchableOpacity>
                                </View>


                                {this.state.isOpenDate === true &&
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={0}
                                        value={this.state.dateRecep}
                                        mode="date"

                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            this.state.dateRecep = selectedDate
                                            this.setState({ isOpenDate: false })
                                           
                                        }}
                                    />
                                }

                                {this.state.isOpenTime === true &&
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={0}
                                        value={this.state.heureRecep}
                                        mode="time"
                                        is24Hour={true}
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            this.state.heureRecep = selectedDate
                                            this.setState({ isOpenTime: false })
                                            
                                        }}
                                    />
                                }


                        </View>


                    </View>

                    <Button onPress={()=>this.sendCommande()} mode="contained" style={{backgroundColor : "red",marginTop : 12}}>
                        Commander maintenant
                    </Button>

                </View>

                <View>
                    <TopMenu navigation={this.props.navigation}   />
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
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
    title: {
        color: "#a0a0a0"
    },
    greeting: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },

    details: {
        backgroundColor: "#330000",
        opacity: 0.7,
        padding: 10
    },
    sellers: {
        color: "#ffff",
        opacity: 0.7,
        fontSize: 20,

    },
    divider: {
        borderTopWidth: 1,
        borderTopColor: "#fff"
    },

    input: {
        backgroundColor: "#fff",
        padding: 10,
        height: 20,
        borderRadius: 3,
        width: wp("90%")
    },
})

export default memo(ChoixCommander)
