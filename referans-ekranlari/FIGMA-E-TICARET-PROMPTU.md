# Nart Falcon E-Ticaret Tasarım Promptu

Nart Falcon Creative için, mevcut kurumsal web sitesinin tasarım diliyle tamamen uyumlu, profesyonel, responsive ve WhatsApp sipariş akışına sahip eksiksiz bir e-ticaret sitesi tasarla.

## Referans

- Canlı site: https://lab2.efecanakbulut.com
- Eklenen referans ekranlarını ana görsel kaynak olarak kullan.
- Özellikle header, siyah zemin, neon yeşil vurgu, büyük tipografi, editorial grid, geniş boşluklar, ince çizgiler, footer ve mobil menü karakterini koru.
- Tasarım bağımsız bir hazır e-ticaret teması gibi görünmemeli. Mevcut Nart Falcon sitesine sonradan eklenmiş değil, baştan beri aynı sistemin parçasıymış gibi tasarlanmalı.

## Marka kimliği

- Marka: Nart Falcon Creative
- Slogan: “Strateji, tasarım ve teknoloji. Fark yarat. İz bırak.”
- Ana renk: `#B8FF32`
- Ana koyu zemin: `#111111`
- Destek renkleri: `#000000`, `#FFFFFF`, `#F5F5F0`, `#E7E7E2`, `#8C8C86`, `#1A1A1A`, `#2A2A2A`
- Karakter: yaratıcı, cesur, modern, premium, sade, teknoloji ve tasarım odaklı.

Neon yeşili yalnızca ana aksiyonlarda, aktif filtrelerde, fiyat veya kampanya vurgularında ve seçili durumlarda kullan. Her alanı yeşile boyama. Mavi ağırlı klasik e-ticaret görünümü, altın tonları, gereksiz gradient, aşırı gölge, fazla yuvarlak kart ve ucuz hazır tema hissi kullanma.

Mevcut Nart Falcon logosunu değiştirmeden kullan. Logoyu yeniden çizme, oranını veya renklerini değiştirme. Logo dosyası yoksa yeni logo üretme; resmi logonun yerleştirileceği component alanını oluştur.

## Temel ticaret modeli

Bu projede kullanıcı hesabı, üyelik, giriş, şifre, kullanıcı paneli, online ödeme, sipariş numarası, sipariş geçmişi, kargo entegrasyonu veya sipariş takip ekranı olmayacak.

Satış akışı şu şekilde olmalı:

1. Ziyaretçi ürünleri inceler.
2. Ürün detayında varsa varyant, renk, ölçü ve adet seçer.
3. Ürünü sepete ekler.
4. Sepette ürünleri, varyantları, adetleri, birim fiyatları ve toplam tutarı kontrol eder.
5. “Sipariş Detaylarına Geç” butonuyla kısa bilgi formuna ilerler.
6. Ad soyad, WhatsApp telefonu, şehir/ilçe, teslimat adresi ve isteğe bağlı sipariş notu girer.
7. Kullanıcıya gönderilecek WhatsApp mesajının ön izlemesi gösterilir.
8. “WhatsApp’ta Siparişi Tamamla” butonuna basıldığında `wa.me` bağlantısı ile Nart Falcon’ın numarasına, sepet ve müşteri bilgilerini içeren hazır mesajla WhatsApp sohbeti açılır.
9. Kullanıcı mesajı WhatsApp içinde kendisi gönderir.

WhatsApp hedefi için gerçek numara verilene kadar `[WHATSAPP_NUMARASI]` değişkenini kullan. Numara uluslararası formatta, başında `+` olmadan tanımlanacak. Örnek teknik yapı:

`https://wa.me/[WHATSAPP_NUMARASI]?text=[URL_ENCODED_SIPARIS_MESAJI]`

Gerçek numara uydurma veya demo numarası kullanma.

## WhatsApp mesaj formatı

Mesaj düzenli ve okunabilir olmalı:

```text
Merhaba Nart Falcon, web sitenizden sipariş vermek istiyorum.

MÜŞTERİ BİLGİLERİ
Ad Soyad: [ad soyad]
Telefon: [telefon]
Şehir / İlçe: [şehir ve ilçe]
Teslimat Adresi: [adres]

SİPARİŞ DETAYLARI
1. [ürün adı]
   Varyant: [varyant]
   Adet: [adet]
   Birim Fiyat: [fiyat]
   Ara Toplam: [tutar]

2. [ürün adı]
   Varyant: [varyant]
   Adet: [adet]
   Birim Fiyat: [fiyat]
   Ara Toplam: [tutar]

TOPLAM: [genel toplam]
Sipariş Notu: [not veya “Yok”]
```

