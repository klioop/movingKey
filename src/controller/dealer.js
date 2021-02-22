const express = require("express")
const Dealer  = require("../models/dealer")

const signUpCallback = async (req, res) => {
    
    try {
        const dealer = new Dealer(req.body)
        await dealer.save()

        res.status(201).send(dealer)
    } catch (e) {
        res.status(400).send(e)
    }
}

const logInCallback = async (req, res) => {
    try {
        const dealer     = await Dealer.findByCredentials(req.body.email, req.body.password)
        const token      = await dealer.generateAuthToken()
        dealer.authToken = token
        
        res.send({ dealer, token })
    } catch (e) {
        res.status(500).send(e)
    }
}

const profileCallback = async (req, res) => {
    res.send(req.dealer)
} 

const logOutCallback = async (req, res) => {
    try {
        req.dealer.authToken = ""
        await req.dealer.save()
        
        res.status(200).send("Successfully Logged Out!")
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    signUpCallback,
    logInCallback,
    profileCallback,
    logOutCallback
}