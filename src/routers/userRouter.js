import express from 'express';
import {
  addUser,
  deleteOneUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  activateOneUser,
  deactivateOneUser,
  addCustomer,
  changePassword,
  checkEmail,
  checkCode,
  ResetPassword
} from '../controllers/userController';
import { protect } from '../middlewares/protect';
const router = express.Router();
router.get('/', protect, getAllUsers);
router.get('/:id', protect, getOneUser);
router.post('/addUser', protect, addUser);
router.put('/update/:id', protect, updateOneUser);
router.delete('/delete/:id', protect, deleteOneUser);
router.put('/activate/:id', protect, activateOneUser);
router.put('/deactivate/:id', protect, deactivateOneUser);
router.put('/changePassword', protect, changePassword);
router.post('/signup', addCustomer);

router.post('/check', checkEmail);
router.post('/code/:email', checkCode);
router.put('/resetPassword/:email', ResetPassword);

export default router;
