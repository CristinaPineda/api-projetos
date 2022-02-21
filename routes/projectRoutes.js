import { Router } from 'express';
import validEntries from '../middlewares/middles.js';
import {
  getAllProjects,
  getProjectsId,
  postProject,
  patchProjectId,
  deleteProject
} from '../controllers/projectControllers.js';

const router = Router();

router.get('/project', getAllProjects);
router.get('/project/:idProject', getProjectsId);
router.post('/project',validEntries, postProject);
router.patch('/project/:idProjec', patchProjectId);
router.delete('/project/:idProject', deleteProject);

export default router;
