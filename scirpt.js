const ui = new UI;

window.addEventListener("load", () => {
    ui.todoList.innerHTML = localStorage.getItem("todoList")
})


ui.saveButton.addEventListener("click", () => {
    
    const title = document.createElement("h5");
    title.className = "card-title";
    title.innerText = ui.item.value;

    const subtitle = document.createElement("h6");
    subtitle.className = "card-subtitle mb-2 text-body-secondary";
    subtitle.innerText = ui.subtitle.value;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    cardBody.appendChild(title);
    cardBody.appendChild(subtitle);

    const card = document.createElement("div");
    card.className = "card m-1";

    const maindiv = document.createElement("div");
    maindiv.className = "col-sm-6 col-md-4 col-lg-3";

    card.appendChild(cardBody);
    maindiv.appendChild(card)
    console.log(maindiv)
    ui.todoList.appendChild(maindiv);
    
    list = ui.todoList.innerHTML;
    localStorage.setItem("todoList", list);
})



// <div class="col-sm-6 col-md-4 col-lg-3">
//               <div class="card m-1">
//                   <div class="card-body">
//                       <h5 class="card-title">Buy bread</h5>
//                       <h6 class="card-subtitle mb-2 text-body-secondary">Lacks of house</h6>
//                       <p class="card-text"></p>
//                   </div>
//               </div>
//           </div>