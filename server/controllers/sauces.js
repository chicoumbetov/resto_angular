const Sauce = require("../models/sauce");
const fs = require("fs"); // file system // for deleting sauces
const mongoose = require("mongoose");
const {log} = require("nodemon/lib/utils");

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
exports.reactToSauce = (req, res, next) => {
    // 0 likes 0 dislike. I like
    console.log("react to sauce: ", req.body)
    if(req.body.like === 1) {

        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
            .then(sauce => res.status(200).json(sauce)) // Récupère toutes les sauces
            .catch(error => res.status(400).json({ error }));

    } else if (req.body.like === -1) { // 0 dislike 0 dislike. I dislike
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
            .then(sauce => res.status(200).json(sauce)) // Récupère toutes les sauces
            .catch(error => res.status(400).json({ error }));
    } else if (req.body.like === 0) { // there is at least one action. User toggle boolean
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {

                if(sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                        .then(sauce => res.status(200).json(sauce)) // Récupère toutes les sauces
                        .catch(error => res.status(400).json({ error }));

                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                        .then(sauce => res.status(200).json(sauce))
                        .catch(error => res.status(400).json({ error }));
                }
            })
            .catch(error => res.status(400).json({ error }));

    }

}
// exports.modifySauce if image modifier esle . updateOne(_id: req.params.id)
// Modifier une sauce
exports.modifySauce = (req, res, next) => {
    if (req.file) {
// Si l'image est modifiée
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                // get file name
                const filename = sauce.imageUrl.split('/images/')[1];

                fs.unlink(`images/${filename}`, () => { /** On supprime l'image existante du serveur*/

                    const sauceObject = {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
// On met à jour les infos et l'image
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
// Si l'image n'est pas modifiée
        const sauceObject = { ...req.body };
// On met à jour les infos
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
            .catch(error => res.status(400).json({ error }));
    }
};

// exports.deleteSauce deleteOne(_id: req.params.id)
exports.deleteSauce = (req, res, next) => {
    console.log("delete sauce", req.params.id)

    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(sauce => res.status(200).json({ message: "Sauce supprimée!"})) // Récupère toutes les sauces
                        .catch(error => res.status(400).json({ error }));
                })
            })

}

// deletion of images :
// fs.unlink(`images/${filename}`, () => { // On supprime l'image du serveur
