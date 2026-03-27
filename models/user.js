import db from "../database.js";

export async function getUser(user_id){
    const row  = await db.getrow('SELECT id ,email , name , firstname, date_inscription, is_admin FROM users WHERE Id = ?', [user_id])
    return row;
}

export async function updateInfos(email, name, firstname, user_id){
    const row = await db.execute('UPDATE users SET email = ? , name = ?  , firstname = ? WHERE id = ?', [email, name, firstname, user_id])
    return row;
}

export async function activateUser(id){
    const row = await db.update('UPDATE users SET validation = 1 WHERE id = ?', [id])
    return row;
}

export async function createUser(email, password, name, firstname){
    const row = await db.insert('INSERT INTO users (email, password, name, firstname) VALUES (?,?,?,?)' ,[email, password, name, firstname]);
    return row;
}

export async function getUserByMail(email){
    const row = await db.getrow('SELECT * FROM users WHERE email = ?' ,[email]);
    return row;
}