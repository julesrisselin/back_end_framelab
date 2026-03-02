import * as commentsModel from "../models/comments.js";

export async function getAllComments(req, resp){
    console.log("test1")
    const data = await commentsModel.getAllComments();
    resp.json({
        data : data,
        });
}

export async function getCommentsByIdPart(req , resp) {
    console.log(req.params.id)
    const id_part = req.params.id.split("=");
    const data = await commentsModel.getCommentsById(id_part[1]);
    //console.log(data);
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
    const data = await commentsModel.updateComments(req.params.id)
    resp.json({
        success: true,
        message: `Votre commentaire a bien été modifié.`
      })
}

export async function subComments(req , resp){
    const data = await commentsModel.subComments(req.body.id_participations, req.body.user_id ,req.body.content)
    resp.json ({
        success: true,
        message: `Votre commentaire a bien ajouté.`
    })
}