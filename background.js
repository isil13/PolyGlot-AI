const GROQ_API_KEY = "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";

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

        // Send "Loading" state to content script
        try {
            await chrome.tabs.sendMessage(tab.id, { action: "showLoading" });
        } catch (e) {
            console.error("Content script error:", e);
            // Inject script if missing
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });
            // Retry message after injection might be needed but for simplicity just logging
        }

        try {
            const translatedCode = await translateCode(sourceCode, targetLang);
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
