// === 元のふわっと浮き出るアニメーション ===
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


// === 追加したおもしろギミック ===
document.addEventListener("DOMContentLoaded", () => {

    // --- 要素1：一言メッセージ（順番に切り替える仕組み ＆ 位置自動調整） ---
    const messages = [
        "水色ベースのテクスチャです！",
        "制作期間は約1ヶ月です！",
        "1000人記念の配布テクスチャです！"
    ];
    const msgElement = document.getElementById("random-msg");
    
    if (msgElement) {
        // ブラウザに保存されている「前回の番号」を読み込む（最初は0）
        let currentIndex = parseInt(localStorage.getItem("msgIndex")) || 0;
        
        // 範囲外になっていないかチェック（念のため）
        if (currentIndex >= messages.length) {
            currentIndex = 0;
        }

        // メッセージを表示
        msgElement.innerText = messages[currentIndex];

        // 【ここを追加！】アイコンの真上にきれいな吹き出しとして配置されるようにCSSを自動適用
        msgElement.style.display = "block";
        msgElement.style.margin = "0 auto 25px auto";
        msgElement.style.width = "fit-content";

        // 次回のために、番号を1つ進めてブラウザに保存する
        let nextIndex = (currentIndex + 1) % messages.length;
        localStorage.setItem("msgIndex", nextIndex);
    }

    // --- 要素2：アイコンタップで剣を振る音＆アニメーション（遅延対策・連打可能版） ---
    const icon = document.getElementById("pack-icon");
    
    // 音ファイルをあらかじめ読み込んで準備（プリロード）しておく
    const audio = new Audio("sound.mp3"); 
    audio.preload = "auto"; 
    audio.volume = 0.5; // 音量調整

    if (icon) {
        icon.addEventListener("click", () => {
            // タップされた瞬間に音の再生位置を最初に戻して爆速再生
            audio.currentTime = 0;
            audio.play().catch(error => {
                console.log("初期タップ前の制限解除待ち:", error);
            });

            // アイコンを一瞬だけシュッと傾ける
            icon.style.transform = "scale(0.9) rotate(-15deg)";
            setTimeout(() => {
                icon.style.transform = "scale(1) rotate(0deg)";
            }, 100);
        });
    }

    // --- 要素3：ボタンを押したら「Downloading...」に切り替える ---
    const downloadBtn = document.querySelector(".download-btn");
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
