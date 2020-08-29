import {API_URL } from "../../core/config"
import axios from "axios"
import qs from "qs"
const config = 
    {headers : {
        "Content-Type" :    "application/x-www-form-urlencoded"
    }}

export const loginClient = async ({email,password}) =>{
    let response = ""
   
    await axios.post(`${API_URL}/client/login.php`,
        qs.stringify({email,password}),
        config
    ).then( async res => {
        
        response = res.data
    })
    .catch(err => console.log(err))

return response
}

export const signUpClient = async({nom,phone,pseudo,email,password}) =>{
    let response =""    
    
    await axios.post(`${API_URL}/client/signup.php`,
       
       qs.stringify({nom,phone,pseudo,email,password }),
       config,
    )
    .then(async res => response= res.data)
    .catch(err => console.log(err))

    return response
}

export const connectedClient = async(email) => {
    let response = ""

    await axios.get(`${API_URL}/client/client.php?email=${email}`)
        .then(async res => response = res.data)
        .catch(err => console.log(res))

    return response
}

export const noterPrestataire = async(idCli,num_prestataire,note) =>{
    let response = ""

    await axios.post(`${API_URL}/client/noter_prestataire.php?idCli=${idCli}&num_prestataire=${num_prestataire}&note=${note}`)
        .then(async res => response = res.data)

    return response
}

export const motDePasseOublie = async(email) =>{
    let response = ""

    await axios.post(`${API_URL}/resetPassword.php?isClient=true&email=${email}`)
        .then(async res => response = res.data)
        .catch(err => console.log(err))

    return response
}


export const isUserExist = async(email) =>{
    let response = ""

    await axios.get(`${API_URL}/client/verifyUser.php?email=${email}`)
        .then(async res => response = res.data)
        .catch(err =>  console.log(err))

    return response
}