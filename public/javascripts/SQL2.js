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
    const [linhas] = await conectado.execute('SELECT * FROM `test`.`Alunos` `nome_aluno`WHERE `id_Alunos`>0')
    
    console.log('Usuarios')

    return await linhas
  }

  const Add = async function (client) {
  
    const conectado = await conectar()
    const sql = 'INSERT INTO `Alunos` (`id_Alunos`, `nome_aluno`,`data_matricula`,`id_turma`) VALUES (?,?,?,?)'

    const val = [client.id, client.nome, client.matricula, client.turma]
    await conectado.query(sql,val)
    
    console.log('Add')
  }

    const Update = async function (id,client) {
  
    const conectado = await conectar()
    const sql = 'UPDATE `test`.`Alunos` SET `nome_aluno` = ?, `data_matricula` = ?, `id_turma` = ? WHERE `id_Alunos` = ?'
    const val = [client.nome, client.matricula, client.turma, id]
    await conectado.query(sql,val)

    console.log('Update')
    
  }

  const Delete = async function (id) {
  
    const conectado = await conectar()
    const sql = 'DELETE FROM `test`.`Alunos` WHERE (`id_Alunos` = ?)'
    const val = [id]
    await conectado.query(sql,val)

    console.log('Update')
    
  }

  module.exports = {Usuarios,Add,Update,Delete}