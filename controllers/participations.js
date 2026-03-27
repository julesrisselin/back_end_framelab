import * as participationsModel from "../models/participations.js";

export async function deleteParticipations(req, resp) {
    const data = await participationsModel.delParticipations(req.params.id)
    resp.json({
        success: true,
        message: `Participation bien supprimée.`
    })
}

export async function getParticipationByFilter(req, resp) {
    let result = {};
    if (req.query.id_challenge) {
        const id_challenge = req.query.id_challenge.split("=");
        result = await participationsModel.getParticipationByChallenge(id_challenge[1]);
    } else if (req.query.id_participation) {
        result = await participationsModel.getParticipationById(req.query.id_participation);
    } else if (req.query.date_submission) {
        const date_submission = req.query.date_submission.split("=");
        result = await participationsModel.getParticipationsByDate(date_submission[1]);
    } else if (req.query.user_id) {
        const user_id = req.query.user_id.split("=");
        result = await participationsModel.getParticipationByUserId(user_id[1]);
    } else {
        result = await participationsModel.getAllParticipation()
    }
    const data = result;
    resp.json({
        data: data
    });
}

export async function subParticipations(req, resp) {
    if (req.file == undefined) {
        resp.json({
            success: false,
            message: "Mauvais format pour l'upload ",
        })
    }
    const filepath = req.file.path.substr(6);
    try {
        const data = await participationsModel.subParticipations(req.user.id, req.body.id_challenge, filepath)
    } catch (error) {
        return resp.json({
            success: false,
            message: `Vous avez déjà soumis une participation pour ce challenge`
        })
    }
    resp.json({
        success: true,
        message: `Participations bien ajouté.`
    })
}