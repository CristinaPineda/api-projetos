const URL = "http://localhost:5000";

async function getApi() {
  const response = await axios({
    url: `${URL}/project`,
    method: "GET",
  })
  const data = response.data;
  console.log(data)
  const title = data[0].titleProject;
  console.log(title)
}

const allProjects = document.getElementById("all");
allProjects.addEventListener("click", () => { getApi()});