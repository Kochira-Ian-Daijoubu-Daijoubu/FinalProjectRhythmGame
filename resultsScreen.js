const score = localStorage.getItem("score");
const noteAmounts = localStorage.getItem("noteAmounts");
const unhittable = localStorage.getItem("unhittable");
const rankImg = document.createElement("img");
const returnHome = document.createElement("a");
var orch1 = 0;
var orch2 = 0;
returnHome.id = "return";
returnHome.textContent = "Return to track selection";
returnHome.setAttribute("href", "levelSelect.html");
var visibleScore = 0;
var scoreType = 0;
document.addEventListener("click", start, {once: true});
function showResults(){
    rankImg.id = "rank";
    returnHome.className = "goToTheBottomOfTheGoddammScreen";
    document.getElementById("Drumroll").pause();
    document.getElementById("putImg").appendChild(rankImg);
    document.getElementById("putReturn").appendChild(returnHome);
    document.getElementById("Snare").play()
    document.getElementById("Jingle").play()
    document.getElementById("Vocal").play()

}

function start(){
    document.getElementById("Drumroll").play();  
    cauculateScore()  
};

function cauculateScore(){
    document.getElementById("progress").style.width = visibleScore / ((noteAmounts - Number(unhittable)) * 50) * 100 + "%";
    document.getElementById("Percent").textContent = visibleScore / ((noteAmounts - Number(unhittable)) * 50) * 100 + "%";
    for(let i = 0; i < 36 && visibleScore < score; i++){
        visibleScore++;
        if (visibleScore / ((noteAmounts - Number(unhittable)) * 50) >= 0.35 && orch1 == 0){
            document.getElementById("progress").style.backgroundColor = "lime";
            document.getElementById("OrchHit").play();
            orch1 = 1;
        }
        if (visibleScore / ((noteAmounts - Number(unhittable)) * 50) >= 0.75 && orch2 == 0){
            document.getElementById("progress").style.backgroundColor = "hotPink";
            document.getElementById("OrchHit").src = "OrchHit2.wav";
            document.getElementById("OrchHit").play();
            orch2 = 1;
        }
    } 
    if(visibleScore < score){
    requestAnimationFrame(cauculateScore);
    } else {
    showResults();
    
    
    if (visibleScore / ((noteAmounts - Number(unhittable)) * 50) <= 0.05){
        document.getElementById("Jingle").src = "YOU DESERVE NOTHING.mp3";
        document.getElementById("Vocal").src = "YOU DESERVE NOTHINGVocal.mp3";
        rankImg.src = "capital_f.png";
        scoreType = 0;
    } else if (visibleScore / ((noteAmounts - Number(unhittable)) * 50) <= 0.35){
        document.getElementById("Jingle").src = "Bad.mp3";
        document.getElementById("Vocal").src = "BadVocal.mp3";
        rankImg.src = "capital_c.png";
        scoreType = 1;
    } else if (visibleScore / ((noteAmounts - Number(unhittable)) * 50) <= 0.75){
        document.getElementById("Jingle").src = "Ok.mp3";
        document.getElementById("Vocal").src = "OKVocal.mp3";
        rankImg.src = "capital_a.png";
        scoreType = 2;
    } else {
        document.getElementById("Jingle").src = "Good.mp3";
        document.getElementById("Vocal").src = "GoodVocal.mp3";
        rankImg.src = "capital_s.png";
        scoreType = 3;
    }
    }
}