document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. 吹き出しメッセージのランダム表示 ---
    const messages = [
        "水色ベースのテクスチャです！",
        "制作期間は約1ヶ月です！",
        "1000人記念の配布テクスチャです！"
    ];
    const msgElement = document.getElementById("random-msg");
    if (msgElement) {
        msgElement.innerText = messages[Math.floor(Math.random() * messages.length)];
    }

    // --- 2. カードをふわっと表示 ---
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transition = 'opacity 1s ease-in';
        setTimeout(() => { card.style.opacity = '1'; }, index * 300);
    });

    // --- 3. テーマ切り替え ---
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.documentElement.classList.toggle("light-mode");
            const isLight = document.documentElement.classList.contains("light-mode");
            themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }

    // --- 4. アイコンタップでガクッ＆説明文表示 ---
    const icon = document.getElementById("pack-icon");
    const infoSection = document.getElementById("pack-info-section");
    if (icon && infoSection) {
        icon.addEventListener("click", () => {
            icon.style.transition = "transform 0.1s";
            icon.style.transform = "scale(0.9) rotate(-5deg)";
            setTimeout(() => { icon.style.transform = "scale(1) rotate(0deg)"; }, 100);
            infoSection.style.display = (infoSection.style.display === "none" || infoSection.style.display === "") ? "block" : "none";
        });
    }

    // --- 5. Lockedボタン ---
    const lockBtn = document.getElementById("soon-lock-btn");
    if (lockBtn) {
        lockBtn.addEventListener("click", () => { alert("Coming Soon..."); });
    }

    // --- 6. ダウンロード ---
    const downloadBtn = document.getElementById("download-btn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            downloadBtn.innerText = "Downloading...";
            setTimeout(() => { downloadBtn.innerText = "Download"; }, 2000);
        });
    }
});
