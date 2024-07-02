const mysql = require('mysql');

let dbInstance = null;

const createDBInstance = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        database: 'pasteleria',
        user: 'root',
        password: '',
        multipleStatements: true
    });

    return new Promise((resolve, reject) => {
        connection.connect((error) => {
            if(error) {
                console.log("DB connection error");
                reject()
            } else {
                console.log("DB connection success");
    
                resolve(connection);
            }
        })
    })
};

const initDBInstance = async () => {
    if(!dbInstance) {
        dbInstance = await createDBInstance();
    }
}

const createUser = ({ name, lastName, email, password }, callback) => {
    const query = `INSERT INTO usuario SET 
        nombreUsuario=${dbInstance.escape(name)},
        apellidoUsuario=${dbInstance.escape(lastName)},
        email=${dbInstance.escape(email)},
        clave=MD5(${dbInstance.escape(password)}),
        nivel='usuario',
        fechaAlta=NOW( )
    `;
    return dbInstance.query(query, callback);
}

const loginUser = ({ email, password }, callback) => {
    const query = `SELECT idUsuario, nombreUsuario, nivel FROM usuario WHERE 
        email=${dbInstance.escape(email)} AND 
        clave=MD5(${dbInstance.escape(password)}) 
        AND estado='activo'  LIMIT 1`
    // const query = `SELECT idUsuario, nombreUsuario, nivel FROM usuario WHERE email='${email}'`

    return dbInstance.query(query, callback);
}

const getAllRecipes = (callback) => {
    const query = "SELECT idReceta, nombreReceta FROM receta";

    return dbInstance.query(query, callback);
}

const getRecipeById = (id, callback) => {
    const query = `SELECT idReceta, nombreReceta, descripcionReceta FROM receta WHERE idReceta=${dbInstance.escape(id)}`;

    return dbInstance.query(query, callback);
}

const deleteRecipeById = (id, callback) => {
    const query = `DELETE FROM receta WHERE idReceta=${dbInstance.escape(id)}`;

    return dbInstance.query(query, callback);
}

const updateRecipeById = ({ id, name, description }, callback) => {
    const query = `UPDATE receta SET 
        nombreReceta=${dbInstance.escape(name)},
        descripcionReceta=${dbInstance.escape(description)}
      WHERE idReceta=${dbInstance.escape(id)}`;

    return dbInstance.query(query, callback);
}

const getIngredientesRecipeById = (id, callback) => {
    const query = `SELECT idIngrendientes, descripcionIngrediente FROM ingrendientes WHERE receta_idReceta=${dbInstance.escape(id)}`;

    return dbInstance.query(query, callback);
}

const getIngredientById = (id, callback) => {
    const query = `SELECT idIngrendientes, descripcionIngrediente FROM ingrendientes WHERE idIngrendientes=${dbInstance.escape(id)}`;

    return dbInstance.query(query, callback);
}
const updateIngredientesById = ({id, description}, callback) => {
    const query = `UPDATE ingrendientes SET 
        descripcionIngrediente=${dbInstance.escape(description)}
      WHERE idIngrendientes=${dbInstance.escape(id)}`;
   
    return dbInstance.query(query, callback);
}

const deleteIngredientsById = (id, callback) => {
    const query = `DELETE FROM ingrendientes WHERE idIngrendientes=${dbInstance.escape(id)}`;
   
    return dbInstance.query(query, callback);
}

const createIngredient = (id, callback) => {
    const query = `INSERT INTO ingrendientes (idIngrendientes, descripcionIngrediente, receta_idReceta) VALUES ( NULL, 'Nuevo ingrediente', ${dbInstance.escape(id)});`;
   
    return dbInstance.query(query, callback);
}

const createRecipe = ({name, description}, callback) => {
    const query = `INSERT INTO receta (idReceta, nombreReceta, descripcionReceta, foto) VALUES ( NULL, ${dbInstance.escape(name)}, ${dbInstance.escape(description)}, NULL);`;
   
    return dbInstance.query(query, callback);
}

const updateAllIngredients = (ingredients, callback) => {
    let query = '';
    ingredients.forEach(ingredient => {
        query += `UPDATE ingrendientes SET 
            descripcionIngrediente=${dbInstance.escape(ingredient?.descripcionIngrediente)}
            WHERE idIngrendientes=${dbInstance.escape(ingredient?.idIngrendientes)};`;
    })

    return dbInstance.query(query, callback);
}

module.exports = { 
    loginUser, 
    createUser, 
    getAllRecipes, 
    initDBInstance,
     getIngredientesRecipeById, 
     getRecipeById, 
     deleteRecipeById,
     updateRecipeById,
     updateIngredientesById,
     deleteIngredientsById,
     createIngredient,
     getIngredientById,
     updateAllIngredients,
     createRecipe,
 };