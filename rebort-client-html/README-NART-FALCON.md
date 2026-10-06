# Nart Falcon web sitesi

Ana sayfa `index-4.html` tasarımını kullanır. Klasör kökünden açılan `index.html` aynı sayfanın kopyasıdır. Ana sayfada yapılacak içerik değişiklikleri iki dosyaya da uygulanmalıdır. Orijinal Home 1 şablonu `index-1.html` dosyasında korunur.

Aktif gezinme: Ana sayfa, Biz, Hizmetler, Yaratıcı alanlar, İçgörüler ve İletişim. Hizmet detayları, tasarım notları ve sık sorulan sorular da bu akışa bağlıdır. Diğer Home sürümleri, mağaza, ekip ve fiyatlandırma sayfaları orijinal şablon olarak korunmuştur; aktif menüden bağlantı verilmez.

## Marka

- Ana renk: `#b8ff32`; koyu zemin: `#111111`.
- Ortak görsel kurallar: `css/nart-falcon.css`.
- Etkileşimler ve form davranışı: `js/nart-falcon.js`.
- Header, sabit header ve mobil menü `images/nart-falcon-header.svg` dosyasını kullanır. Bu dosya, kullanıcının son sağladığı `NartFalcon_Beyaz Logo.svg` dosyasının değiştirilmemiş kopyasıdır: yeşil NART FALCON, beyaz CREATIVE yazısı ve şahin çizimi kaynak dosyadaki gibidir. SVG tamamen vektör yollardan oluşur, harici font gerektirmez. Orijinal 160 × 44.1 tuvali, renkler ve oranlar korunur; logo üzerinde kırpma, filtre veya renk dönüşümü uygulanmaz.
- Sayfa içi konseptlerde kullanılan `images/nart-falcon-logo.svg`, sağlanan beyaz SVG'deki şahin ve yeşil yazıyı kullanır. Beyaz arka plan kaldırılmış, aynı marka klasöründeki PDF'ye gömülü Agenda One harfleri vektör yollarına çevrilmiştir. Logo harici font gerektirmez.
- Konsept görseller `images/nart/` altındaki hafif SVG kompozisyonlarıdır; marka sunumu içindir, müşteri projesi veya referansı değildir.
- Ana video, orijinal videonun 12 saniyelik, sessiz, 1280 piksel web sürümüdür. Orijinal dosya korunmuştur.
- Çalışma görselleri konsept / temsili görsel olarak belirtilir. Gerçek müşteri, ödül, çalışan veya proje sayısı iddiası kullanılmaz.

## Yerel önizleme

PHP 8.1 veya üzeri ile bu klasörde `php -S 127.0.0.1:4186` çalıştırın ve `http://127.0.0.1:4186/` adresini açın.

## Hizmetler

Kullanıcının sağladığı yedi ana grup ve 60 alt hizmet, `page-services.html` ve `page-service-details.html` sayfalarında tam liste olarak bulunur. Ana sayfa ve Biz sayfasındaki özetler ile ortak alt menü aynı yedi gruba bağlanır. Hizmet detaylarından iletişim formuna geçişte konu alanı `js/nart-falcon.js` içindeki eşleştirmeyle doldurulur. Önceki `#arayuz`, `#strateji` bağlantıları ve bu hizmetlere ait konu parametreleri de desteklenir.

Biz sayfasındaki uzun bölüm başlıkları 30–64 px aralığında ve 1.2 satır yüksekliğinde gösterilir. Harf yerine kelime bazında sarılır. Marka sayfalarındaki bölüm başlıkları ve alt menü çağrısı dikey giriş animasyonu kullanır; yatay giriş metnin ekran dışında sayfayı genişletmesine yol açmaz. Koyu hizmet listelerinde hover ve klavye odağında başlık yeşil, açıklamalar açık renktir.

## İletişim formunu yayına alma

Form `includes/sendmail.php` üzerinden çalışır. Sunucu ortamında şu iki değer tanımlanmalıdır:

