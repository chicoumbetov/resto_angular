const Sauce = require("../models/sauce");
const fs = require("fs"); // file system // for deleting sauces
const mongoose = require("mongoose");

// Afficher toutes les sauces

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(sauces => res.status(200).json(sauces)) // Récupère toutes les sauces
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(sauce => res.status(200).json(sauce)) // Récupère toutes les sauces
        .catch(error => res.status(400).json({ error }));
};

// Enregistrement d'une nouvelle sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); // Transforme le JSON en objet JS
    const sauce = new Sauce({ // Déclaration d'un nouvel objet sauce
        ...sauceObject, // Copie les éléments de req.body
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // URL de l'images uploadée
    });
    sauce.save() // Enregistre la nouvelle sauce en BDD
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

// exports.reactToSauce id in userLiked array
exports.reactToSauce = () => {

}
// exports.modifySauce if image modifier esle . updateOne(_id: req.params.id)
exports.modifySauce = (req, res, next) => {
    console.log("modify sauce", req.params.id)
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }).then(sauce => res.status(200).json(sauce)) // Récupère toutes les sauces
        .catch(error => res.status(400).json({ error }));
}
// exports.deleteSauce deleteOne(_id: req.params.id)
exports.deleteSauce = (req, res, next) => {
    console.log("delete sauce", req.params.id)
    Sauce.deleteOne({ _id: req.params.id }).then(sauce => res.status(200).json(sauce)) // Récupère toutes les sauces
        .catch(error => res.status(400).json({ error }));
}

// deletion of images :
// fs.unlink(`images/${filename}`, () => { // On supprime l'image du serveur
