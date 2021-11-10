const Login = () => {
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;

  if(!email || !senha) {
    return alert("Entre com todos os dados...");
  }

  axios.post('/project/users/login', {
    email, senha
  }).then((response) => {
    if (response.data.erro) {
      return alert(response.data.erro)
    } else {
      window.location.href = '/private';
    }
  }).catch((error) => {
    return alert(response.data.erro)
  })
}