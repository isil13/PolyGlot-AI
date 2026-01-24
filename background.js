// background.js dosyasının EN BAŞI
try {
    importScripts('config.js');
} catch (e) {
    console.log("Config dosyası bulunamadı (GitHub sürümü olabilir).");
}

// Anahtarı config'den çek, eğer yoksa uyarı ver
const GROQ_API_KEY = (typeof CONFIG !== 'undefined') ? CONFIG.GROQ_API_KEY : "LUTFEN_API_KEY_GIRINIZ";

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "polyglot-parent",
        title: "Polyglot ile Çevir",
        contexts: ["selection"]
    });

    const languages = ["Python", "JavaScript", "Java", "C++", "C#", "Go", "Rust", "Swift", "PHP"];
    languages.forEach(lang => {
        chrome.contextMenus.create({
            id: `lang-${lang}`,
            parentId: "polyglot-parent",
            title: lang,
            contexts: ["selection"]
        });
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId.startsWith("lang-")) {
        const targetLang = info.menuItemId.replace("lang-", "");
        const sourceCode = info.selectionText;

        // 1. Önce içerik betiğini (script) ve stili (CSS) enjekte et (Inject on-the-fly)
        // Bu, manifest.json'da content_scripts olmadığından gereklidir.
        try {
            await chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                files: ['content.css']
            });
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });
        } catch (injectionError) {
            console.warn("Script injection failed or already present:", injectionError);
            // Hata olsa bile devam edelim, belki script zaten oradadır.
        }

        // 2. Yükleniyor durumunu gönder
        try {
            await chrome.tabs.sendMessage(tab.id, { action: "showLoading" });
        } catch (e) {
            console.error("Content script connection error:", e);
            return; // Eğer iletişim kuramazsak devam etmenin anlamı yok
        }

        // 3. Kodu çevir
        try {
            const translatedCode = await translateCode(sourceCode, targetLang);

            // 4. Sonucu gönder
            chrome.tabs.sendMessage(tab.id, {
                action: "showResult",
                data: translatedCode,
                lang: targetLang
            });
        } catch (error) {
            chrome.tabs.sendMessage(tab.id, {
                action: "showError",
                error: error.message
            });
        }
    }
});

async function translateCode(code, targetLang) {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const systemPrompt = "Sen uzman bir kod çevirmenisin. Sadece çevrilmiş kodu ver, açıklama yapma. Markdown bloğu kullanma (```), sadece ham kod döndür.";
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
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.2
        })
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "// Çeviri sonucu boş döndü.";
}
