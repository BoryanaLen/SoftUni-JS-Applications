function attachEvents() {
   let loadButton = document.getElementById("btnLoadPosts");
   let viewButton = document.getElementById("btnViewPost");
   let select = document.getElementById("posts");
   let postTitle = document.getElementById("post-title");
   let postBody = document.getElementById("post-body");
   let postComments = document.getElementById("post-comments");
   let url = "https://blog-apps-c12bf.firebaseio.com/";

   loadButton.addEventListener("click", load);
   viewButton.addEventListener("click", view);

   function load(){
       fetch("https://blog-apps-c12bf.firebaseio.com/posts.json")
       .then(res => res.json())
       .then(data => {
          Object.keys(data).forEach(element => {
            let option = document.createElement("option");
            option.value = `${element}`;
            option.textContent = `${data[element].title}`;
            select.appendChild(option);
          });
       })
   }

   function view(){
        let postId = select.options[select.selectedIndex].value;
        let url = `https://blog-apps-c12bf.firebaseio.com/posts/${postId}.json`
        fetch(url)
       .then(res => res.json())
       .then(data => {
           postTitle.textContent = data.title;
           postBody.textContent = data.body;
           Object.keys(data.comments).forEach(key => {
               let li = document.createElement("li");
               li.id = key;
               li.textContent = data.comments[key].text;
               postComments.appendChild(li);
           });
       })
   }
}

attachEvents();