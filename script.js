// === 元のふわっと浮き出るアニメーション  ===
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".hidden").forEach(el => {
    observer.observe(el);
});


// === 🎮 ここから新しく追加したおもしろギミック ===
document.addEventListener("DOMContentLoaded", () => {

    // --- 💬 要素1：ランダムひとことメッセージ ---
    const messages = [
        "今回のテクスチャ、自信作なので是非使ってください！",
        "PvPで勝ったら動画のコメントで教えてね！",
        "ダウンロードしたらチャンネル登録もよろしくね！",
        "このメッセージが見えた人は今日ラッキーかも！？",
        "Azure 16xで勝率アップ間違いなし！"
    ];
    const msgElement = document.getElementById("random-msg");
    if (msgElement) {
        const randomText = messages[Math.floor(Math.random() * messages.length)];
        msgElement.innerText = randomText;
    }

    // --- ⚔️ 要素2：アイコンタップで剣を振る音＆アニメーション ---
    const icon = document.getElementById("pack-icon");
    
    // アップロードする自分の音ファイル（sound.mp3）に変更した。
    const audio = new Audio("sound.mp3"); 
    audio.volume = 0.5; // 音量調整

    if (icon) {
        icon.addEventListener("click", () => {
            audio.currentTime = 0;
            audio.play();
            // アイコンを一瞬だけシュッと傾ける
            icon.style.transform = "scale(0.9) rotate(-15deg)";
            setTimeout(() => {
                icon.style.transform = "scale(1) rotate(0deg)";
            }, 100);
        });
    }

    // --- 📥 要素3：ボタンを押したら「Downloading...」に切り替える ---
    const downloadBtn = document.getElementById("download-btn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            downloadBtn.innerText = "Downloading...";
            downloadBtn.style.backgroundColor = "#444";
            downloadBtn.style.color = "#888";
            downloadBtn.style.boxShadow = "none"; // 光を一時的に消す

            // 3秒経ったら元のカッコいいボタンに戻す
            setTimeout(() => {
                downloadBtn.innerText = "Download";
                downloadBtn.style.backgroundColor = "#66d9ff";
                downloadBtn.style.color = "black";
                downloadBtn.style.boxShadow = ""; // 光を復活
            }, 3000);
        });
    }
});

