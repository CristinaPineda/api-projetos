const URL = "http://localhost:5000";

const getApi = () => {
  axios
    .get(`${URL}/project`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
    const criaListaDinamica = (data) => {
      const ulProjetos = document.getElementById("projects");
      data.map((projeto) => {
        const listaProjeto = document.createElement("li");
        listaProjeto.innerHTML = `Nome do projeto: ${projeto.titleProject}`;
        ulProjetos.appendChild(listaProjeto);
      });
    };
  };
  

const allProjects = document.getElementById("all");
allProjects.addEventListener("click", () => { getApi()});
