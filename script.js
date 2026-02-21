// Eğer CONFIG tanımlıysa oradan al, yoksa boş kalsın
const GROQ_API_KEY = (typeof CONFIG !== 'undefined') ? CONFIG.GROQ_API_KEY : "";

if (!GROQ_API_KEY) {
    console.error("API Key bulunamadı!");
    // İstersen burada alert("Lütfen API Key girin") diyebilirsin.
}

// DOM Elements
const sourceCodeInput = document.getElementById('sourceCode');
const targetCodeInput = document.getElementById('targetCode');
const targetLanguageSelect = document.getElementById('targetLanguage');
const translateBtn = document.getElementById('translateBtn');
const outputLanguageBadge = document.getElementById('outputLanguageBadge');
const loadingOverlay = document.getElementById('loadingOverlay');
const copyBtn = document.getElementById('copyBtn');

// State
let isTranslating = false;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Update badge initially
    updateLanguageBadge();
    // Start Matrix Rain
    initMatrixRain();
});

targetLanguageSelect.addEventListener('change', updateLanguageBadge);

translateBtn.addEventListener('click', handleTranslation);

copyBtn.addEventListener('click', copyToClipboard);

// Functions
function updateLanguageBadge() {
    outputLanguageBadge.textContent = targetLanguageSelect.value;
}

async function handleTranslation() {
    if (isTranslating) return;

    const sourceCode = sourceCodeInput.value.trim();
    const targetLanguage = targetLanguageSelect.value;

    if (!sourceCode) {
        alert("Lütfen çevrilecek kodu giriniz.");
        return;
    }

    if (!GROQ_API_KEY || GROQ_API_KEY === "BURAYA_KEY_GELECEK" || GROQ_API_KEY === "BURAYA_KENDI_GROQ_KEYINIZI_YAZIN") {
        alert("Lütfen config.js dosyasındaki GROQ_API_KEY bölümüne geçerli bir API anahtarı giriniz.");
        return;
    }

    // Start Loading
    setLoading(true);

    try {
        const translatedCode = await translateCodeWithGroq(sourceCode, targetLanguage);
        targetCodeInput.value = translatedCode;
    } catch (error) {
        console.error("Translation Error:", error);
        let errorMsg = error.message;
        if (error.message === "Failed to fetch") {
            errorMsg = "Ağ hatası: İnternet bağlantınızı kontrol edin veya tarayıcınızın API isteğini engellemediğinden emin olun (CORS).";
        }
        targetCodeInput.value = "// Bir hata oluştu. Lütfen konsolu kontrol edin veya daha sonra tekrar deneyin.\n// Hata: " + errorMsg;
    } finally {
        setLoading(false);
    }
}

async function translateCodeWithGroq(code, targetLang) {
    const url = "https://api.groq.com/openai/v1/chat/completions";

    // System prompt specifically asked by USER
    const systemPrompt = "Sen uzman bir kod çevirmenisin. Sadece çevrilmiş kodu ver, açıklama yapma.";

    // User prompt
    const userPrompt = `Aşağıdaki kodu ${targetLang} diline çevir:\n\n${code}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            temperature: 0.2 // Low temperature for more deterministic/accurate code generation
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "// Çeviri sonucu boş döndü.";
}

function setLoading(isLoading) {
    isTranslating = isLoading;
    if (isLoading) {
        loadingOverlay.classList.remove('hidden');
        translateBtn.disabled = true;
        translateBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        loadingOverlay.classList.add('hidden');
        translateBtn.disabled = false;
        translateBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

function copyToClipboard() {
    const textToCopy = targetCodeInput.value;
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
        // Visual feedback
        const copyBtnText = document.getElementById('copyBtnText');
        const originalText = copyBtnText.textContent;
        const icon = copyBtn.querySelector('i');

        // Change state
        copyBtnText.textContent = 'Kopyalandı!';
        icon.className = 'fa-solid fa-check text-green-400';
        copyBtn.classList.add('bg-green-500/10', 'border-green-500/30');

        setTimeout(() => {
            // Revert state
            copyBtnText.textContent = originalText;
            icon.className = 'fa-regular fa-clipboard';
            copyBtn.classList.remove('bg-green-500/10', 'border-green-500/30');
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
    });
}

// Matrix Rain Animation
function initMatrixRain() {
    const canvas = document.getElementById('codeRainCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configuration
    const fontSize = 14;
    const fontFamily = 'JetBrains Mono';
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Random start positions
    }

    // Characters
    const chars = "01010101{}[]<>/\\!@#$%^&*()_+-=;:,.?~`ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function draw() {
        // Create fade effect
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'; // Match bg color with transparency
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px ${fontFamily}`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];

            // Random bright characters
            const isBright = Math.random() > 0.98;
            if (isBright) {
                ctx.fillStyle = '#e0e7ff'; // Bright White/Indigo
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#818cf8';
            } else {
                ctx.fillStyle = '#6366f1'; // Primary Indigo
                ctx.shadowBlur = 0;
            }

            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }

    draw();
}