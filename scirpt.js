const ui = new UI;




ui.saveButton.addEventListener("click", () => {
    
    if (ui.item.value.length > 5 || ui.subtitle.value.length > 5) {


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
                            <button class="btn btn-danger btn-sm delete-btn">Sil</button>
                        </div>
                    </div>
        
        `;
        
        card.querySelector(".delete-btn").addEventListener("click", function () {
            card.remove(); // HTML'den kaldır
            saveToLocalStorage(); // LocalStorage'ı güncelle
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
}

ui.clearButton.addEventListener("click", () => {
    localStorage.removeItem("todoList");
    loadItems();
    saveToLocalStorage();
})


loadItems();