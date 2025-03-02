const ui = new UI;

function initDarkMode() {
    // Check for saved dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';

    // Set initial state
    document.body.classList.toggle('dark-mode', darkMode);
    ui.darkModeToggle.checked = darkMode;

    // Add event listener for toggle
    ui.darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', ui.darkModeToggle.checked);
    });
}

ui.saveButton.addEventListener("click", () => {

    if (ui.item.value.length > 5 && ui.subtitle.value.length > 5) {


        const title = ui.item.value;
        const subtitle = ui.subtitle.value;

        const card = document.createElement("div");
        card.className = "col-sm-6 col-md-4 col-lg-3";
        card.innerHTML = `
                    <div class="card m-1">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div>
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
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="">
                                <label class="form-check-label" for="flexCheckDefault">Done</label>
                            </div>
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

function initFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            applyFilters();
        });
    });
}

function applyFilters() {
    const activeFilter = document.querySelector('[data-filter].active').getAttribute('data-filter');
    const searchTerm = ui.searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.col-sm-6');

    cards.forEach(card => {
        const checkbox = card.querySelector('.form-check-input');
        const isDone = checkbox.checked;
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const subtitle = card.querySelector('.card-subtitle').textContent.toLowerCase();
        const matchesSearch = searchTerm === '' ||
            title.includes(searchTerm) ||
            subtitle.includes(searchTerm);

        let shouldDisplay = matchesSearch;

        switch (activeFilter) {
            case 'done':
                shouldDisplay = shouldDisplay && isDone;
                break;
            case 'undone':
                shouldDisplay = shouldDisplay && !isDone;
                break;
        }

        card.style.display = shouldDisplay ? '' : 'none';
    });
}

// Add search input event listener
ui.searchInput.addEventListener('input', () => {
    applyFilters();
});

function loadItems() {
    list = localStorage.getItem("todoList")
    if (list) {
        ui.todoList.innerHTML = list;

        // Reattach delete button event listeners
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                button.closest(".col-sm-6").remove();
                saveToLocalStorage();
            });
        });

        // Add checkbox event listeners to loaded items
        document.querySelectorAll(".form-check-input").forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                const card = checkbox.closest(".col-sm-6");
                if (checkbox.checked) {
                    card.querySelector("h5").style.textDecoration = "line-through";
                    card.querySelector("h6").style.textDecoration = "line-through";
                    card.style.opacity = 0.5;
                } else {
                    card.querySelector("h5").style.textDecoration = "";
                    card.querySelector("h6").style.textDecoration = "";
                    card.style.opacity = 1;
                }
                applyFilters();
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

initDarkMode();
initFilters();