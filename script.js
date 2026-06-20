document.addEventListener("DOMContentLoaded", () => {

    // === ✨ ① ふわっと浮き出るアニメーションシステム ===
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


    // --- ③ 1つ目のカード（Azure 16x）の開閉 ---
    const icon = document.getElementById("pack-icon");
    const infoSection = document.getElementById("pack-info-section");

    if (icon) {
        icon.addEventListener("click", () => {
            audio.currentTime = 0;
            audio.play().catch(e => console.log(e));

            icon.style.transform = "scale(0.9) rotate(-15deg)";
            setTimeout(() => icon.style.transform = "scale(1) rotate(0deg)", 100);

            if (infoSection) {
                if (infoSection.style.display === "none" || infoSection.style.display === "") {
                    infoSection.style.display = "block";
                    document.body.style.setProperty("padding-bottom", "500px", "important");
                } else {
                    infoSection.style.display = "none";
                    document.body.style.setProperty("padding-bottom", "100px", "important");
                }
            }
        });
    }


    // --- ④ 2つ目のカード（Coming Soon）の開閉 ---
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
                document.body.style.setProperty("padding-bottom", "500px", "important");
            } else {
                soonInfoSection.style.display = "none";
                document.body.style.setProperty("padding-bottom", "100px", "important");
            }
        }
    };

    if (soonTrigger) soonTrigger.addEventListener("click", toggleSoonSection);
    if (soonLockBtn) soonLockBtn.addEventListener("click", toggleSoonSection);


    // === 📊 ⑤ ダウンロードカウンターの制御 ===
    const downloadBtn = document.getElementById("download-btn");
    const dlCountEl = document.getElementById("dl-count");
    
    let baseVotes = 1234;
    let hasDownloaded = localStorage.getItem("hasDownloadedAzure") === "true";

    if (hasDownloaded) {
        dlCountEl.innerText = baseVotes + 1;
    } else {
        dlCountEl.innerText = baseVotes;
    }

    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            if (!hasDownloaded) {
                hasDownloaded = true;
                localStorage.setItem("hasDownloadedAzure", "true");
                dlCountEl.innerText = baseVotes + 1;
            }

            downloadBtn.innerText = "Downloading...";
            downloadBtn.style.backgroundColor = "#444";
            downloadBtn.style.color = "#888";
            downloadBtn.style.boxShadow = "none";

            setTimeout(() => {
                downloadBtn.innerText = "Download";
                downloadBtn.style.backgroundColor = "var(--main-color)";
                downloadBtn.style.color = "black";
                downloadBtn.style.boxShadow = "";
            }, 3000);
        });
    }


    // === 🌓 ⑥ 昼と夜の切り替えシステム ===
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "dark";

    if (currentTheme === "light") {
        document.documentElement.classList.add("light-mode");
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.documentElement.classList.toggle("light-mode");
            
            let theme = "dark";
            if (document.documentElement.classList.contains("light-mode")) {
                theme = "light";
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
            
            localStorage.setItem("theme", theme);
        });
    }
});
