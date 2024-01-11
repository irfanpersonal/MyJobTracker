import express from 'express';
const router: express.Router = express.Router();

import {showCurrentUser, updateUser, updateUserPassword, deleteAccount} from '../controllers/user';

router.route('/showCurrentUser').get(showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPasssword').patch(updateUserPassword);
router.route('/deleteAccount').delete(deleteAccount);

export default router;