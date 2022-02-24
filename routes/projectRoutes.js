import { Router } from 'express';
import {
  validEntries,
  matchProject,
  validId,
} from '../middlewares/middlewares.js';
import {
  getProjects,
  getProjectsId,
  postProject,
  patchProjectId,
  deleteProject,
} from '../controllers/projectControllers.js';

const router = Router();

router.get('/project', getProjects);
router.get('/project/:idProject', getProjectsId);
router.post('/project', validEntries, matchProject, postProject);
router.patch('/project/:idProject', validId, patchProjectId);
router.delete('/project/:idProject', validId, deleteProject);

export default router;
