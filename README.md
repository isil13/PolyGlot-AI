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

## 🛠️ Kurulum (Manuel Yükleme)

Bu eklenti henüz Chrome Web Mağazası'nda yayınlanmadığı için "Geliştirici Modu" ile ücretsiz kurabilirsiniz.

### Adım 1: Dosyaları İndirin
1.  Bu sayfanın sağ üstündeki yeşil **<> Code** butonuna tıklayın.
2.  **Download ZIP** seçeneğini seçin.
3.  İndirdiğiniz ZIP dosyasını klasöre çıkartın.

### Adım 2: Chrome'a Yükleyin
1.  Google Chrome tarayıcısını açın.
2.  Adres çubuğuna şunu yazıp Enter'a basın: `chrome://extensions/`
3.  Sağ üst köşedeki **Geliştirici modu (Developer mode)** anahtarını **AÇIK** hale getirin.
4.  Sol üstte beliren **Paketlenmemiş öğe yükle (Load unpacked)** butonuna tıklayın.
5.  Az önce ZIP'ten çıkardığınız klasörü seçin.

🎉 **Tebrikler!** Polyglot tarayıcınıza eklendi.

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
