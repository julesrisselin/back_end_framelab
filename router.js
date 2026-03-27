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

/* Pour les users */
router.get("/users/me", authentificationController.authByToken, userController.getCurrent)
router.post("/users", userController.createUser)
router.put("/users", userController.updateFirstConnexion);
router.get("/users", userController.getUserById);

//Pour le challenge
router.get("/challenges/current", challengeController.getCurrentChallenge);
router.post("/challenges",authentificationController.authByToken, authentificationController.authAdmin, uploadController.upload.single('uploaded_file') , challengeController.subChallenge);

// Pour les participations
router.post("/participations",authentificationController.authByToken, uploadController.upload.single('uploaded_file'), participationsController.subParticipations);
router.get("/participations", participationsController.getParticipationByFilter);

// Pour les commentaires
router.post("/comments", authentificationController.authByToken, commentsController.subComments);
router.get("/comments", commentsController.getCommentsByFilter);
router.put("/comments", authentificationController.authByToken, authentificationController.authAdmin,commentsController.moderateComments);

// Pour les votes
router.post("/votes",authentificationController.authByToken, votesController.subVotes);
router.get("/votes", votesController.getVotesByFilter)


export default router;
