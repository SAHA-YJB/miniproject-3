// 라이트모드/다크모드
const modeToggle = document.querySelector("#mode-toggle")
modeToggle.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme")

  if (currentTheme === "dark") {
    document.body.setAttribute("data-theme", "light")
    modeToggle.textContent = "다크 모드"
  } else {
    document.body.setAttribute("data-theme", "dark")
    modeToggle.textContent = "라이트 모드"
  }
})

// 시간에 따른 기본값 설정
function setDefaultTheme() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  
  if (currentHour >= 18 || currentHour < 6) {
    document.body.setAttribute("data-theme", "dark");
    modeToggle.textContent = "라이트 모드";
  } else {
    document.body.setAttribute("data-theme", "light");
    modeToggle.textContent = "다크 모드";
  }
}
setDefaultTheme();
