// routes/accessControlRoutes.js
import express from 'express';
import {
    getAllAccessControls,
    createNewAccessControl,
    updateAccessControl,
    deleteAccessControl
} from '../../controllers/v1/access_control_controllers';

const router = express.Router();

router.get('/get/all', getAllAccessControls);
router.post('/create/new', createNewAccessControl);
router.put('/update/:id', updateAccessControl);
router.delete('/delete/:id', deleteAccessControl);

export default router;
