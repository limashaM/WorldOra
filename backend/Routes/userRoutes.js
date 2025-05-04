const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const authMiddleware = require('../Middlewares/authMiddleware'); 

// Routes that do not require authentication
router.post('/createUser', userController.createUser);
router.post('/login', userController.userLogin);
router.post('/sendLink', userController.sendLink);
router.get('/passwordReset/:userId/:token', userController.passwordReset);
router.post('/:userId/:token', userController.changePassword);

// Protected routes that require authentication
router.get('/all-users', authMiddleware, userController.getAllUsers);
router.delete('/deleteUser/:userId', authMiddleware, userController.deleteUser);
router.get('/user/:userId', authMiddleware, userController.getUserById);
router.patch('/updateUser/:userId', authMiddleware, userController.updateUser);
router.post('/logout', authMiddleware, userController.logout);

module.exports = router;
