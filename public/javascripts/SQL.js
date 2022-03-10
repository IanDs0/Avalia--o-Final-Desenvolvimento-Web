const conectar = async function (){
    if (global.conexao && global.conexao.statle != 'disconected') {
      return global.conexao
    }
    const mysql = require('mysql2/promise')//não sei pq mas ta ai
    const connection = mysql.createConnection({//login e tabela
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'test'
    });
    
    console.log("Banco de dados Conectado!!!")
  
    global.conexao=connection
    return connection;
  }
  
  const Usuarios = async function () {
  
    const conectado = await conectar()
    const [linhas] = await conectado.execute('SELECT * FROM `test`.`Turmas` `nome_turma`WHERE `id_turma`>0')
    
    console.log('Usuarios')

    return await linhas
  }

  const Add = async function (client) {
  
    const conectado = await conectar()
    const sql = 'INSERT INTO `Turmas` (`id_turma`, `nome_turma`,`curso`,`data_inicio`) VALUES (?,?,?,?)'

    const val = [client.id, client.nome, client.curso, client.data]
    await conectado.query(sql,val)
    
    console.log('Add')
  }

    const Update = async function (id,client) {
  
    const conectado = await conectar()
    const sql = 'UPDATE `test`.`Turmas` SET `nome_turma` = ?, `curso` = ?, `data_inicio` = ? WHERE `id_turma` = ?'
    const val = [client.nome, client.curso, client.data, id]
    await conectado.query(sql,val)

    console.log('Update')
    
  }

  const Delete = async function (id) {
  
    const conectado = await conectar()
    const sql = 'DELETE FROM `test`.`Turmas` WHERE (`id_turma` = ?)'
    const val = [id]
    await conectado.query(sql,val)

    console.log('Update')
    
  }

  module.exports = {Usuarios,Add,Update,Delete}