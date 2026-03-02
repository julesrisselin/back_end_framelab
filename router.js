import { Router } from "express";
import * as userController from "./controllers/user.js";
import * as participationsController from "./controllers/participations.js";
import * as votesController from "./controllers/votes.js";
import * as commentsController from "./controllers/comments.js";
import * as challengeController from "./controllers/challenge.js";
import * as authentificationController from "./controllers/authentification.js";
import * as uploadController from "./controllers/upload.js";
const router = Router();

/* Pour la connexion */
router.post("/auth/login", authentificationController.authentificationUser);
router.get("/auth/logout", authentificationController.logOutUser);


router.get("/users/me", authentificationController.authByToken, userController.getCurrent)
router.post("/users", userController.createUser)
router.put("/users/:id",authentificationController.authByToken, userController.updateUserInfos);
router.get("/users", userController.getUserById);

//Pour le challenge en cours
router.get("/challenges/current", challengeController.getCurrentChallenge);

// Pour les participations
router.post("/participations",authentificationController.authByToken, uploadController.upload.single('uploaded_file_participations'), participationsController.subParticipations);

//faire if pour les requetes de user et date et id challenge
router.get("/participations", participationsController.getParticipationByFilter);
router.delete("/participations/:id",authentificationController.authByToken, authentificationController.authAdmin, participationsController.deleteParticipations);

// Pour les commentaires

router.get("/comments", commentsController.getAllComments);
router.post("/comments", authentificationController.authByToken, commentsController.subComments);
router.get("/comments/:id", commentsController.getCommentsByIdPart);
router.put("/comments/:id", authentificationController.authByToken, authentificationController.authAdmin,commentsController.moderateComments);

// Pour les votes
router.post("/votes",authentificationController.authByToken, votesController.subVotes);
router.get("/votes", votesController.getAllVotes)
router.get("/votes/:id", votesController.getVotesById)
 
// Admin testé 
router.post("/challenges",authentificationController.authByToken, authentificationController.authAdmin, uploadController.upload.single('uploaded_file') , challengeController.subChallenge);

export default router;
