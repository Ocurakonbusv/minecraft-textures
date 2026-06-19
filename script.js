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

    // --- 要素1：一言メッセージ（順番に切り替える仕組み） ---
    const messages = [
        "水色ベースのテクスチャです！",
        "制作期間は約1ヶ月です！",
        "1000人記念の配布テクスチャです！"
    ];
    const msgElement = document.getElementById("random-msg");
    
    if (msgElement) {
        let currentIndex = parseInt(localStorage.getItem("msgIndex")) || 0;
        if (currentIndex >= messages.length) {
            currentIndex = 0;
        }
        msgElement.innerText = messages[currentIndex];

        let nextIndex = (currentIndex + 1) % messages.length;
        localStorage.setItem("msgIndex", nextIndex);
    }

    // --- 要素2：アイコンタップで剣を振る音＆アニメーション ＋ 写真・説明の【確実な開閉】 ---
    const icon = document.getElementById("pack-icon");
    const infoSection = document.getElementById("pack-info-section");
    
    const audio = new Audio("sound.mp3"); 
    audio.preload = "auto"; 
    audio.volume = 0.5;

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

            // 💡【最強の開閉システムに変更】
            if (infoSection) {
                // 今の表示状態をちゃんとブラウザに確認させる（これならインラインCSSでもバグらん！）
                const isHidden = window.getComputedStyle(infoSection).display === "none";

                if (isHidden) {
                    // 隠れてるなら、開く！
                    infoSection.style.display = "block";
                    document.body.style.paddingBottom = "500px"; // 余白を作る
                } else {
                    // 見えてるなら、閉じる！
                    infoSection.style.display = "none";
                    document.body.style.paddingBottom = "0px"; // 余白を消す
                }
            }
        });
    }

    // --- 要素3：ボタンを押したら「Downloading...」に切り替える ---
    const downloadBtn = document.querySelector(".download-btn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            downloadBtn.innerText = "Downloading...";
            downloadBtn.style.backgroundColor = "#444";
            downloadBtn.style.color = "#888";
            downloadBtn.style.boxShadow = "none";

            setTimeout(() => {
                downloadBtn.innerText = "Download";
                downloadBtn.style.backgroundColor = "#66d9ff";
                downloadBtn.style.color = "black";
                downloadBtn.style.boxShadow = "";
            }, 3000);
        });
    }
});
