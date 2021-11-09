const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../../Schemas/User");

async function Login(body) {
  const email = body.email;
  const senha = body.senha;

  if (!email || !senha) {
    return { erro: "Dados insuficientes."}
  }
  
  Find = await User.find({ email, senha})
  .then(response => {
    return response;
  }).catch(erro => {
    return { erro: erro }
  });
  
  if (Find == '' || Find.erro) {
    return { erro: 'Id ou senha incorretos.' }
  }
  
  Token = await jsonwebtoken.sign({ 
    id: Find[0]._id,
    email: Find[0].email, 
  }, "ProtectToken");

  res.cookie("Token", Token);
  res.sendStatus(200);
}

module.exports = Login;