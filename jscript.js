let cart = [];
if (localStorage.getItem("carrello") !== null) {
  cart = JSON.parse(localStorage.getItem("carrello"));
}

fetch("https://striveschool-api.herokuapp.com/books")
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
    /* ---------------------------- Creazione Card --------------------------- */
    data.forEach((book) => {
      let cardContainer = document.getElementById("cardContainer");
      let cardColumn = document.createElement("div");
      cardColumn.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch";
      let card = document.createElement("div");
      card.className = "card shadow m-2";
      let cardImage = document.createElement("img");
      cardImage.className = "card-img-top";
      cardImage.setAttribute("src", book.img);
      let cardBody = document.createElement("div");
      cardBody.className = "card-body";
      let cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.innerText = book.title;
      let cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.innerText = book.price + " €";
      let deleteButton = document.createElement("a");
      deleteButton.className = "btn btn-danger me-1";
      deleteButton.innerText = "Scarta";
      let addToCartButton = document.createElement("a");
      addToCartButton.innerText = "Compra ora";
      addToCartButton.className = "btn btn-primary";
      /* ----------------------------- Inserimento Card nel DOM ---------------------------- */
      cardContainer.appendChild(cardColumn);
      cardColumn.appendChild(card);
      card.appendChild(cardImage);
      card.appendChild(cardBody);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(deleteButton);
      cardBody.appendChild(addToCartButton);
      /* ---------------------- rimozione card ------------------------------------ */
      deleteButton.addEventListener("click", function () {
        cardColumn.remove();
      });
      /* ----------------------  creazione elementi per carrello------------------------------------ */
      let cartReference = document.getElementById("cart");
      let newLi = document.createElement("li");
      newLi.className = "my-2";
      let containerCartBooks = document.createElement("div");
      containerCartBooks.className = "d-flex justify-content-between flex-wrap";
      let deleteFromCart = document.createElement("a");
      /* ---------------------- aggiunte nel carrello ------------------------------------ */
      addToCartButton.addEventListener("click", function () {
        cart.push(book);
        deleteFromCart.className = "btn btn-danger my-1";
        deleteFromCart.innerHTML = '<i class="bi bi-trash3"></i>';
        newLi.innerHTML = book.title + " " + book.price + "€";
        cartReference.appendChild(containerCartBooks);
        containerCartBooks.appendChild(newLi);
        containerCartBooks.appendChild(deleteFromCart);
        localStorage.setItem("carrello", JSON.stringify(cart));
      });

      deleteFromCart.addEventListener("click", function () {
        cartReference.removeChild(containerCartBooks);
        cart = cart.filter((c) => c.title !== book.title);
        localStorage.setItem("carrello", JSON.stringify(cart));
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
