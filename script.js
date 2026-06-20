document.addEventListener("DOMContentLoaded", () => {

    // === ✨ ① ふわっと浮き出るアニメーションシステム ===
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("show");
            }
        });
    });

    // 画面内の「hidden」がついたカードを全部見張る
    document.querySelectorAll(".hidden").forEach(el => {
        observer.observe(el);
    });


    // === 🎮 ② 各種ギミックシステム ===

    // --- 一言メッセージのランダム切り替え ---
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

    // --- 🎵 音（sound.mp3）の準備 ---
    const audio = new Audio("sound.mp3"); 
    audio.preload = "auto"; 
    audio.volume = 0.5;


    // --- ③ 1つ目のカード（Azure 16x）の開閉＆【余白を絶対に増やす処理】 ---
    const icon = document.getElementById("pack-icon");
    const infoSection = document.getElementById("pack-info-section");

    if (icon) {
        icon.addEventListener("click", () => {
            audio.currentTime = 0;
            audio.play().catch(e => console.log(e));

            icon.style.transform = "scale(0.9) rotate(-15deg)";
            setTimeout(() => icon.style.transform = "scale(1) rotate(0deg)", 100);

            if (infoSection) {
                // 現在非表示（none）かどうかをチェック
                if (infoSection.style.display === "none" || infoSection.style.display === "") {
                    infoSection.style.display = "block";
                    // 💡 開いたら画面の一番下に500pxの特大のスクロール区域を強制追加！
                    document.body.style.setProperty("padding-bottom", "500px", "important");
                } else {
                    infoSection.style.display = "none";
                    // 閉じたら元に戻す
                    document.body.style.setProperty("padding-bottom", "100px", "important");
                }
            }
        });
    }


    // --- ④ 2つ目のカード（Coming Soon）の開閉＆【余白を絶対に増やす処理】 ---
    const soonTrigger = document.getElementById("soon-trigger");
    const soonLockBtn = document.getElementById("soon-lock-btn");
    const soonInfoSection = document.getElementById("soon-info-section");

    const toggleSoonSection = () => {
        audio.currentTime = 0;
        audio.play().catch(e => console.log(e));

        soonTrigger.style.transform = "scale(0.95)";
        setTimeout(() => soonTrigger.style.transform = "scale(1)", 100);

        if (soonInfoSection) {
            if (soonInfoSection.style.display === "none" || soonInfoSection.style.display === "") {
                soonInfoSection.style.display = "block";
                // 💡 こっちが開いた時も500pxのスクロール区域を強制追加！
                document.body.style.setProperty("padding-bottom", "500px", "important");
            } else {
                soonInfoSection.style.display = "none";
                document.body.style.setProperty("padding-bottom", "100px", "important");
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
