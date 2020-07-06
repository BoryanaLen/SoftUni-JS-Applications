function loadRepos() {
	let username = document.getElementById("username").value;
	let repos = document.getElementById("repos");

	fetch(`https://api.github.com/users/${username}/repos`)
	.then(res => res.json())
	.then(function(data) {
		repos.innerHTML = "";
		data.forEach(element => {
			let li = document.createElement("li");
			let link = document.createElement("a");
			link.href = element.html_url;
			li.appendChild(link);
			li.textContent = element.full_name;
			repos.appendChild(li);
		});
	})
	.catch(function(error) {
		repos.innerHTML = "";
		let li = document.createElement("li");			
		li.textContent = "Error";
		repos.appendChild(li);
    });
}