- `NART_CONTACT_EMAIL`: mesajları alacak gerçek adres.
- `NART_FROM_EMAIL`: alan adınıza ait, posta sunucusunun göndermeye yetkili olduğu adres.

PHP `mail()` işlevi için sunucunun posta taşıma servisi yapılandırılmalıdır. Adresler tanımlanmadan form 503 yanıtı verir, başarı mesajı göstermez ve ziyaretçinin girdilerini korur. Alıcı adresleri, telefon ve sosyal hesaplar kullanıcıdan henüz alınmamıştır; örnek iletişim bilgileri yayımlanmamıştır.

Form; sunucu ve tarayıcı doğrulaması, CSRF oturum anahtarı, boş bot alanı, gönderim sırasında kilitleme, zaman aşımı ve oturum başına 60 saniyelik gönderim sınırı içerir. Gönderim kabulü posta kutusuna teslim garantisi değildir; yayında gerçek alıcıya teslim ayrıca doğrulanmalıdır.

Şablonla gelen kullanılmayan demo PHP uç noktaları ve diğer örnek sayfalar yayın paketine dahil edilmeden önce hosting kapsamı belirlenmelidir. Canlı yayın veya gerçek e-posta gönderimi bu marka revizyonu sırasında yapılmamıştır.

## Doğrulama — 26 Eylül 2026

- Son düzenlemede ana sayfa, Biz, Hizmetler ve hizmet detayları Chrome ve WebKit'te 1440, 768, 390 ve 320 px genişliklerde, animasyonlar açıkken kontrol edildi (32 görünüm). Hizmet satırları, uzun Üretim ve Uygulama listesi, hover renkleri ve logo oranları kontrol edildi; bu kontrollerde JavaScript hatası görülmedi.
- Tablet görünümünde bulunan harf animasyonu taşması kelime animasyonuna çevrilerek giderildi; 768 px'de iki motorda hizmetler, manifesto ve alt menü konumlarında sayfa genişliği yeniden 768 px olarak doğrulandı.
- Yedi hizmetin her birinde liste → detay → iletişim formu akışı iki tarayıcı motorunda doğrulandı (14 akış); seçilen hizmet adı konu alanına doğru aktarıldı.
- 11 aktif sayfada yerel bağlantılar ve bölüm hedefleri doğrulandı. İki tam hizmet listesi kullanıcının 60 kalemiyle bire bir karşılaştırıldı. Header SVG'nin yedi şahin yolu ve 160 × 44.1 tuvali kaynak dosyayla karşılaştırıldı.
- İlk marka dönüşümünde 10 aktif sayfa × 4 ekran genişliği (1440, 768, 390, 320 px): azaltılmış animasyonla 40 Chrome yükleme kontrolü yapıldı. Bu ilk kontroller, aşağıdaki bölümlerin animasyon sırasında doğru göründüğünün kanıtı değildir.
- Ana sayfanın varsayılan kopyası dahil 11 HTML dosyasında yerel bağlantılar, bölüm hedefleri, tekrarlanan kimlikler ve eski demo marka metinleri kontrol edildi.
- Mobil menü açma/kapatma, Escape, menüden gezinme, klavyeyle SSS açma, hizmetten konu seçili iletişim formuna geçiş ve yukarı dön düğmesi doğrulandı.
- Boş alan / hatalı e-posta, hata sırasında veri koruma, tekrar deneme, gönderim kilidi ve çift gönderim koruması doğrulandı. Arayüz başarı/hata senaryoları yerel test yanıtlarıyla sınandı; dışarıya e-posta gönderilmedi.
- Gerçek PHP uç noktasında CSRF, yöntem ve alan doğrulaması; posta ayarı yokken 503 yanıtı kontrol edildi. PHP ve JavaScript sözdizimi kontrolleri geçti.
- Fiziksel telefon veya gerçek posta kutusu teslimi bu kontrollerin kapsamında değildir.
