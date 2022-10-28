const movie_select = document.querySelector("#movie");
let ticket_price = +movie_select.value;

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const seat_count = document.querySelector("#count");
const total = document.querySelector("#total");
const video = document.querySelector("#video");

const populateUI = () => {
   const selected_seats = JSON.parse(localStorage.getItem("selected_seats"));
  if (selected_seats !== null && selected_seats.length > 0) {
    seats.forEach((seat, index) => {
      if (selected_seats.indexOf(index) != -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selected_movie_index = localStorage.getItem("selected_movie_index");
  if (selected_movie_index !== null) {
    movie_select.selectedIndex = selected_movie_index;
  }
  const selected_movie_price = localStorage.getItem("selected_movie_price");
  if (selected_movie_price !== null) {
    ticket_price = selected_movie_price;
  }
};
populateUI();

movie_select.addEventListener("change", (e) => {
  ticket_price = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

const setMovieData = (movie_index, movie_price) => {
  localStorage.setItem("selected_movie_index", movie_index);
  localStorage.setItem("selected_movie_price", movie_price);
};

const updateSelectedCount = () => {
  const selected_seats = document.querySelectorAll(".row .seat.selected");
  const selected_seat_index = [...selected_seats].map((seat) =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("selected_seats", JSON.stringify(selected_seat_index));
  const selected_seats_count = selected_seats.length;
  seat_count.textContent = selected_seats_count;
  total.textContent = selected_seats_count * ticket_price;
};
updateSelectedCount();

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

video.addEventListener("click", (e) => toggleVideoStatus());

const toggleVideoStatus = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};
