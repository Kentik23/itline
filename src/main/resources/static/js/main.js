// Функция для смены иконки в выпадающем списке
function selectIcon(iconSrc) {
    document.getElementById("iconSelect").src = iconSrc;
}

document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("dataTable");
    const deleteButton = document.getElementById("deleteButton");
    let selectedRow = null;

    // Слушатель для выбора строки таблицы
    table.addEventListener("click", function (event) {
        if (!event.target.classList.contains("toggle-status")) { //Исключаем клик по чекбоксу
            let row = event.target.closest("tr"); // Находим родительскую строку
            document.querySelectorAll(".selectable-row").forEach(r => r.classList.remove("table-active")); // Снимаем выделение со всех строк

            // Если кликнули по той же строке, снимаем выделение
            if (row === selectedRow) {
                selectedRow = null;
                deleteButton.disabled = true;
            } else { // Иначе выделяем строку и активируем кнопку
                row.classList.add("table-active");
                selectedRow = row;
                deleteButton.disabled = false;
            }
        }
    });

    // Удаление элемента
    document.getElementById("modalDeleteButton").addEventListener("click", function () {
        const itemId = selectedRow.querySelector("input[type='checkbox']").dataset.id; // Получаем id элемента

        fetch(`/itline/${itemId}`, {
            method: "DELETE",
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка при удалении");
            }
            return response.json();
        })
        .then(() => {
            selectedRow.remove(); // Удаляем строку из таблицы
            selectedRow = null;
            deleteButton.disabled = true; // Деактивируем кнопку
        })
        .catch(error => {
            console.error("Ошибка:", error);
            alert("Не удалось удалить элемент.");
        });
    });
    
    
    // Добавляем слушатель для обновления статуса
    document.getElementById("dataTable").addEventListener("change", function (event) {
        if (event.target.classList.contains("toggle-status")) {  // Проверяем, что кликнули на чекбокс
            const itemId = event.target.dataset.id;  // Берем ID элемента из data-id
            const isActive = event.target.checked;   // Берем текущее состояние чекбокса
            
            fetch(`/itline/${itemId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ active: isActive })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Ошибка при обновлении");
                }
                return response.json();
            })
            .catch(error => {
                console.error("Ошибка:", error);
                event.target.checked = !isActive; // Откат чекбокса при ошибке
            });
        }
    });


    // Сброс модального окна его закрытии
    let modalElement = document.getElementById("addItemModal");
    modalElement.addEventListener('hide.bs.modal', function () {
        selectIcon('images/item1.icon');
        document.getElementById("addItemForm").reset();
    });
    
    // Слушатель для добавления сущности в модальном окне
    document.getElementById("saveButton").addEventListener("click", function () {
        let modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        let name = document.getElementById("nameInput").value.trim();
        let description = document.getElementById("descriptionInput").value.trim();
        let iconSelect = document.getElementById("iconSelect").src.split('/').pop();
        
        if (name === "" || description === "") {
            alert("Пожалуйста, заполните все поля!");
            return;
        }
        
        let data = {
            active: document.getElementById("activeCheckbox").checked,
            icon: iconSelect,
            name: name,
            description: description
        };
        
        fetch('/itline', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(item => {
            // Добавляем новую строку в таблицу
            let table = document.getElementById("dataTable");
            let row = document.createElement("tr");
            row.classList.add("selectable-row"); // Добавляем класс для выделения
            row.innerHTML = `
                <td>
                    <input type="checkbox" class="form-check-input toggle-status" 
                    ${item.active ? 'checked' : ''} data-id="${item.id}">
                </td>
                <td><img src="/images/${item.icon}" width="32"></td>
                <td>${item.name}</td>
                <td>${item.description}</td>
            `;
            table.appendChild(row); // Добавляем в `tbody`
            modal.hide();
        })
        .catch(error => console.error("Ошибка:", error));
    });
});