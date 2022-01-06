const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupération du token de la requête
        const decodedToken = jwt.verify(token, process.env.TOKEN); // Vérification du token en utilisant notre token secret
        const userId = decodedToken.userId; // Id de l'utilisateur du token
        if (req.body.userId && req.body.userId !== userId) { // Comparaison des Id utilisateur du Token et de l'Id de la personne en ligne
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
