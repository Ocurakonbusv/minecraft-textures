// === ✨ ふわっと浮き出るアニメーション（残してあるで！） ===
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

// 画面内の「hidden」ってクラスがついたカードを全部見張る
document.querySelectorAll(".hidden").forEach(el => {
    observer.observe(el);
});


// === 🎮 タップ開閉・音・ダウンロード切り替えの全システム ===
document.addEventListener("DOMContentLoaded", () => {

    // --- ① 一言メッセージのランダム切り替え ---
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

    // --- 🎵 剣を振る音（sound.mp3）の準備 ---
    const audio = new Audio("sound.mp3"); 
    audio.preload = "auto"; 
    audio.volume = 0.5;


    // --- ② 1つ目のカード（Azure 16x）の開閉処理 ---
    const icon = document.getElementById("pack-icon");
    const infoSection = document.getElementById("pack-info-section");

    if (icon) {
        icon.addEventListener("click", () => {
            // 音を鳴らす（連続タップ対応）
            audio.currentTime = 0;
            audio.play().catch(e => console.log("音再生エラー:", e));

            // アイコンをキュッと動かすアニメーション
            icon.style.transform = "scale(0.9) rotate(-15deg)";
            setTimeout(() => icon.style.transform = "scale(1) rotate(0deg)", 100);

            if (infoSection) {
                const isHidden = window.getComputedStyle(infoSection).display === "none";
                if (isHidden) {
                    infoSection.style.display = "block";
                    // 💡 スクロール区域を増やす余白を追加！
                    document.body.style.paddingBottom = "500px";
                } else {
                    infoSection.style.display = "none";
                    // 閉じたら余白を元に戻す
                    document.body.style.paddingBottom = "0px";
                }
            }
        });
    }


    // --- ③ 2つ目のカード（Coming Soon）の開閉処理 ---
    const soonTrigger = document.getElementById("soon-trigger");
    const soonLockBtn = document.getElementById("soon-lock-btn");
    const soonInfoSection = document.getElementById("soon-info-section");

    const toggleSoonSection = () => {
        // こっちを押した時も同じく剣の音を鳴らす！
        audio.currentTime = 0;
        audio.play().catch(e => console.log("音再生エラー:", e));

        // 文字エリアを少しピクッと動かす演出
        soonTrigger.style.transform = "scale(0.95)";
        setTimeout(() => soonTrigger.style.transform = "scale(1)", 100);

        if (soonInfoSection) {
            const isHidden = window.getComputedStyle(soonInfoSection).display === "none";
            if (isHidden) {
                soonInfoSection.style.display = "block";
                // 💡 カミングスーンが開いた時もスクロール区域をググッと増やす！
                document.body.style.paddingBottom = "500px";
            } else {
                soonInfoSection.style.display = "none";
                document.body.style.paddingBottom = "0px";
            }
        }
    };

    // 文字の部分を押しても、Lockedボタンを押しても両方反応するように連動
    if (soonTrigger) soonTrigger.addEventListener("click", toggleSoonSection);
    if (soonLockBtn) soonLockBtn.addEventListener("click", toggleSoonSection);


    // --- ④ ダウンロードボタンの切り替え（1つ目のカード専用） ---
    const downloadBtn = document.getElementById("download-btn");
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
