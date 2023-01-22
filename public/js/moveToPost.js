let elPosts = document.getElementById('postContainer');

for(const child of elPosts.childNodes){
    child.addEventListener(`click`, (event)=>{
        event.preventDefault();
    
        window.location.replace(`http://localhost:3001/dashboard/${child.dataset.id}`);
    })
};