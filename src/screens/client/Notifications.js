import React, { Component, memo } from 'react'
import { Text, View, ImageBackground, Image, ActivityIndicator, StyleSheet } from 'react-native'
import { commandeInfo, amountPaiement } from '../../API/client/list'
import { TouchableRipple, Button } from 'react-native-paper'
import { currentClient } from "../../core/session";
import TopMenu from "../../components/TopMenu"
class Notifications extends Component {

    constructor() {
        super()
        this.ref_commande = ""
        this.state = {
            notif: "",
            paypal: "",
            client: "",
            isLoading: false
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        this.ref_commande = this.props.navigation.state.params.ref_commande
        await this.fetchCli()
        await this.fetchCommandState()
        await this.fetchPaiementInfo()
        this.setState({ isLoading: false })

    }
    fetchCli = async () => {
        let a = await currentClient()
        this.setState({ client: a })
    }

    fetchCommandState = async () => {
        let response = await commandeInfo(this.ref_commande)

        this.setState({ notif: response })
    }

    fetchPaiementInfo = async () => {
        this.setState({ isLoading: true })
        let paiementInfo = await amountPaiement(this.ref_commande)

        this.setState({ paypal: paiementInfo, isLoading: false })

    }
    goToPay = () => {

        this.props.navigation.navigate("Pay", {
            amount: this.state.paypal["total"],
            emailCli: this.state.client["Email"]
        })
    }

    renderNotification = () => {

        if (this.state.notif === false) {
            return (
                <View>
                    <Text style={{ color: "yellow" }}> Un de nos prestataire va recevoir votre commande</Text>
                </View>
            )
        } else if (this.state.notif === "annuler") {
            return (
                <View>
                    <Text style={{ color: "yellow" }}>Désolé, votre commande a été annuler</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Button labelStyle={{ color: "#000" }} style={{ backgroundColor: "white", marginTop: 10 }} mode="contained" onPress={() => { this.goToPay() }}>
                        Prodécer au paiement
                </Button>
                </View>
            )
        }
    }




    render() {
        console.log(this.state.notif)
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
                
                <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <Image
                            style={{ maxWidth: 200, maxHeight: 200 }}
                            source={require("../../../assets/logo.png")}
                            resizeMode="contain"
                        />
                        <Text style={{ color: "yellow" }}>Etat de votre commande</Text>
                    </View>

                    <View>
                        {this.state.notif === false &&
                            <View>
                                <Text style={{ color: "yellow" }}> Un de nos prestataire va recevoir votre commande</Text>
                            </View>
                        }

                        {this.state.notif === "annuler" &&
                            <View>
                                <Text style={{ color: "yellow" }}>Désolé, votre commande a été annuler</Text>
                            </View>
                        }

                        {this.state.notif !== "annuler" && this.state.notif !== false &&
                            <Button labelStyle={{ color: "#000" }} style={{ backgroundColor: "white", marginTop: 10 }} mode="contained" onPress={() => { this.goToPay() }}>
                                Prodécer au paiement
                      </Button>
                        }
                    </View>

                    <Button onPress={async () => await this.fetchCommandState()} style={{ backgroundColor: "green", marginTop: 10 }} mode="contained">Actualiser</Button>

                </View>

                <View>
                    <TopMenu   />
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
export default memo(Notifications)
