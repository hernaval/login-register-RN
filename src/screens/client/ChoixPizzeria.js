import React, { memo, useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, AsyncStorage, TextInput } from 'react-native'

import { Button } from 'react-native-paper';
import TopMenu from "../../components/TopMenu"
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { allPrestataire } from '../../API/client/list'



class ChoixPizzeria extends React.Component {
    constructor() {
        super()
        this.state = {
            prestataires : [],
            isLoading : false,
        }
    }
    componentDidMount = async () => {
        
    }

    goToProduit = (num) => {
        this.props.navigation.navigate("ChoixPizza",{Num_prestataire : num})
    }

    renderPresta =async  value =>{
        this.setState({isLoading : true})
        let prestataires = await allPrestataire(value)
        this.setState({ prestataires: prestataires, isLoading : false })
        console.log(this.state.prestataires)
    }


    render() {
        console.log("render")
        return (

            <ImageBackground
                source={require("../../../assets/large2.jpg")}
                style={{ flex: 1, width: "100%" }}
            >

                {/* <View>
                    <TopMenu title="Home" navigation={this.props.navigation} />
                </View> */}

                <View style={styles.container}>

                    <View >
                        <Text style={styles.greeting}>QUAND SOUHAITEZ-VOUS COMMANDER ?</Text>
                        <Text style={styles.greeting}>Maintenant | Plutard</Text>
                    </View>


                    <View>
                        <Text style={styles.greeting}>CODE POSTAL ?</Text>
                        <TextInput onChangeText={(text) => this.renderPresta(text)} style={styles.postalInput} />

                    </View>

                    <View>
                        <Text style={styles.greeting} >SELECTIONNEZ VOTRE PIZZERIA</Text>

                        <ScrollView>
                            {this.state.prestataires.map((presta) =>{
                                
                                return <TouchableOpacity
                                key={presta.Num_prestataire}
                                onPress={() =>this.goToProduit(presta.Num_prestataire)}
                                style={styles.pizzeria}>
                                <Text style={styles.nomPizzeria}  >{presta.Nom_etablissement}</Text>
                                <Text style={styles.adressePizzeria} >{presta.Rue} {presta.Numero_du_rue}</Text>
                                </TouchableOpacity>
                            })}
                            
                        </ScrollView>

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
        flex: 1,
        justifyContent: "center",
        margin: 10
    },

    pizzeria: {
        backgroundColor: "red",
        borderRadius: 5,
        marginBottom: 10,
        padding: 10
    },
    nomPizzeria: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold"
    },
    adressePizzeria : {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    greeting: {
        color: "white",
        fontWeight: "bold",
        fontSize: 22
    },
    postalInput: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5
    }
})

export default memo(ChoixPizzeria)
