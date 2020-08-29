import {API_URL } from "../../core/config"
import axios from "axios"
import qs from "qs"
const config = 
    {headers : {
        "Content-Type" :    "application/x-www-form-urlencoded"
    }}
export const addToPanier = async({Code_produit,id_client,Num_prestataire}) =>{
    let response= ""
    
    await axios.post(`${API_URL}/client/panier.php`,
        qs.stringify({Code_produit,id_client,Num_prestataire}),
        config
    )
    .then(async res => console.log(res.data))
    .catch(err => console.log(err))

    return response
}

 export const commander = async(paniers,ref,date_recep,heure_recep,mode_paiement,qt,postale) =>{
     let response = ""
    let panier = {
        paniers,ref,date_recep,heure_recep,mode_paiement,qt,postale
    }
    //console.log(data)
      await axios.post(`${API_URL}/client/commande.php`,
        qs.stringify({panier})
     )
     .then( async res => response = res.data) 

     return response
 }

 export const repasserCommande = async (paniers,ref,date_recep,heure_recep,mode_paiement,qt) =>{
     let response = ""

     let panier ={
         paniers,ref,date_recep,heure_recep,mode_paiement,qt
     }

     await axios.post(`${API_URL}/client/repasserCommande.php`,
     qs.stringify({panier},config))
        .then(async res => response = res.data)
        .catch(err => console.log(res))

    return response
 }