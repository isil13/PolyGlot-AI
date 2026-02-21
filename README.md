# Polyglot - AI Code Translator 🚀

**Yapay Zeka Destekli Anlık Kod Çeviri Aracı**

Polyglot, geliştiricilerin ve öğrencilerin kod parçacıklarını saniyeler içinde farklı programlama dillerine çevirmesini sağlayan, Llama 3.3 destekli açık kaynaklı bir Chrome eklentisidir.

🌐 **Tanıtım ve Web Sitesi:** [https://poly-glot-ai-roan.vercel.app/](https://poly-glot-ai-roan.vercel.app/)

![Polyglot Screenshot](https://poly-glot-ai-roan.vercel.app/icon.png)

## ✨ Özellikler

* **⚡ Anında Çeviri:** Python, JS, Java, C++, Go ve daha fazlası arasında hızlı geçiş.
* **🖱️ Sağ Tık Entegrasyonu:** Web'de herhangi bir kodu seç, sağ tıkla ve çevir.
* **🛡️ Gizlilik Odaklı:** Verileriniz sunucularda saklanmaz.
* **🎨 Modern Arayüz:** Göz yormayan şık tasarım.


## 🚀 Kurulum ve Kullanım

Bu proje, yüksek hız ve doğruluk için **Groq API** kullanmaktadır. Güvenlik nedeniyle API anahtarı kaynak kodda paylaşılmamıştır. Projeyi çalıştırmak için aşağıdaki basit adımları izleyin:

1. **Groq API Key Alın:** [Groq Cloud Console](https://console.groq.com/keys) adresine gidin ve ücretsiz bir API anahtarı oluşturun.
2. **Yapılandırma Dosyasını Hazırlayın:** Projenin ana dizininde bulunan [config.example.js](cci:7://file:///c:/Users/altin/OneDrive/Desktop/SaaS%20Fabrika/config.example.js:0:0-0:0) dosyasının adını [config.js](cci:7://file:///c:/Users/altin/OneDrive/Desktop/SaaS%20Fabrika/config.js:0:0-0:0) olarak değiştirin.
3. **Anahtarınızı Tanımlayın:** [config.js](cci:7://file:///c:/Users/altin/OneDrive/Desktop/SaaS%20Fabrika/config.js:0:0-0:0) dosyasını bir metin düzenleyici ile açın ve anahtarınızı ilgili alana yapıştırın:
   ```javascript
   const CONFIG = {
       GROQ_API_KEY: "BURAYA_KENDI_API_ANAHTARINIZI_YAZIN"
   };

## ⚙️ Yapılandırma (Önemli!)

Eklentinin çalışması için ücretsiz bir Groq API anahtarına ihtiyacınız vardır.

1.  [Groq Console](https://console.groq.com/keys) adresinden ücretsiz bir API Key alın.
2.  İndirdiğiniz klasördeki `background.js` dosyasını açın.
3.  En üstteki satıra kendi keyinizi yapıştırın:
    ```javascript
    const GROQ_API_KEY = "gsk_........"; // Kendi keyinizi buraya yazın
    ```
4.  Dosyayı kaydedin ve `chrome://extensions` sayfasından eklentiye **Yenile** (Dönme dolap ikonu) yapın.

## 🤝 Katkıda Bulunma

Bu proje açık kaynaklıdır. Pull request göndermekten çekinmeyin!

1.  Repoyu Fork'layın.
2.  Feature branch oluşturun (`git checkout -b feature/AmazingFeature`).
3.  Değişikliklerinizi Commit edin (`git commit -m 'Add some AmazingFeature'`).
4.  Branch'i Push edin (`git push origin feature/AmazingFeature`).
5.  Bir Pull Request açın.

---
**Geliştirici:** Işıl Altınok
