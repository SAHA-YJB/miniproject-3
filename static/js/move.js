function goToBlog() {
  document.getElementById("content").innerHTML = /* html */ `
    <div></div>
    <h2>3-TEAM BLOG</h2>
    <a href="https://www.google.com/">3팀</a>
    <a href="https://www.google.com/">3팀</a>
    <a href="https://www.google.com/">3팀</a>
    <a href="https://www.google.com/">3팀</a>
    <a href="https://www.google.com/">3팀</a>
    <a href="https://www.google.com/">3팀</a>
    
    <button onclick="goToHome()">메인 페이지</button>
  `;
}

function goToHome() {
  document.getElementById("content").innerHTML = "";
}
