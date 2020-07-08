function attachEvents() {
   let loadButton = document.getElementById("btnLoadPosts");
   let viewButton = document.getElementById("btnViewPost");
   let select = document.getElementById("posts");
   let postTitle = document.getElementById("post-title");
   let postBody = document.getElementById("post-body");
   let postComments = document.getElementById("post-comments");
   let url = "https://blog-apps-c12bf.firebaseio.com/";

   loadButton.addEventListener("click", loadPosts);
   viewButton.addEventListener("click", viewPost);

   function ffetch(url, options){
        options = options || {};
        return new Promise(function(resolve, reject){
            const request = new XMLHttpRequest();
            request.onreadystatechange = function(){
                if(request.readyState === 4){
                    if(request.status === 200){
                        resolve({
                            json: () => Promise.resolve(JSON.parse(request.responseText))
                        });
                        return;
                    }
                    reject(new Error(request.status));
                }               
            }
            request.open(options.method || "GET", url);
            request.send(options.body);
        })
   }    

  
   function loadPosts(){
        ffetch(`${url}/posts.json`)
        .then(res => res.json())
        .then(posts => 
            Object.entries(posts).forEach(([key, value]) => {
                const o = document.createElement("option");
                o.value = key;
                o.textContent = value.title;
                select.appendChild(o);
            })
        )
   }

   function viewPost(){
       let postId = select.value;
       let commentsReq = ffetch(`${url}/comments.json`).then(res => res.json());
       let postReq = ffetch(`${url}/posts/${postId}.json`).then(res => res.json());
       Promise.all([commentsReq, postReq]).then(([comments, currentPost]) => {
           postTitle.textContent = currentPost.title;
           postBody.textContent = currentPost.body;

           postComments.innerHTML = "";

           Object.entries(currentPost.comments || {}).forEach(([key, value]) => {
               const li = document.createElement("li");
               li.textContent = value.text;
               postComments.appendChild(li);
           })
       })

   }
}

attachEvents();