const express = require('express');
const { getAllRecipes, getRecipeById, deleteRecipeById, updateRecipeById, getIngredientesRecipeById, updateIngredientesById } = require('../db/connection');
const router = express.Router();

router.get("/recipies", async (req, res) => {
   getAllRecipes(function (error, result) {
        if(!error) {
            return res.status(200).send({ result });
        }

        return res.status(500).send("Ocurrio un error al obtener las recetas");
   });
})

router.delete("/recipies", async (req, res) => {
    if(!req?.query?.id) {
        return res.status(400).send("No se permite un id nulo");
    }

    getRecipeById(req?.query?.id, function (errorById, result) {
        if(!errorById && result.length) {
            deleteRecipeById(req?.query?.id, function(error) {
                if(!error) {
                    getAllRecipes(function (error, result) {
                        if(!error) {
                            return res.status(200).send({ result });
                        }
                
                        return res.status(500).send("Ocurrio un error al obtener las recetas");
                   });
                } else {
                    return res.status(404).send(`No se logro eleminar la receta ${req?.query?.id}`);
                }
            })
        } else {
            return res.status(404).send(`No se encontro la receta ${req?.query?.id}`);
        }

   })
 })

 router.get("/recipies/:id", async (req, res) => {
    getRecipeById(req?.params?.id, function (errorById, result) {
        if(!errorById && result.length) {
            return res.status(200).send(result[0]);
        }

        return res.status(404).send(`No se encontro la receta ${req?.params?.id}`);
   })
 })

 router.put("/recipies", async (req, res) => {
    let oldRecipe = {};
  
    getRecipeById(req?.query?.id, function (errorById, resultRecipe) {
        if(!errorById && resultRecipe.length) {
            oldRecipe = {
                id: resultRecipe[0]?.idReceta,
                name: resultRecipe[0]?.nombreReceta,
                description: resultRecipe[0]?.descripcionReceta,
            };

           oldRecipe = { ...oldRecipe, ...recipe };
            updateRecipeById(oldRecipe, function(errorUpdate, result) {
                if(errorUpdate) {
                    return res.status(500).send("Ocurrio un error al editarla receta");
                } else {
                    return res.status(200).send(result[0]);
                }
            })
                    
        } else {
            return res.status(404).send(`No se encontro la receta ${req?.params?.id}`);
        }

   })
 })

 router.get("/recipies/ingredients", async (req, res) => {
    getIngredientesRecipeById(req?.query?.id, function(errorIngredients, resultIngredients) {
        if(!errorIngredients) {
            return res.status(200).send(resultIngredients);
            
        } else {
            return res.status(500).send("Ocurrio un error al obtener los ingredientes");
        }
    })
 })

 router.put("/recipies/ingredients", async (req, res) => {
    updateIngredientesById(req?.body, function(errorIngredients, resultIngredients) {
        if(!errorIngredients) {
            return res.status(200).send(resultIngredients);
            
        } else {
            return res.status(500).send("Ocurrio un error al editar el ingrediente");
        }
    })
 })

 router.delete("/recipies/ingredients", async (req, res) => {
    deleteIngredientesById(req?.query?.id, function(errorIngredients) {
        if(!errorIngredients) {
            return res.status(200).send();
            
        } else {
            return res.status(500).send("Ocurrio un error al eliminar el ingrediente");
        }
    })
 })


module.exports=router;