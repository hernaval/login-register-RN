import React, { Component, memo } from 'react'
import { Text, View, ImageBackground, ActivityIndicator, Image, ToastAndroid, StyleSheet } from 'react-native'
import { pizzaByPrestataire } from '../../API/client/list'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { addToPanier } from '../../API/client/commande'
import { List, Avatar, Button, Divider, TextInput } from 'react-native-paper';
import Background from '../../components/Background'
import { MENU_URI } from '../../core/config'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { currentClient, storeDate, getDate, getAllKey } from "../../core/session";
import TopMenu from "../../components/TopMenu"
import { Rating, AirbnbRating } from 'react-native-ratings';
class ChoixPizza extends Component {
    constructor() {
        super()
        this.state = {
            pizzas: [],
            isLoading: false,
            note: 1,
            
        }
        this.nb = null
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await this.fetchPizzaOwn()
        this.setState({ isLoading: false })

        let a = await getAllKey()
        console.log(a)
    }

    

    fetchPizzaOwn = async () => {
        let piz = await pizzaByPrestataire(this.props.navigation.state.params.Num_prestataire)

        this.setState({ pizzas: piz })
    }

    addPanier = async (Code_produit) => {
        this.setState({ isLoading: true })
        let id_client = this.state.client["id_client"]
        let Num_prestataire = this.props.navigation.state.params.Num_prestataire

        let res = await addToPanier({ Code_produit, id_client, Num_prestataire })

        console.log(res)

        res === "yet" ?
            ToastAndroid.show("Ajouté au panier", ToastAndroid.SHORT)
            : ToastAndroid.show("Déjà dans le panier", ToastAndroid.SHORT)
        this.setState({ isLoading: false })
    }

    addCart = async (id) => {
        const nb = this.nb
        
        if(nb != null){
            const key = `carts_${id}`
            if(!(await getDate(key))){
                const pizza = this.state.pizzas.filter(el =>el.Code_produit = id)
                await storeDate(key,JSON.stringify(pizza))
            }else{
                console.log("efa ao e")
            }
            
        }   
        
    }

    renderPizza = (id, nom_menu, type, image, prix, taille) => (
        <View
            key={id}
            style={styles.renduPizza}

        >   
            
            <Image 
                source={{ uri: `${MENU_URI}/${image}` }}
                style={styles.imagePizza}
            />
            <Text style={styles.nomPizza}>{nom_menu}</Text>
            <Text style={styles.prixPizza}>{prix}€</Text>
            <Text style={styles.typePizza}>{type}</Text>
            <Text style={styles.typePizza}>{taille}</Text>
            <View style={styles.btnAction}>
                
            <TextInput onChangeText={(text) => this.nb = text} keyboardType={"numeric"} style={styles.nbPizza} />
                
                <TouchableOpacity onPress={()=>this.addCart(id)}
                 style={styles.panierPizza}>
                    <Text>AJOUTER</Text>
                </TouchableOpacity>
            </View>

        </View>

        // <List.Item
        //     key={id}
        //     style={{ backgroundColor: "#d3d3d3", margin: 10 }}
        //     title={nom_menu}
        //     description={description}
        //     titleStyle={{ fontWeight: "bold" }}
        //     //  descriptionStyle={}
        //     left={props => <Avatar.Image source={{ uri: `${MENU_URI}/${image}` }} size={70} />}
        //     right={props => <TouchableOpacity style={{ ...props }, { alignItems: "center" }} onPress={() => this.addPanier(id)}>
        //         <Text style={{ fontWeight: "bold" }}>{prix} Euro</Text>
        //         <FontAwesomeIcon size={20} icon={faCartPlus} />
        //     </TouchableOpacity>}
        // />
    )

   

    render() {
        return (

            /*  {this.state.pizzas.map((pizza,i)=>{
                 return <TouchableOpacity key={i} onPress={()=> this.addPanier(pizza.Code_produit)}>
                     <Text>
                         {pizza.Nom_menu}
                     </Text>
                 </TouchableOpacity>
             })} */

            <ImageBackground
                source={require("../../../assets/large2.jpg")}
                style={styles.container}
            >
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}

             <View style={styles.container}
             >

             
                <View style={{margin : 10}}
                >
                    <Text style={styles.sellers}>LES NOUVEAUTES ET LES BEST SELLERS</Text>
                    <View style={styles.divider}></View>
                </View>
              
                <View style={{ margin: 10 }}>
                    <View >
                        <ScrollView horizontal={true}>
                            {this.state.pizzas.length > 0 && this.state.pizzas.map((pizza, i) => {
                                return this.renderPizza(pizza.Code_produit, pizza.Nom_menu, pizza.Type, pizza.file, pizza.Prix,pizza.Taille)
                            })}
                        </ScrollView>
                    </View>

                    {this.state.isLoading === false && <View>

                        <Button loading={this.state.isLoading} labelStyle={{ color: "#000" }} style={{ backgroundColor: "white", marginTop: 20 }} mode="contained" onPress={() => this.props.navigation.navigate("ChoixPanier", { Num_prestataire2: this.props.navigation.state.params.Num_prestataire })}>
                            Voir votre panier
                         </Button>

                        <View>


                        </View>

                    </View>}



                </View>

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
        flex : 1,
        justifyContent : "center",
        
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
     
    renduPizza : {
        maxWidth : 300,
        display : "flex",
        flexDirection : "column",
        marginRight : wp("3%"),
        borderRadius : 3
    },
    imagePizza : {
        width : wp("60%"),
        height : hp("30%"),
        marginBottom : hp("1%")
    },
    nomPizza : {
        fontSize : 17,
        textTransform : "uppercase",
        color : "#edf2fa",
        fontWeight : "bold"

    },
    prixPizza :{
        fontSize : 15,
        textTransform : "uppercase",
        color : "#edf2fa",
        fontWeight : "bold"
    },
    typePizza : {
        backgroundColor : "#fff",
        padding : 10,
        borderRadius : 3,
        marginBottom : hp("1%")
    },
    panierPizza : {
        backgroundColor: "red",
        padding : 12,
        borderRadius : 3,
        color : "#fff"
    },
    nbPizza : {
        backgroundColor : "#fff",
        padding : 1,
        height : 20,
        borderRadius : 3,
        width : wp("30%")
    },
    btnAction : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-between"
    }
})

export default memo(ChoixPizza)

