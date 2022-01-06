const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/** Second method for sign in */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // Cherche le mail saisi dans la BDD
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) // Si la mail est trouvé, comparaison du cryptage du mot de passe saisi avec celui enregistré
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id }, // Id utilisateur
                            process.env.TOKEN , // Token secret
                            { expiresIn: '24h' } // Durée de validité du token
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/** Second method of sign up */
exports.signup = (req, res, next) => {
    // console.log(req.body)
    bcrypt.hash(req.body.password, 10) // On sale 10 fois
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save() // Sauvegarde de l'utilisateur dans la BDD
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/** First method of sign in */
/**
 export const signin = async (req, res) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({ email }).catch(error => res.status(500).json({ error }));

    if(!existingUser) return res.status(404).json({ message: "User doesn't exist."});

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password).catch(error => res.status(500).json({ error }));

    if(!isPasswordCorrect) return res.status(400).json({ message: "Mot de passe est incorrect."});

    const token = jwt.sign({ userId: existingUser._id }, process.env.TOKEN, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token})
}
 */
