
import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"

import {
    HomeScreen,
   
    Dashboard,
    LoginScreen,
    RegisterScreen,
    ForgotClient,
    AuthLoadingScreen,
    Prestataire,
    Pizza,
    Panier,
    Notifications,
    Commande,
    ChoixPizzeria,
    ChoixPizza,
    ChoixPanier,
    ChoixCommander,
    LoginPrestataire,
    RegisterPrestataire,
    RegisterDone,
    ForgotPrestataire,
    MainPrestataire,
    CommandePrestataire,
    CommandeDetail,
    Historiques,
    Menu,
    MenuAdd,
    MenuEdit,

     Pay
} from "./screens"

const Router = createStackNavigator({
    HomeScreen,

    LoginScreen,
    AuthLoadingScreen,
    RegisterScreen,
    ForgotClient,
    Dashboard,
    Prestataire,
    Pizza,
    Panier,
    Notifications,
    Commande,
    ChoixPizzeria,
    ChoixPizza,
    ChoixPanier,
    ChoixCommander,
    
    LoginPrestataire,
    RegisterPrestataire,
    RegisterDone,
    ForgotPrestataire,
    MainPrestataire,
    CommandePrestataire,
    CommandeDetail,
    Historiques,
    Menu,
    MenuAdd,
    MenuEdit,
    Pay
},{
    initialRouteName : "HomeScreen",
    headerMode : "none"
})

export default createAppContainer(Router)