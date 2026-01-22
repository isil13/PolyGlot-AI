function createToast() {
    // Check if exists
    let toast = document.getElementById('polyglot-toast');
    if (toast) return toast;

    // Create Toast
    toast = document.createElement('div');
    toast.id = 'polyglot-toast';
    toast.innerHTML = `
        <div id="polyglot-toast-header">
            <div id="polyglot-title">
                <span>Polyglot</span> Çevirici
            </div>
            <button id="polyglot-close" title="Kapat">✕</button>
        </div>
        <div id="polyglot-content"></div>
        <div id="polyglot-actions" style="display:none;">
            <button id="polyglot-copy-btn" class="polyglot-btn polyglot-btn-primary">Kopyala</button>
        </div>
    `;

    document.body.appendChild(toast);

    // Close Event
    document.getElementById('polyglot-close').addEventListener('click', hideToast);

    // Copy Event
    document.getElementById('polyglot-copy-btn').addEventListener('click', () => {
        const text = document.querySelector('#polyglot-content pre')?.innerText;
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                const btn = document.getElementById('polyglot-copy-btn');
                const originalText = btn.innerText;
                btn.innerText = "Kopyalandı!";
                setTimeout(() => {
                    btn.innerText = originalText;
                }, 2000);
            });
        }
    });

    return toast;
}

function showToast() {
    const toast = createToast();
    // Force reflow
    void toast.offsetWidth;
    toast.classList.add('show');
}

function hideToast() {
    const toast = document.getElementById('polyglot-toast');
    if (toast) {
        toast.classList.remove('show');
    }
}

function showLoading() {
    const toast = createToast();
    const content = document.getElementById('polyglot-content');
    const actions = document.getElementById('polyglot-actions');

    content.innerHTML = `
        <div id="polyglot-loading">
            <div class="polyglot-spinner"></div>
            <span style="font-size:12px; color:#94a3b8;">Kod çevriliyor...</span>
        </div>
    `;
    actions.style.display = 'none';
    showToast();
}

function showResult(code, lang) {
    const toast = createToast();
    const content = document.getElementById('polyglot-content');
    const actions = document.getElementById('polyglot-actions');
    const title = document.querySelector('#polyglot-title');

    title.innerHTML = `<span>Polyglot</span> > ${lang}`;

    // Simple syntax highligting (basic escaping)
    const escapedCode = code.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    content.innerHTML = `<pre>${escapedCode}</pre>`;
    actions.style.display = 'flex';
    showToast();
}

function showError(msg) {
    const toast = createToast();
    const content = document.getElementById('polyglot-content');
    const actions = document.getElementById('polyglot-actions');

    content.innerHTML = `
        <div style="padding:16px; color:#ef4444; font-size:13px; text-align:center;">
            <strong>Hata Oluştu</strong><br>
            ${msg}
        </div>
    `;
    actions.style.display = 'none';
    showToast();
}

// Message Listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showLoading") {
        showLoading();
    } else if (request.action === "showResult") {
        showResult(request.data, request.lang);
    } else if (request.action === "showError") {
        showError(request.error);
    }
});
