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

    // --- 🎵 効果音（sound1 / sound2 / sound3）の準備 ---
    const openAudio = new Audio("sound1.mp3");   // チェスト開く音
    const closeAudio = new Audio("sound2.mp3"); // チェスト閉じる音
    const toastAudio = new Audio("sound3.mp3"); // ★実績解除の音
    openAudio.preload = "auto";
    closeAudio.preload = "auto";
    toastAudio.preload = "auto";
    openAudio.volume = 0.5;
    closeAudio.volume = 0.5;
    toastAudio.volume = 0.5;

    // --- 🛠️ 3つのテクスチャに同じギミックをセットする関数 ---
    function createTexturePackGimmick(num, packName, textMsgs) {
        
        // 1. 一言メッセージのランダム切り替え
        const msgElement = document.getElementById(`random-msg${num}`);
        if (msgElement) {
            let currentIndex = parseInt(localStorage.getItem(`msgIndex${num}`)) || 0;
            if (currentIndex >= textMsgs.length) {
                currentIndex = 0;
            }
            msgElement.innerText = textMsgs[currentIndex];
            let nextIndex = (currentIndex + 1) % textMsgs.length;
            localStorage.setItem(`msgIndex${num}`, nextIndex);
        }

        // 2. アイコンタップでの開閉＆チェスト音
        const icon = document.getElementById(`pack-icon${num}`);
        const infoSection = document.getElementById(`pack-info-section${num}`);

        if (icon) {
            icon.addEventListener("click", () => {
                icon.style.transform = "scale(0.9) rotate(-15deg)";
                setTimeout(() => icon.style.transform = "scale(1) rotate(0deg)", 100);

                openAudio.load();
                closeAudio.load();

                if (infoSection) {
                    const isHidden = window.getComputedStyle(infoSection).display === "none";
                    if (isHidden) {
                        openAudio.currentTime = 0;
                        openAudio.play().catch(e => console.log("音再生エラー:", e));
                        infoSection.style.display = "block";
                        document.body.style.paddingBottom = "500px";
                    } else {
                        closeAudio.currentTime = 0;
                        closeAudio.play().catch(e => console.log("音再生エラー:", e));
                        infoSection.style.display = "none";
                        document.body.style.paddingBottom = "0px";
                    }
                }
            });
        }

        // 3. ダウンロードボタン＆実績解除トースト音
        const downloadBtn = document.getElementById(`download-btn${num}`);
        if (downloadBtn) {
            downloadBtn.addEventListener("click", () => {
                if (downloadBtn.innerText === "Downloading...") return;

                toastAudio.load();

                downloadBtn.innerText = "Downloading...";
                downloadBtn.style.backgroundColor = "#444"; 
                downloadBtn.style.color = "#888";            
                downloadBtn.style.boxShadow = "none";

                const toast = document.createElement("div");
                toast.className = "minecraft-toast";
                toast.innerHTML = `
                    <div class="toast-icon"></div>
                    <div class="toast-text">
                        <p class="toast-title">チャレンジ完了！</p>
                        <p class="toast-desc">${packName} を入手</p>
                    </div>
                `;
                document.body.appendChild(toast);

                toastAudio.currentTime = 0;
                toastAudio.play().catch(e => console.log("音再生エラー:", e));
                
                setTimeout(() => { toast.classList.add("show-toast"); }, 10);

                setTimeout(() => {
                    toast.classList.remove("show-toast");
                    setTimeout(() => toast.remove(), 500);
                }, 4000);

                setTimeout(() => {
                    downloadBtn.innerText = "Download";
                    const isLight = document.documentElement.classList.contains("light-mode");
                    downloadBtn.style.backgroundColor = isLight ? "#ff9933" : "#66d9ff";
                    downloadBtn.style.color = "black";
                    downloadBtn.style.boxShadow = "";
                }, 3000);
            });
        }
    }

    // --- 🎬 1つ目、2つ目、3つ目のギミック登録 ---
    createTexturePackGimmick(1, "Azure 16x", [
        "水色ベース of テクスチャです！",
        "制作期間は約1ヶ月です！",
        "1000人記念の配布テクスチャです！"
    ]);

    createTexturePackGimmick(2, "Texture Pack v2", [
        "2つ目の自作テクスチャやで！",
        "細部までこだわって作りました！",
        "ダウンロードして使ってみてな！"
    ]);

    createTexturePackGimmick(3, "Texture Pack v3", [
        "最新作のテクスチャ登場！",
        "UIがめちゃくちゃ見やすいで！",
        "感想ツイート待ってます！"
    ]);


    // --- 🔒 ④ 4つ目のカード（Coming Soon）の開閉＆チェスト音連動 ---
    const soonTrigger = document.getElementById("soon-trigger");
    const soonLockBtn = document.getElementById("soon-lock-btn");
    const soonInfoSection = document.getElementById("soon-info-section");

    const toggleSoonSection = () => {
        if (soonTrigger) {
            soonTrigger.style.transform = "scale(0.95)";
            setTimeout(() => soonTrigger.style.transform = "scale(1)", 100);
        }

        openAudio.load();
        closeAudio.load();

        if (soonInfoSection) {
            const isHidden = window.getComputedStyle(soonInfoSection).display === "none";
            if (isHidden) {
                openAudio.currentTime = 0;
                openAudio.play().catch(e => console.log("音再生エラー:", e));
                soonInfoSection.style.display = "block";
                document.body.style.paddingBottom = "500px";
            } else {
                closeAudio.currentTime = 0;
                closeAudio.play().catch(e => console.log("音再生エラー:", e));
                soonInfoSection.style.display = "none";
                document.body.style.paddingBottom = "0px";
            }
        }
    };

    if (soonTrigger) soonTrigger.addEventListener("click", toggleSoonSection);
    if (soonLockBtn) soonLockBtn.addEventListener("click", toggleSoonSection);


    // --- ☀️ 朝と夜になるテーマ切り替え機能 ---
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.documentElement = document.documentElement; 
        themeToggle.addEventListener("click", () => {
            document.documentElement.classList.toggle("light-mode");
            const isLight = document.documentElement.classList.contains("light-mode");
            themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // 1〜3番目の全ボタンの色を切り替え
            for(let i=1; i<=3; i++) {
                const btn = document.getElementById(`download-btn${i}`);
                if (btn && btn.innerText !== "Downloading...") {
                    btn.style.backgroundColor = isLight ? "#ff9933" : "#66d9ff";
                }
            }
        });
    }
});
