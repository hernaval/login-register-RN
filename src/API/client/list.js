import {API_URL } from "../../core/config"
import axios from "axios"
import qs from "qs"

export const allPrestataire = async(code) =>{
    let response = []
    await axios.get(`${API_URL}/client/prestataire.php?codePostal=${code}`)
    .then(async(res) => response = res.data)
   
    return response
}

export const pizzaByPrestataire = async(numPrestataire) => {
    let response = []
   
    await axios.get(`${API_URL}/client/pizza.php?Num_prestataire=${numPrestataire}`)
        .then( async (res) => response = res.data)
        .catch(err => console.log(err))

    return response
}


export const panierClient =async (id_client,Num_prestataire) =>{
    let response = []
    await axios.get(`${API_URL}/client/panier.php?id_client=${id_client}&Num_prestataire=${Num_prestataire}`)
        .then(async res => response= res.data)
        .catch(err => console.log(err))

    return response
}

export const simplePanier = async (id_client,Num_prestataire) =>{
    let response = []

    await axios.get(`${API_URL}/client/panier.php?id_client=${id_client}&Num_prestataire=${Num_prestataire}&simple=true`)
        .then(async res => response = res.data)
        .catch(err => console.log(err))

    return response
}

export const commandeInfo = async(ref_commande) =>{
    let response = ""
     
    await axios.get(`${API_URL}/client/notifications.php?ref_commande=${ref_commande}`)
        .then(async res => response = res.data)
        .catch(err => console.log(err))
    
        return response
}  

export const commandeAPayer = async (id_client) =>{
    let response = []
    
    await axios.get(`${API_URL}/client/etatCommande.php?apayer=true&id_client=${id_client}`)
        .then(async res => response = res.data)
        .catch(err => console.log(err))
    
        return response
}

export const commandeEnAttente = async (id_client) =>{
    let response = []

    await axios.get(`${API_URL}/client/etatCommande.php?id_client=${id_client}`)
        .then(async res => response = res.data)
        .catch(err => console.log(err))

    return response
}

export const achatReussi = async (id_client) => {
    let response = []

    await axios.get(`${API_URL}/client/historiques.php?id_client=${id_client}`)
        .then(async res => response = res.data)
        .catch(err => console.log(err))

    return response
}

export const amountPaiement = async (ref_commande) => {
    let response = ""
  
    await axios.get(`${API_URL}/client/paypalInfo.php?ref_commande=${ref_commande}`)
        .then(res => response =res.data)
        .catch(err => console.log(err))

    return response
} 

