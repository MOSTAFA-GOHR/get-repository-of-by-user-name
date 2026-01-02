// Main Variables 
let input = document.querySelector(".repos-container .get-repos input");
let getBtn = document.querySelector(".repos-container .get-repos .repo-btn");
let reposData = document.querySelector(".repos-container .show-data");


getBtn.onclick = function (){
    getRepos();
}

function getRepos(){
    if (input.value == ""){
        reposData.innerHTML = "<span> Please, Write Github Username.</span>";
    }else{
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((Response)=> Response.json())
        .then((repositories) => {
            reposData.innerHTML="";

            repositories.forEach(repo => {
                let mainDiv = document.createElement("div");
                let repoName = document.createTextNode(`${repo.name}`);
                mainDiv.appendChild(repoName);

                let infoDiv = document.createElement("div");
                infoDiv.className = "info";

                let repoUrl = document.createElement("a");
                let repoUrlText = document.createTextNode("Visit");
                repoUrl.appendChild(repoUrlText);
                repoUrl.href = `https://github.com/${input.value}/${repo.name}`;
                repoUrl.setAttribute("target","_blank");
                infoDiv.appendChild(repoUrl);


                let starsSpan = document.createElement("span");
                let starsSpanText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                starsSpan.appendChild(starsSpanText)
                infoDiv.appendChild(starsSpan);
                
                mainDiv.appendChild(infoDiv)

                mainDiv.className = "repo-box";

                reposData.appendChild(mainDiv);
            });
        });
    }
}