import * as commentsModel from "../models/comments.js";

export async function getAllComments(req, resp){
    console.log("test1")
    const data = await commentsModel.getAllComments();
    resp.json({
        data : data,
        });
}

export async function getCommentsByIdPart(req , resp) {
    const id_part = req.params.id.split("=");
    const data = await commentsModel.getCommentsByIdPart(id_part[1]);
    if (data == undefined){
        resp.json({
            sucess: false,
            data: "Comment not found",
        })
    } else {
    resp.json({
        data: data
      })
    }
}

export async function moderateComments(req, resp) {
    const data = await commentsModel.moderateComments(req.body.is_visible, req.body.id)
    resp.json({
        success: true,
        message: `Le commentaire est bien plus affiché.`
      })
}

export async function subComments(req , resp){
    const data = await commentsModel.subComments(req.body.id_participations, req.user.id ,req.body.content)
    resp.json ({
        success: true,
        message: `Votre commentaire a bien ajouté.`
    })
}