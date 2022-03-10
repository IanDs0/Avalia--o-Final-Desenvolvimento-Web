var express = require('express');
var router = express.Router();

var path = require('path');
var bodyParser = require('body-parser');
const mysql = require('mysql2');

(async () => {

  const sql = require('../public/javascripts/SQL')
  const sql2 = require('../public/javascripts/SQL2')

  const client = await sql.Usuarios()
  const client2 = await sql2.Usuarios()

  console.log(client2)


  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index.html');
  });

  router.get('/dados', function(req, res, next) {

    res.json({client:client , client2:client2});
  });


/* POST home page. */
  router.post('/post', function(req, res, next) {

    if (req.body.id != '') {
      sql.Add({id: req.body.id,nome: req.body.nome, curso: req.body.curso, data:req.body.data})//Add funciona
      res.render('post');
    }else{
      res.render('index.html');
    }
  });

  router.post('/update', function(req, res, next){//acho que tenho qu mudar de postr para outra coisa
    
    console.log(req.body.curso)
    const id = req.body.id

    let verificado = client.find(element => element['id_turma'] == id);

    //Tem que colocar o ID dinamico para ser alterado
    if (verificado != undefined) {
      sql.Update(id,{nome: req.body.nome, curso: req.body.curso, data:req.body.data})//Update funciona
      res.render('post');
    }else{
      res.render('index')
    }

  });

  router.post('/delete', function(req, res, next){

    const id = req.body.id
    let verificado = client.find(element => element['id_turma'] == id);

    if(req.body.id != '' && verificado != undefined){
      sql.Delete(id)//Delete funciona
      res.render('post');
    }else{
      res.render('index');
    }

  });










  router.post('/Aluno/post', function(req, res, next) {

    if (req.body.id != '') {
      sql2.Add({id: req.body.id, nome: req.body.nome, matricula: req.body.matricula, turma:req.body.turma})//Add funciona
      res.render('post');
    }else{
      res.render('index.html');
    }
  });

  router.post('/Aluno/update', function(req, res, next){//acho que tenho qu mudar de postr para outra coisa
    
    const id = req.body.id

    let verificado = client.find(element => element['id_turma'] == id);

    //Tem que colocar o ID dinamico para ser alterado
    if (verificado != undefined) {
      sql2.Update(id,{nome: req.body.nome, matricula: req.body.matricula, turma:req.body.turma})//Update funciona
      res.render('post');
    }else{
      res.render('index')
    }

  });

  router.post('/Aluno/delete', function(req, res, next){

    const id = req.body.id
    let verificado = client.find(element => element['id_turma'] == id);

    if(req.body.id != '' && verificado != undefined){
      sql2.Delete(id)//Delete funciona
      res.render('post');
    }else{
      res.render('index');
    }

  });

})()
module.exports = router;
