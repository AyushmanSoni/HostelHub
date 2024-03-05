const session_map = new Map();
const uuidv4 = require('uuid');
const cookies = require('cookies');


function get_uid(req,res){
    var session= uuidv4();
    res.cookie("ID",session)
    session_map.set(req.body.id , session );
    return session;
}

function check_if_login(req,res){
    var p =  req.cookie;
    console.log(p);
    if(session_map.get(req.body.id)==p){
        return true;
    }
    else{
        return false;
    }
}

function logout(req,res){
    var p =  req.cookie;
    console.log(p);
    session_map.delete(p);
    return;
}

module.exports={
    get_uid,
    check_if_login,
    logout
}

