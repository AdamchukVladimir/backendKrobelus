import Router from 'express';
import PostController from "./PostController.js";
const router = new Router();

// router.post('/posts' , PostController.create);
// router.get('/posts', PostController.getAll);
// router.get('/posts/:id', PostController.getOne);
// router.put('/posts', PostController.update);
// router.delete('/posts/:id', PostController.delete);

router.post('/users' , PostController.create);
router.post('/users/login', PostController.getAuthorization);
router.get('/users', PostController.getAll);
router.get('/users/:id', PostController.getOne);
router.put('/users', PostController.update);
router.delete('/users/:id', PostController.delete);

// router.post('/api/steam/user', PostController.steamUser);

export default router;