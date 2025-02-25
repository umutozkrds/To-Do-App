const ui = new UI;



ui.saveButton.addEventListener("click", () => {
    
    if (ui.item.value.length > 5 && ui.subtitle.value.length > 5) {


        const title = ui.item.value;
        const subtitle = ui.subtitle.value;

        const card = document.createElement("div");
        card.className = "col-sm-6 col-md-4 col-lg-3";
        card.innerHTML = `
                    <div class="card m-1">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${subtitle}</h6>
                            <p class="card-text"></p>
                            <button id="clear" type="button" class="btn btn-outline-danger delete-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
        
        `;
        
        card.querySelector(".delete-btn").addEventListener("click", function () {
            card.remove(); // HTML'den kaldır
            saveToLocalStorage(); // LocalStorage'ı güncelle
            clearIsactive();
        });

        ui.todoList.appendChild(card);
        
        list = ui.todoList.innerHTML;
        saveToLocalStorage();

        ui.item.value = "";
        ui.subtitle.value = "";
    }
    else {
        console.log("error")
    }

    clearIsactive();
    
})

function saveToLocalStorage() {
    const list = ui.todoList.innerHTML;
    localStorage.setItem("todoList", list);
}

function loadItems() {
    list = localStorage.getItem("todoList")
    if (list) {
        ui.todoList.innerHTML = list;


        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                button.closest(".col-sm-6").remove(); // Kartı kaldır
                saveToLocalStorage(); // Güncelle
            });
        });
    }
    else {
        ui.todoList.innerHTML = "";
        localStorage.removeItem("todoList");
    }
    clearIsactive();
    
}

ui.clearButton.addEventListener("click", () => {
    localStorage.removeItem("todoList");
    loadItems();
    saveToLocalStorage();
})

function clearIsactive() {
    if (!localStorage.getItem("todoList")) {
        ui.clearButton.style.display = "none";
    }
    else {
        ui.clearButton.style.display = "block";
    }
}

loadItems();