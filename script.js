/* ==========================================
   MotoGymkhana Compare Player Ver5
   script.js  Part1
========================================== */

const videoA = document.getElementById("videoA");
const videoB = document.getElementById("videoB");

const fileA = document.getElementById("fileA");
const fileB = document.getElementById("fileB");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const addPointBtn = document.getElementById("addPoint");

const timeA = document.getElementById("timeA");
const timeB = document.getElementById("timeB");

const status = document.getElementById("status");

const syncList = document.getElementById("syncList");

let syncPoints = [];


//------------------------------
// 動画読込
//------------------------------

fileA.addEventListener("change",(e)=>{

    const file=e.target.files[0];

    if(!file)return;

    videoA.src=URL.createObjectURL(file);

    status.textContent="動画A 読込完了";

});


fileB.addEventListener("change",(e)=>{

    const file=e.target.files[0];

    if(!file)return;

    videoB.src=URL.createObjectURL(file);

    status.textContent="動画B 読込完了";

});


//------------------------------
// 同時再生
//------------------------------

playBtn.addEventListener("click",async()=>{

    if(!videoA.src||!videoB.src){

        alert("動画A・Bを選択してください");

        return;

    }

    try{

        await videoA.play();

        await videoB.play();

        status.textContent="再生中";

    }

    catch(e){

        console.log(e);

    }

});


//------------------------------
// 停止
//------------------------------

pauseBtn.addEventListener("click",()=>{

    videoA.pause();

    videoB.pause();

    status.textContent="停止";

});


//------------------------------
// リセット
//------------------------------

resetBtn.addEventListener("click",()=>{

    videoA.pause();

    videoB.pause();

    videoA.currentTime=0;

    videoB.currentTime=0;

    status.textContent="リセット";

});


//------------------------------
// 比較ポイント追加
//------------------------------

addPointBtn.addEventListener("click",()=>{

    const name=prompt(

        "ポイント名",

        "Point"+(syncPoints.length+1)

    );

    if(!name)return;

    syncPoints.push({

        name:name,

        a:videoA.currentTime,

        b:videoB.currentTime

    });

    drawPointList();

});


//------------------------------
// 一覧表示
//------------------------------

function drawPointList(){

    syncList.innerHTML="";

    syncPoints.forEach((p,index)=>{

        const div=document.createElement("div");

        div.className="syncItem";

        div.innerHTML=

        "<b>"+p.name+"</b><br>"+

        "A："+p.a.toFixed(2)+

        " 秒<br>"+

        "B："+p.b.toFixed(2)+" 秒";

        syncList.appendChild(div);

    });

}


//------------------------------
// 時間表示
//------------------------------

function updateTime(){

    timeA.textContent=

    videoA.currentTime.toFixed(2);

    timeB.textContent=

    videoB.currentTime.toFixed(2);

    requestAnimationFrame(updateTime);

}

requestAnimationFrame(updateTime);