Mesajdaki tüm dinamik alanlar URL encode edilerek WhatsApp bağlantısına aktarılmalı.

Kullanıcı WhatsApp butonuna bastığında “Siparişiniz alındı” gibi yanıltıcı bir mesaj gösterme. Henüz yalnızca WhatsApp sohbeti açılmış olur. Doğru bilgilendirme şu anlama gelmeli:

“WhatsApp sohbeti açıldı. Sipariş talebinizi tamamlamak için hazırlanan mesajı WhatsApp üzerinden gönderin.”

## Tasarlanacak ekranlar

1. Ana sayfa
2. Tüm ürünler / Mağaza
3. Kategori veya koleksiyon sayfası
4. Arama sonuçları
5. Ürün detayı
6. Sepet drawer
7. Sepet sayfası
8. Sipariş bilgileri formu
9. WhatsApp mesaj ön izleme ve onay ekranı
10. WhatsApp açıldı bilgilendirme durumu
11. Hakkımızda
12. İletişim
13. Sık sorulan sorular
14. Teslimat ve iade koşulları
15. Gizlilik ve yasal metinler
16. 404 sayfası

Kullanıcı girişi, kayıt, şifremi unuttum, hesabım, favoriler, siparişlerim, sipariş detayı, kargo takip ve online ödeme ekranları tasarlama.

## Ana sayfa

Ana sayfada şu bölümler yer alsın:

- Minimal duyuru şeridi
- Nart Falcon logosu, Ana Sayfa, Mağaza, Koleksiyonlar, Hakkımızda, İçgörüler, İletişim, Arama ve Sepet içeren header
- Referans sitedeki karakteri koruyan güçlü hero alanı
- “Fark yarat. İz bırak.” ana mesajı
- “Mağazayı Keşfet” ve “Yeni Koleksiyon” aksiyonları
- Öne çıkan kategoriler
- Yeni gelenler
- Öne çıkan koleksiyon
- Çok satanlar
- Marka manifestosu
- Editoryal hikâye / koleksiyonun tasarım süreci
- Güven, teslimat, iade ve WhatsApp destek bilgileri
- İçgörüler
- Nart Falcon tasarımıyla uyumlu footer

## Ürün kartı

Ürün kartında:

- Ana ve hover görseli
- Kategori
- Ürün adı
- Fiyat
- Varsa eski fiyat ve indirim
- Yeni, çok satan, indirimli veya tükendi etiketi
- Renk veya varyant ön izlemesi
- Hızlı sepete ekleme

bulunsun.

Component variant’ları: normal, hover, indirimli, yeni, tükendi, sepete ekleniyor, sepete eklendi ve hata.

## Ürün listeleme

- Breadcrumb
- Başlık ve kategori açıklaması
- Sonuç sayısı
- Arama
- Sıralama
- Kategori, fiyat, renk, varyant ve stok filtreleri
- Aktif filtre etiketleri
- Tüm filtreleri temizleme
- Desktop grid
- Mobil filtre drawer’ı
- Daha fazla yükle veya sayfalama
- Loading, empty ve error state’leri

## Ürün detayı

- Breadcrumb
- Büyük ürün galerisi ve thumbnail’lar
- Yakınlaştırma
- Ürün adı, kategori, fiyat ve indirim bilgisi
- Kısa açıklama
- Renk, ölçü veya diğer varyantlar
- Adet seçici
- Stok durumu
- Sepete Ekle
- WhatsApp’tan Bilgi Al
- Teslimat ve iade özeti
- Detaylı açıklama
- Teknik özellikler / materyal
- Benzer ürünler
- Birlikte tercih edilen ürünler

Zorunlu varyant seçilmeden sepete eklemeye izin verme. Tükendi durumunda butonu pasif göster.

## Sepet

Header’daki sepet tıklandığında sağdan cart drawer açılsın. Drawer ve tam sepet sayfasında:

