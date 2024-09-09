const create = document.querySelector(".createTask");
const newTask = document.querySelector(".newTask");
const closeTask = document.querySelector(".closeTask");
const taskForm = document.querySelector(".taskForm");
const priority = document.querySelector(".priority");
const priorityButton = document.querySelector(".priorityButton");
const setPriority = document.querySelector(".setPriority");
const profileImageButton = document.getElementById("profileImageButton");
const profileImageInput = document.getElementById("profileImageInput");
const profileImage = document.getElementById("profileImage");

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const jalaliDate = jalaali.toJalaali(today);

  const weekDays = [
    "یک‌شنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
    "شنبه",
  ];
  const dayOfWeek = weekDays[(today.getDay() + 6) % 7];

  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const month = persianMonths[jalaliDate.jm - 1];

  const day = jalaliDate.jd;
  const year = jalaliDate.jy;
  const persianDate = `امروز، ${dayOfWeek}، ${day} ${month} ${year}`;

  document.querySelector(".date").textContent = persianDate;
});

profileImageButton.addEventListener("click", () => {
  profileImageInput.click();
});

profileImageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file && file.type.startsWith("image/")) {
    const readerimage = new FileReader();

    readerimage.onload = (e) => {
      profileImage.src = e.target.result;
    };

    readerimage.readAsDataURL(file);
  }
});

create.addEventListener("click", () => {
  newTask.classList.remove("hidden");
});
closeTask.addEventListener("click", () => {
  newTask.classList.add("hidden");
  taskForm.reset();
});
priorityButton.addEventListener("click", () => {
  if (setPriority.classList.contains("hidden")) {
    priority.src = "./assets/Frame 1000005506.png";
  } else {
    priority.src = "./assets/Frame 1000005505.png";
  }
  setPriority.classList.toggle("hidden");
});
