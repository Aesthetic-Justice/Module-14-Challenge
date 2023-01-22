const addComment = async (event) => {
    event.preventDefault();

    console.log(`button pressed`);

    const parent_id = window.location.href.split("http://localhost:3001/dashboard/")[1];
    const content = document.querySelector(`#content`);
    const today = new Date();

    if(parent_id && content){
        const response = await fetch(`../api/posts/postComment`, {
            method: `POST`,
            body: JSON.stringify({ 
                content: content.value,
                parent_id: parent_id,
                date: today
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if(response.ok){
            alert(`Comment successfully added`);
            document.location.reload();
        }
        else {
            alert(`Blogpost failed to be added`);
        }
    }
};

document.querySelector(`.button`).addEventListener(`click`, addComment);