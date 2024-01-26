import SQLRequest from '../models/dbModel'

function getUsers(){
    SQLRequest('SELECT * from users')
    .then((rows)=>{
        console.log(rows)
    })
}

export {
    getUsers
}