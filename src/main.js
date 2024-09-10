// Retrieve tasks from local storage or initialize an empty array
let storage = localStorage.getItem("tasks");
let tasks = storage ? JSON.parse(storage) : [];

// Cache DOM elements
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
const motivation = document.querySelector(".motivation");
const low = document.querySelector(".low");
const high = document.querySelector(".high");
const medium = document.querySelector(".medium");
const lowPriority = document.querySelector(".lowPriority");
const highPriority = document.querySelector(".highPriority");
const mediumPriority = document.querySelector(".mediumPriority");
const deleteButtons = document.querySelectorAll(".ddelete");
const nameTask = document.querySelector("#nameTask");
const descriptionTask = document.querySelector("#descriptionTask");
const submitTask = document.querySelector("#submitTask");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");

// show date
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

// Initialize profile image upload
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

// Open and close task form
create.addEventListener("click", () => {
  newTask.classList.remove("hidden");
  motivation.classList.add("hidden");
});

closeTask.addEventListener("click", () => {
  newTask.classList.add("hidden");
  motivation.classList.remove("hidden");
  taskForm.reset();
  lowPriority.classList.add("hidden");
  mediumPriority.classList.add("hidden");
  highPriority.classList.add("hidden");
});

// Add delete functionality
priorityButton.addEventListener("click", () => {
  if (setPriority.classList.contains("hidden")) {
    priority.src = "./assets/Frame 1000005506.png";
  } else {
    priority.src = "./assets/Frame 1000005505.png";
  }
  setPriority.classList.toggle("hidden");
});

low.addEventListener("click", () => {
  setPriority.classList.add("hidden");
  lowPriority.classList.remove("hidden");
  mediumPriority.classList.add("hidden");
  highPriority.classList.add("hidden");
});

medium.addEventListener("click", () => {
  setPriority.classList.add("hidden");
  mediumPriority.classList.remove("hidden");
  lowPriority.classList.add("hidden");
  highPriority.classList.add("hidden");
});

high.addEventListener("click", () => {
  setPriority.classList.add("hidden");
  highPriority.classList.remove("hidden");
  lowPriority.classList.add("hidden");
  mediumPriority.classList.add("hidden");
});

deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPriority.classList.remove("hidden");
    lowPriority.classList.add("hidden");
    mediumPriority.classList.add("hidden");
    highPriority.classList.add("hidden");
  });
});

// Handle task submission
submitTask.addEventListener("click", () => {
  const taskTitle = nameTask.value.trim();
  const taskDescription = descriptionTask.value.trim();

  if (!taskTitle) {
    alert("عنوان تسک نمی‌تواند خالی باشد");
    return;
  }

  // Add new task to the list and update local storage
  const task = {
    id: new Date().getTime(),
    title: taskTitle,
    description: taskDescription,
    isCompleted: false,
    priority: taskPriority,
  };

  // add task to tasks
  tasks.unshift(task);

  nameTask.value = "";
  descriptionTask.value = "";

  // update ui
  render();
});

// add task in tasks to ui
function render() {
  taskList.innerHTML = tasks
    .filter((task) => !task.isCompleted)
    .map((task) => {
      return `
       <li data-id="${task.id}" class="w-80 h-28 rounded-xl py-3 px-4 border-2 bg-white border-[#E9E9E9]">
          <div class="flex justify-between items-center">
            <div class="inline flex justify-center items-center gap-2">
              <input type="checkbox" />
              <span>${task.title}</span>
            </div>
            <img class="inline" src="./assets/Frame 33317.png" alt="انتخاب" />
          </div>
          <div>${task.description}</div>
        </li>
      `;
    })
    .join("");

  // Update task count
  const remainingTasks = tasks.filter((task) => !task.isCompleted).length;
  if (remainingTasks > 0) {
    taskCount.textContent = `${remainingTasks} تسک را باید انجام دهید`;
  } else {
    taskCount.textContent = "تسکی برای امروز نداری!";
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initialize tasks on page load
render();
