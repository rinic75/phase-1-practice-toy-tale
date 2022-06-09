let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //fetch
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => { toys.forEach(toy => renderToy(toy)) })

  //callback renderToy
  function renderToy(toy) {
      const div = document.createElement('div');
      div.className = "card";
      const h2 = document.createElement('h2');
      const img = document.createElement('img');
      img.className = 'toy-avatar';
      const p = document.createElement('p');
      const bttn = document.createElement('button');
      bttn.className = 'like-btn';
      bttn.id = `${toy.id}`
      
      h2.textContent = toy.name;
      img.src = toy.image;
      p.textContent = `${toy.likes} Likes`;
      bttn.textContent = 'Like ❤️'

      bttn.addEventListener('click', () => {
        toy.likes += 1;
        p.textContent = `${toy.likes} Likes`;
        patchToy(toy);
      })
      
      const collection = document.querySelector('#toy-collection')
      div.append(h2, img, p, bttn);
      collection.append(div);
  }
  //submit event listener 
  const form = document.querySelector('.add-toy-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    renderToy(newToy);
    postToy(newToy);
  });

  //post
  function postToy(toy) {
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toy)
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  //patch
  function patchToy(updatedToy) {
    fetch(`http://localhost:3000/toys/${updatedToy.id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updatedToy) })
      .then(res => res.json())
      .then(data => console.log(data))
  
  }
 
});
