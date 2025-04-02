
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

// метод прототипа
Book.prototype.getInfo = function () {
    return `📖 "${this.title}" by ${this.author} (${this.year})`;
};

// конструктор, наследуется
function EBook(title, author, year, fileSize) {
    Book.call(this, title, author, year); 
    this.fileSize = fileSize;
}

// наследование прототипа
EBook.prototype = Object.create(Book.prototype);
EBook.prototype.constructor = EBook;


EBook.prototype.download = function () {
    return `📥 Downloading "${this.title}" (${this.fileSize}MB)...`;
};

// добавляем книгу
function addBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let year = document.getElementById('year').value;
    let bookType = document.getElementById('bookType').value;
    let fileSize = document.getElementById('fileSize').value;

    if (!title || !author || !year) {
        alert("⚠️ Please fill in all fields!");
        return;
    }

    let newBook;
    if (bookType === "ebook") {
        if (!fileSize) {
            alert("⚠️ Please enter file size for the e-book!");
            return;
        }
        newBook = new EBook(title, author, year, fileSize);
    } else {
        newBook = new Book(title, author, year);
    }

    displayBook(newBook);
    clearForm();
}

// показываем книгу
function displayBook(book) {
    let bookList = document.getElementById("bookList");

    let bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    let bookInfo = document.createElement("p");
    bookInfo.innerHTML = book.getInfo();

    bookItem.appendChild(bookInfo);

    if (book instanceof EBook) {
        let downloadBtn = document.createElement("button");
        downloadBtn.textContent = "Download";
        downloadBtn.onclick = function () {
            alert(book.download());
        };
        bookItem.appendChild(downloadBtn);
    }

    bookList.appendChild(bookItem);
}

// очистить форму
function clearForm() {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('year').value = "";
    document.getElementById('fileSize').value = "";
    document.getElementById('fileSize').style.display = "none";
}

document.getElementById('bookType').addEventListener("change", function () {
    let fileSizeInput = document.getElementById('fileSize');
    fileSizeInput.style.display = this.value === "ebook" ? "block" : "none";
});