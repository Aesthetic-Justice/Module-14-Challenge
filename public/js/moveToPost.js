let elPosts = document.getElementById('postContainer');

for(const child of elPosts.childNodes){
    child.addEventListener(`click`, (event)=>{
        event.preventDefault();
    
        window.location.replace(`./dashboard/${child.dataset.id}`);
    })
};