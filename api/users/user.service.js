const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        console.log("Data received in create function:", data);
    
        // Check if user with provided email already exists
        pool.query(
            `SELECT * FROM userregistration WHERE email = ?`,
            [data.email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                if (results.length > 0) {
                    // User with provided email already exists, return an error
                    return callBack("User with this email already exists");
                }
    
                // User with provided email doesn't exist, create the user
                pool.query(
                    `CALL insert_userregistration(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        data.firstname,
                        data.lastname,
                        data.gender,
                        data.occupation,
                        data.address,
                        data.hobbies,
                        data.email,
                        data.username,
                        data.password
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callBack(error);
                        }
                        return callBack(null, results);
                    }
                );
            }
        );
    },
    
    getUsers: callBack => {
        pool.query('CALL get_users()', (error, results, fields) => {
            if(error){
              return callBack(error);
            }
           return callBack(null, results);
          });      
    },
    getUsersById: (id, callBack)  => {
        pool.query('CALL get_user_by_id(?)', [id], (error, results, fields) => {
            if(error){
                return callBack(error);
              }
             return callBack(null, results[0]);
          });
    },
    getUsersByEmail: (email, callBack) =>{
        pool.query('CALL get_user_by_email(?)', [email], (error, results, fields) => {
            if(error){
                return callBack(error);
              }
             return callBack(null, results[0]);
          });
    }    
    
};

