const addBlogPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector(`#title`);
    const content = document.querySelector(`#content`);
    const today = new Date();

    if(title && content){
        const response = await fetch(`../api/posts/post`, {
            method: `POST`,
            body: JSON.stringify({ 
                title: title.value, 
                content: content.value,
                date: today
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if(response.ok){
            alert(`Blogpost successfully added`);
            document.location.reload();
        }
        else {
            alert(`Blogpost failed to be added`);
        }
    }
};

document.querySelector(`.button`).addEventListener(`click`, addBlogPost);