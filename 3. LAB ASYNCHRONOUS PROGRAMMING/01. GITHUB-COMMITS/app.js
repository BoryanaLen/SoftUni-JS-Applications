function loadCommits() {
    let username = document.getElementById("username").value;
    let repo = document.getElementById("repo").value;
    let commits = document.getElementById("commits");

    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
    .then(res => {
        if (res.status >= 200 && res.status <= 299) {
            return res.json();
          } else {
            throw Error(`${res.status} (${res.statusText})`);
          }
    })
    .then(data => {
        commits.innerHTML = "";
            data.forEach(element => {
                let li = document.createElement("li");
                li.textContent = `${element.commit.author.name}: ${element.commit.message}`;
                commits.appendChild(li);
            });
    })
    .catch(error => {
        commits.innerHTML = "";
        let li = document.createElement("li");
        li.textContent = error;
        commits.appendChild(li);
    })
}