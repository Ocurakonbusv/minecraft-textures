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


    // --- ⑤ ダウンロードボタンの切り替え（★マイクラ風実績解除を追加！） ---
    const downloadBtn = document.getElementById("download-btn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            // 連打したときにポップアップが無限に増えるのを防ぐ
            if (downloadBtn.innerText === "Downloading...") return;

            downloadBtn.innerText = "Downloading...";
            downloadBtn.style.backgroundColor = "#444"; // ここでねずみ色にする！
            downloadBtn.style.color = "#888";            // 文字を暗いグレーにする！
            downloadBtn.style.boxShadow = "none";

            // 🛠️ 実績解除の枠をHTMLに新しく作り出す
            const toast = document.createElement("div");
            toast.className = "minecraft-toast";
            toast.innerHTML = `
                <div class="toast-icon"></div>
                <div class="toast-text">
                    <p class="toast-title">チャレンジ完了！</p>
                    <p class="toast-desc">Azure 16x を入手</p>
                </div>
            `;
            document.body.appendChild(toast);

            // 0.1秒後に右からシュッと画面内にスライドさせる
            setTimeout(() => {
                toast.classList.add("show-toast");
            }, 100);

            // 4秒経ったら画面の外へ引っ込めて、用済みの枠を消去する
            setTimeout(() => {
                toast.classList.remove("show-toast");
                setTimeout(() => toast.remove(), 500);
            }, 4000);

            // 3秒後にダウンロードボタンの見た目を戻す設定（お前のコードのまま）
            setTimeout(() => {
                downloadBtn.innerText = "Download";
                const isLight = document.documentElement.classList.contains("light-mode");
                downloadBtn.style.backgroundColor = isLight ? "#ff9933" : "#66d9ff";
                downloadBtn.style.color = "black";
                downloadBtn.style.boxShadow = "";
            }, 3000);
        });
    }

    // --- ☀️ 朝と夜になるテーマ切り替え機能 ---
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.documentElement = document.documentElement; // 判定用
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
