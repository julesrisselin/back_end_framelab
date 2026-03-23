import db from "../database.js";

export async function getAllComments() {
    const row = db.getall('SELECT * FROM comments',)
    return row;
}

export async function getCommentsByIdPart(id_part) {
    const row = db.getall('SELECT * FROM comments WHERE id_participations = ?', [id_part])
    return row;
}

export async function moderateComments(is_visible , id){
    const row = db.execute('UPDATE comments SET is_visible = ? WHERE id = ?', [is_visible , id])
    return row;
}

export async function subComments(id_participations ,user_id ,content){
    const row = db.execute('INSERT INTO comments (id_participations, user_id  , content) VALUES (?,?,?)' ,[id_participations, user_id ,content]);
    return row;
}