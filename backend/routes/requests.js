const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const auth = require('../middleware/auth');

// Configuration de la connexion MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

// Récupérer toutes les demandes (admin seulement)
router.get('/all', auth, async (req, res) => {
    try {
        // Vérifier si l'utilisateur est admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        // Récupérer toutes les demandes avec les informations des utilisateurs
        const [requests] = await promisePool.execute(`
            SELECT r.*, 
                   u.firstname, 
                   u.lastname, 
                   u.email,
                   pi.cin,
                   pi.phone,
                   pri.department,
                   pri.position
            FROM requests r
            JOIN users u ON r.user_id = u.id
            LEFT JOIN personal_info pi ON u.id = pi.user_id
            LEFT JOIN professional_info pri ON u.id = pri.user_id
            ORDER BY r.created_at DESC
        `);

        res.json(requests);
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des demandes' });
    }
});

// Récupérer les demandes d'un utilisateur
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Vérifier si l'utilisateur accède à ses propres demandes ou est admin
        if (req.user.id !== parseInt(userId) && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        const [requests] = await promisePool.execute(
            'SELECT * FROM requests WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );

        res.json(requests);
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des demandes' });
    }
});

// Mettre à jour le statut d'une demande (admin seulement)
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const requestId = req.params.id;

        // Vérifier si l'utilisateur est admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        await promisePool.execute(
            'UPDATE requests SET status = ?, updated_at = NOW() WHERE id = ?',
            [status, requestId]
        );

        res.json({ message: 'Statut de la demande mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut' });
    }
});

module.exports = router;
