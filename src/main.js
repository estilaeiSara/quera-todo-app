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