- Ürün görseli
- Ürün adı
- Seçili varyant
- Birim fiyat
- Adet artırma / azaltma
- Ürün silme
- Satır toplamı
- Genel toplam
- Alışverişe devam etme
- Sipariş detaylarına geçme

bulunsun.

Boş sepet, silme onayı, fiyat değişikliği, stok yetersizliği ve hata state’lerini tasarla.

## Sipariş bilgi formu

Form alanları:

- Ad Soyad — zorunlu
- WhatsApp Telefon Numarası — zorunlu
- Şehir — zorunlu
- İlçe — zorunlu
- Teslimat Adresi — zorunlu
- Sipariş Notu — isteğe bağlı
- KVKK / gizlilik bilgilendirmesini okudum onayı — zorunlu

Formda inline validation, anlaşılır hata mesajı, loading ve disabled durumları olsun. Kullanıcı geri döndüğünde girdiği bilgiler ve sepet kaybolmasın.

Ana buton metni: “WhatsApp Mesajını Hazırla”.

Sonraki ekranda mesaj ön izlemesi, sepet özeti, müşteri bilgileri ve düzenleme bağlantısı göster. Nihai buton: “WhatsApp’ta Siparişi Tamamla”.

## Tasarım sistemi

Figma’da Auto Layout, variables, text/color styles, component properties, variants ve responsive constraints kullan.

Component’ler:

- Announcement bar
- Header ve sticky header
- Mobil menü
- Arama drawer’ı
- Sepet butonu ve adet badge’i
- Button ve icon button
- Ürün kartı
- Kategori kartı
- Badge
- Filter ve select
- Input, textarea, checkbox ve radio
- Varyant seçici
- Adet seçici
- Fiyat alanı
- Accordion ve tabs
- Modal, drawer ve toast
- Breadcrumb ve pagination
- Empty, loading, success ve error state’leri
- Cart item
- Sipariş özeti
- WhatsApp mesaj ön izlemesi
- Footer

Her interaktif component için default, hover, focus, active, selected, disabled, loading, success ve error durumlarını oluştur.

## Responsive ve erişilebilirlik

- Desktop: 1440 px
- Tablet: 768 px
- Mobile: 390 px
- 8 px tabanlı spacing sistemi
- Mobil tasarım desktop’ın küçültülmüş hâli olmamalı.
- Mobilde filtre ve sepet drawer/bottom sheet olarak çalışabilir.
- Mobil ürün detayında sticky “Sepete Ekle” alanı kullan.
- Dokunma hedefleri en az 44 x 44 px olsun.
- Klavye focus state’leri görünür olsun.
- Hata ve başarı durumlarını yalnızca renkle anlatma.
- `#B8FF32` zemin üzerinde okunabilirlik için siyah metin kullan.

## Prototype akışları

1. Ana sayfa → Mağaza → Ürün detayı → Varyant seçimi → Sepete ekle
2. Sepet drawer → Adet değiştir → Sepet sayfası
3. Sepet → Sipariş bilgileri → Mesaj ön izlemesi → WhatsApp’ı aç
4. Arama → Sonuçlar → Ürün detayı
5. Mobil menü → Kategori → Filtre → Ürün detayı
6. Boş sepet, tükendi, eksik varyant, form hatası ve WhatsApp’ın açılamaması durumları

WhatsApp’ın açılamaması durumunda kullanıcıya “Mesajı Kopyala” ve “Tekrar Dene” seçenekleri sunan bir hata durumu tasarla.

## İçerik dili ve sonuç

Tüm arayüz Türkçe olmalı. Lorem Ipsum kullanma. Gerçekçi, kısa ve profesyonel ürün isimleri, açıklamalar ve fiyatlar kullan; ancak belirli olmayan ürün kategorisini gereksiz yere sınırlama.

Ortaya çıkan çalışma yalnızca görsel bir ana sayfa konsepti olmamalı. Ürün keşfi, arama, filtreleme, varyant seçimi, sepet yönetimi, müşteri bilgileri, mesaj ön izlemesi ve WhatsApp sohbetini başlatma dâhil gerçek akışı kapsayan eksiksiz bir Figma tasarım sistemi olmalı.

Tasarım, referans Nart Falcon sitesinin doğal devamı gibi görünmeli. Kullanıcı kurumsal siteden mağazaya geçtiğinde başka bir markaya veya hazır e-ticaret temasına geçtiğini hissetmemeli.
