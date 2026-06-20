// === ✨ ① ふわっと浮き出るアニメーション（完全復活！） ===
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

// HTML内の「hidden」がついたカードを見つけてアニメーションをかける
document.querySelectorAll(".hidden").forEach(el => {
    observer.observe(el);
});


// === 🎮 ② タップ開閉・音・ダウンロード切り替えの全システム ===
document.addEventListener("DOMContentLoaded", () => {

    // --- 一言メッセージのランダム切り替え ---
    const messages = [
        "水色ベース of テクスチャです！",
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


    // --- ③ 1つ目のカード（Azure 16x）の開閉＆スクロール区域の延長 ---
    const icon = document.getElementById("pack-icon");
    const infoSection = document.getElementById("pack-info-section");

    if (icon) {
        icon.addEventListener("click", () => {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("音再生エラー:", e));

            icon.style.transform = "scale(0.9) rotate(-15deg)";
            setTimeout(() => icon.style.transform = "scale(1) rotate(0deg)", 100);

            if (infoSection) {
                const isHidden = window.getComputedStyle(infoSection).display === "none";
                if (isHidden) {
                    infoSection.style.display = "block";
                    // 開いたらスクロール区域（透明な余白）を500px増やす！
                    document.body.style.paddingBottom = "500px";
                } else {
                    infoSection.style.display = "none";
                    // 閉じたら元に戻す！
                    document.body.style.paddingBottom = "0px";
                }
            }
        });
    }


    // --- ④ 2つ目のカード（Coming Soon）の開閉＆スクロール区域の延長 ---
    const soonTrigger = document.getElementById("soon-trigger");
    const soonLockBtn = document.getElementById("soon-lock-btn");
    const soonInfoSection = document.getElementById("soon-info-section");

    const toggleSoonSection = () => {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("音再生エラー:", e));

        soonTrigger.style.transform = "scale(0.95)";
        setTimeout(() => soonTrigger.style.transform = "scale(1)", 100);

        if (soonInfoSection) {
            const isHidden = window.getComputedStyle(soonInfoSection).display === "none";
            if (isHidden) {
                soonInfoSection.style.display = "block";
                // カミングスーンが開いた時もスクロール区域を500px増やす！
                document.body.style.paddingBottom = "500px";
            } else {
                soonInfoSection.style.display = "none";
                document.body.style.paddingBottom = "0px";
            }
        }
    };

    if (soonTrigger) soonTrigger.addEventListener("click", toggleSoonSection);
    if (soonLockBtn) soonLockBtn.addEventListener("click", toggleSoonSection);


    // --- ⑤ ダウンロードボタンの切り替え ---
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
