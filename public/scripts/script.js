const URL = "http://localhost:5000";

async function getApi() {
  const source = document.getElementById("entry-template").innerHTML;
  const response = await axios({
    url: `${URL}/project`,
    method: "GET",
  })
  const data = response.data;
  console.log(data)
  const pro = [
    {
      titleProject: data.titleProject,
      descriptionProject: data.descriptionProject
    }
  ]
  return pro;
};


const allProjects = document.getElementById("all");
allProjects.addEventListener("click", () => { getApi()});
