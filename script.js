// === ✨ ① ふわっと浮き出るアニメーション ===
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


// === 🎮 ② 全システム完全復活版 ===
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
                    document.body.style.paddingBottom = "500px";
                } else {
                    infoSection.style.display = "none";
                    document.body.style.paddingBottom = "0px";
                }
            }
        });
    }


    // --- ④ 2つ目のカード（Coming Soon）の開閉＆ねずみ色画像表示 ---
    const soonTrigger = document.getElementById("soon-trigger");
    const soonLockBtn = document.getElementById("soon-lock-btn");
    const soonInfoSection = document.getElementById("soon-info-section");

    const toggleSoonSection = () => {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("音再生エラー:", e));

        if (soonTrigger) {
            soonTrigger.style.transform = "scale(0.95)";
            setTimeout(() => soonTrigger.style.transform = "scale(1)", 100);
        }

        if (soonInfoSection) {
            const isHidden = window.getComputedStyle(soonInfoSection).display === "none";
            if (isHidden) {
                soonInfoSection.style.display = "block";
                document.body.style.paddingBottom = "500px";
            } else {
                soonInfoSection.style.display = "none";
                document.body.style.paddingBottom = "0px";
            }
        }
    };

    if (soonTrigger) soonTrigger.addEventListener("click", toggleSoonSection);
    if (soonLockBtn) soonLockBtn.addEventListener("click", toggleSoonSection);


    // --- ⑤ ダウンロードボタンの切り替え（★3秒後カウント＆1人1回制限！） ---
    const downloadBtn = document.getElementById("download-btn");
    const dlCount = document.getElementById("dl-count"); // HTMLの数字部分を見つける

    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            // 連打対策：すでに「Downloading...」の時は何もしない
            if (downloadBtn.innerText === "Downloading...") return;

            // まずボタンをねずみ色にして待機状態にする
            downloadBtn.innerText = "Downloading...";
            downloadBtn.style.backgroundColor = "#444"; 
            downloadBtn.style.color = "#888";            
            downloadBtn.style.boxShadow = "none";

            // ★3秒のカウントダウンが始まったあと、終わる瞬間に判定する！
            setTimeout(() => {
                // ブラウザの記憶部屋を確認
                const hasDownloaded = localStorage.getItem("azure_downloaded");

                // まだダウンロードした記録がなくて、数字の要素があれば「初めてのダウンロード」としてカウント！
                if (!hasDownloaded && dlCount) {
                    let currentCount = parseInt(dlCount.innerText) || 0;
                    dlCount.innerText = currentCount + 1; // 数字を増やす
                    
                    // 「この人はもうダウンロードしたで」という証拠を保存
                    localStorage.setItem("azure_downloaded", "true");
                }

                // 3秒経ったらボタンの見た目を元のテーマカラーに戻す
                downloadBtn.innerText = "Download";
                const isLight = document.documentElement.classList.contains("light-mode");
                downloadBtn.style.backgroundColor = isLight ? "#ff9933" : "#66d9ff";
                downloadBtn.style.color = "black";
                downloadBtn.style.boxShadow = "";
            }, 3000); // 3秒（3000ミリ秒）待つ
        });
    }

    // --- ☀️ 朝と夜になるテーマ切り替え機能 ---
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.documentElement.classList.toggle("light-mode");
            const isLight = document.documentElement.classList.contains("light-mode");
            themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // もしダウンロード中じゃなければ、ボタンの色もテーマに合わせる
            if (downloadBtn && downloadBtn.innerText !== "Downloading...") {
                downloadBtn.style.backgroundColor = isLight ? "#ff9933" : "#66d9ff";
            }
        });
    }
});
