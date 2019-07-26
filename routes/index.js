import express from 'express';
import Auth from './auth';
import User from './user';

const router = express.Router();

new Auth(router);
new User(router);

export default router;