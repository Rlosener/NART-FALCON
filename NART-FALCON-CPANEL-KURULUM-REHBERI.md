# Nart Falcon Kurumsal Site + Mağaza cPanel Kurulum Rehberi

Bu rehber iki ayrı paketin kurulumu içindir:

- Kurumsal site: `NART-FALCON-KURUMSAL-cPanel.zip`
- Mağaza ve yönetim paneli: `NART-FALCON-MAGAZA-cPanel.zip`

Önerilen yayın yapısı:

- Kurumsal site: `https://lab2.efecanakbulut.com`
- Mağaza: `https://magaza.lab2.efecanakbulut.com`
- Yönetim paneli: `https://magaza.lab2.efecanakbulut.com/#/admin`

Gerçek domainler farklıysa aşağıdaki örneklerde kendi adreslerinizi kullanın.

## 1. Kuruluma başlamadan önce

1. cPanel'e giriş yapın.
2. Mevcut ana site dosyalarını ZIP olarak yedekleyin.
3. Mevcut mağaza varsa onun dosyalarını da ayrı ZIP olarak yedekleyin.
4. cPanel > Backup veya phpMyAdmin üzerinden mevcut MySQL veritabanının dışa aktarımını alın.
5. Aşağıdaki bilgileri hazır edin:
   - Ana domain
   - Mağaza alt domaini
   - İletişim formu mesajlarının gideceği e-posta
   - Alan adına ait gönderen e-posta
   - WhatsApp sipariş numarası
   - Satıcının ticari unvanı, adresi ve e-posta adresi
   - Gerçek ürünler, fiyatlar ve görseller
6. cPanel > MultiPHP Manager bölümünden hem ana domain hem mağaza için PHP 8.1 veya daha yeni bir sürüm seçin.
7. PDO MySQL, MySQL, session, JSON ve Fileinfo PHP eklentilerinin açık olduğundan emin olun.
8. cPanel > SSL/TLS Status bölümünden ana domain ve mağaza alt domaininde SSL bulunduğunu doğrulayın. Gerekirse Run AutoSSL çalıştırın.

Önerilen PHP sınırları:

```ini
memory_limit = 128M
post_max_size = 16M
upload_max_filesize = 8M
max_execution_time = 60
```

`777` dosya izni kullanmayın. Dosyalar için `644`, klasörler için `755` ile başlayın.

## 2. Mağaza alt alanını oluşturun

1. cPanel > Domains bölümünü açın.
2. `magaza.lab2.efecanakbulut.com` alt alanını oluşturun.
3. Mağaza için ana siteden ayrı bir belge kökü seçin. Örnek:

```text
/public_html/magaza
```

4. Alt alanı oluşturduktan sonra bu klasörde otomatik oluşan geçici `index.html` dosyası varsa kaldırın veya mağaza paketinin üzerine yazmasına izin verin.
5. Tarayıcıda mağaza HTTPS adresini açarak SSL'in çalıştığını doğrulayın.

Ana site ve mağaza aynı belge kökünü kullanmamalıdır.

## 3. Mağaza veritabanını oluşturun

1. cPanel > MySQL Databases veya MySQL Database Wizard bölümünü açın.
2. Yeni bir veritabanı oluşturun. Örnek:

```text
cpanelkullanici_nartmagaza
```

3. Yeni ve yalnızca bu mağazada kullanılacak bir veritabanı kullanıcısı oluşturun.
4. Güçlü, benzersiz bir parola belirleyin ve güvenli bir yere kaydedin.
5. Kullanıcıyı oluşturduğunuz veritabanına ekleyin.
6. Kullanıcıya `ALL PRIVILEGES` verin.
7. Şu bilgileri not edin:
   - Veritabanı sunucusu: çoğu cPanel'de `localhost`
   - Tam veritabanı adı
   - Tam veritabanı kullanıcı adı
   - Veritabanı parolası

cPanel kullanıcı adı öneki otomatik eklenmişse kurulum ekranında önekli tam adı kullanın.

## 4. Mağaza paketini yükleyin

1. cPanel > File Manager bölümünü açın.
2. Mağaza alt alanının belge köküne girin. Örnek: `/public_html/magaza`.
3. `NART-FALCON-MAGAZA-cPanel.zip` dosyasını yükleyin.
4. ZIP dosyasını seçip Extract komutunu çalıştırın.
5. Açıldığında `index.html`, `install.php`, `.htaccess`, `api`, `assets`, `database` ve `storage` doğrudan belge kökünde bulunmalıdır.
6. Dosyalar fazladan bir klasör içinde açıldıysa o klasörün içindekileri mağaza belge köküne taşıyın.
7. Gizli dosyaları görebilmek için File Manager ayarlarında Show Hidden Files seçeneğini açın ve `.htaccess` dosyasının bulunduğunu doğrulayın.
8. ZIP dosyasını sunucudan kaldırın.

Başlangıç izinleri:

```text
Klasörler: 755
Dosyalar: 644
```

Kurucu `api/config.local.php` ve `storage/install.lock` dosyalarını oluşturacaktır. PHP bu klasörlere yazamıyorsa yalnızca `api` ve `storage` klasörlerini geçici olarak `775` yapın. Kurulumdan sonra yeniden `755` yapın. `777` kullanmayın.

## 5. Mağaza kurucusunu çalıştırın

1. Tarayıcıda aşağıdaki adresi açın:

```text
https://magaza.lab2.efecanakbulut.com/install.php
```

2. Veritabanı sunucusuna çoğu cPanel için `localhost` yazın.
3. Önekli tam veritabanı adını girin.
4. Önekli tam veritabanı kullanıcı adını girin.
5. Veritabanı parolasını girin.
6. İlk yönetici için kullanacağınız gerçek e-posta adresini yazın.
7. Güçlü ve benzersiz bir yönetici parolası belirleyin.
8. Kurulumu başlatın ve başarı mesajını bekleyin.

Kurucu otomatik olarak:

- SQL şemasını oluşturur.
- Başlangıç kategorilerini ve ayarlarını ekler.
- İlk yöneticiyi güvenli parola özetiyle oluşturur.
- `api/config.local.php` dosyasını yazar.
- `storage/install.lock` oluşturarak ikinci kurulumu engeller.
- Güvenli başlangıç için mağazayı siparişe kapalı tutar.

Kurulumdan sonra `install.php` adresini tekrar açın. Yeni kurulum kabul etmemesi gerekir.

## 6. Yönetim panelini yapılandırın

1. Aşağıdaki adresi açın:

```text
https://magaza.lab2.efecanakbulut.com/#/admin
```

2. Kurulumda oluşturduğunuz yönetici hesabıyla giriş yapın.
3. Sistem Ayarları bölümünü açın.
4. Kurumsal site adresini tam HTTPS adresiyle girin:

```text
https://lab2.efecanakbulut.com
```

5. WhatsApp numarasını ülke koduyla ve yalnızca rakamlarla girin. Örnek format:

```text
905XXXXXXXXX
```

6. Şu satıcı bilgilerini tamamlayın:
   - Ticari unvan
   - İşletme/adres bilgisi
   - Satıcı e-posta adresi
   - Vergi veya kayıt numarası
   - Faaliyet alanı/yargı bölgesi notu
7. Duyuru metnini kontrol edin.
8. Ayarları kaydedin.
9. Bu aşamada Siparişe Açık seçeneğini henüz açmayın.

Geçerli WhatsApp numarası, ticari unvan, adres ve e-posta olmadan sistem siparişe açılmayı sunucu tarafında reddeder.

## 7. Kategorileri ve ürünleri ekleyin

1. Yönetim paneli > Kategoriler bölümünden gerçek kategorileri oluşturun.
2. Örnek/demo kategorileri kullanmayacaksanız ürün bağlantılarını kontrol ederek kaldırın.
3. Ürünler bölümünden Yeni Ürün seçeneğini açın.
4. Her ürün için şu alanları doldurun:
   - Ürün adı
   - Benzersiz ürün kimliği
   - Kategori
   - Temel fiyat
   - Varsa eski fiyat
   - Etiket
   - Açıklama
   - Materyal
   - Renkler
   - Ölçüler
   - Her ölçü için fiyat farkı
   - Yayında veya gizli durumu
5. Ölçü fiyat farkını yalnızca eklenecek tutar olarak girin. Örnek: temel fiyat 1.000 TL ve büyük ölçü 300 TL fazlaysa `300` girin.
6. Her ürüne en fazla dört PNG, JPG veya WebP görsel ekleyin.
7. Her görselin 700 KB veya daha küçük olduğundan emin olun.
8. Kapak görselini belirleyin.
9. Ürünü kaydedin ve müşteri tarafındaki görünümünü kontrol edin.
10. Renk veya ölçü seçilmeden ürünün sepete eklenemediğini doğrulayın.

## 8. Mağaza sipariş testini yapın

1. Mağazayı müşteri olarak açın.
2. Bir ürün seçin.
3. Renk ve ölçü seçin.
4. Ölçüye bağlı `+X TL` farkının ürün fiyatına anında yansıdığını doğrulayın.
5. Ürünü sepete ekleyin.
6. Sepette birim fiyat ve satır toplamını kontrol edin.
7. Sipariş bilgilerini doldurun.
8. WhatsApp mesaj ön izlemesindeki ürün, renk, ölçü, adet ve toplamı kontrol edin.
9. Mağaza siparişe kapalıyken WhatsApp aksiyonunun çalışmadığını doğrulayın.
10. Yönetim panelinden Siparişe Açık seçeneğini etkinleştirin.
11. Aynı akışı yeniden test edin ve WhatsApp'ın doğru numarayla açıldığını doğrulayın.

WhatsApp'ın açılması siparişin tamamlandığı anlamına gelmez. Müşteri mesajı göndererek süreci tamamlar.

## 9. Mağaza yedeğini test edin

1. Yönetim paneli > Sistem Ayarları bölümüne gidin.
2. Yedeği İndir seçeneğiyle JSON yedeği alın.
3. Dosyayı bilgisayarınızda güvenli bir yerde saklayın.
4. Canlı veri üzerinde deneme yapmadan önce mümkünse ayrı bir test veritabanında geri yüklemeyi deneyin.
5. Yedeği Geri Yükle ile aynı dosyayı seçin.
6. Açık onayı verdikten sonra ürün, kategori, ayar ve işlem geçmişini kontrol edin.

Sistem sıfırlama yapmadan önce hem JSON yedeği hem MySQL dışa aktarımı alın.

## 10. Mağazanın arama motoru yayınını açın

Paket güvenli başlangıç için `noindex` ve siparişe kapalı gelir. Gerçek ürünler, fiyatlar, satıcı bilgileri ve onaylı hukuki metinler tamamlanmadan bu ayarları değiştirmeyin.

Canlı yayın onayı verildiğinde mağaza belge kökündeki `index.html` dosyasında:

```html
<meta name="robots" content="noindex, nofollow">
```

satırını şu şekilde değiştirin:

```html
<meta name="robots" content="index, follow">
```

Ardından mağaza belge kökündeki `robots.txt` dosyasını şu içerikle değiştirin:

```text
User-agent: *
Allow: /
Disallow: /api/
Disallow: /install.php
Disallow: /database/
Disallow: /storage/
```

Mağaza henüz onaylanmadıysa mevcut `Disallow: /` ve `noindex, nofollow` ayarlarını koruyun.

## 11. Kurumsal site paketini yükleyin

Mağaza kurulumu ve HTTPS adresi çalıştıktan sonra kurumsal siteye geçin.

1. cPanel > File Manager bölümünde ana domainin belge kökünü açın. Çoğu hostingde bu klasör `/public_html` olur.
2. Mevcut dosyaların yedeğini aldığınızı tekrar doğrulayın.
3. `NART-FALCON-KURUMSAL-cPanel.zip` dosyasını ana domainin belge köküne yükleyin.
4. ZIP dosyasını seçip Extract komutunu çalıştırın.
5. `index.html`, `.htaccess`, `page-contact.html`, `page-privacy.html`, `robots.txt`, `sitemap.xml`, `css`, `js`, `images` ve `includes` doğrudan belge kökünde bulunmalıdır.
6. Dosyalar fazladan bir klasör içine açıldıysa klasörün içindekileri ana belge köküne taşıyın.
7. ZIP dosyasını sunucudan kaldırın.
8. Dosyaları `644`, klasörleri `755` olarak bırakın.

## 12. Kurumsal site adreslerini ve iletişim bilgilerini girin

File Manager üzerinden şu dosyayı düzenleyin:

```text
js/nart-config.js
```

Örnek yapı:

```javascript
window.NART_PUBLIC_CONFIG = Object.freeze({
  corporateSiteUrl: "https://lab2.efecanakbulut.com",
  storeSiteUrl: "https://magaza.lab2.efecanakbulut.com",
  contact: Object.freeze({
    email: "info@alanadiniz.com",
    phone: "+90 5XX XXX XX XX",
    address: "Gerçek işletme adresi",
  }),
  social: Object.freeze({
    instagram: "https://instagram.com/hesabiniz",
    linkedin: "https://linkedin.com/company/hesabiniz",
  }),
});
```

Bu dosya herkese açıktır. Veritabanı parolası, cPanel parolası, API anahtarı veya başka bir gizli bilgi eklemeyin.

Domain farklıysa `robots.txt`, `sitemap.xml` ve `js/nart-config.js` içindeki adresleri aynı gerçek HTTPS domainiyle güncelleyin.

## 13. İletişim formu e-posta ayarını yapın

İki sunucu ortam değeri gerekir:

- `NART_CONTACT_EMAIL`: Form mesajlarının gideceği gerçek adres
- `NART_FROM_EMAIL`: Hostingin göndermeye yetkili olduğu, alan adına ait gönderen adres

Örnek:

```text
NART_CONTACT_EMAIL=info@alanadiniz.com
NART_FROM_EMAIL=website@alanadiniz.com
```

Hostinginiz environment variable ekranı sunuyorsa değerleri oradan ekleyin. Sunmuyorsa ve Apache `SetEnv` kullanımına izin veriyorsa ana sitenin `.htaccess` dosyasının en altına şunları ekleyebilirsiniz:

```apache
SetEnv NART_CONTACT_EMAIL "info@alanadiniz.com"
SetEnv NART_FROM_EMAIL "website@alanadiniz.com"
```

Bu değişiklikten sonra site `500 Internal Server Error` verirse hosting `SetEnv` kullanımını engelliyordur. Eklediğiniz iki satırı kaldırın ve hosting desteğinden PHP/Apache ortam değişkenlerini tanımlamasını isteyin.

cPanel > Email Deliverability bölümünde SPF ve DKIM kayıtlarının geçerli olduğunu kontrol edin. Mümkünse gönderen adresi cPanel > Email Accounts bölümünde gerçek bir posta kutusu olarak oluşturun.

## 14. İletişim formunu test edin

1. `https://lab2.efecanakbulut.com/page-contact.html` adresini açın.
2. Formu gizlilik onayı vermeden gönderin; sistemin reddetmesi gerekir.
3. Geçerli ad, e-posta, konu ve mesaj girin.
4. Gizlilik onayını işaretleyin.
5. Formu gönderin ve gerçek başarı mesajını bekleyin.
6. `NART_CONTACT_EMAIL` adresinin gelen kutusunu ve spam klasörünü kontrol edin.
7. Aynı testi mobil telefondan da yapın.

Form `503` hatası verirse e-posta ortam değerleri tanımlı veya geçerli değildir. Form başarılı görünüyor ancak e-posta gelmiyorsa hosting mail taşıma servisini, spam klasörünü, SPF/DKIM'i ve PHP `mail()` desteğini kontrol edin.

## 15. Son canlı kabul kontrolü

Kurumsal site:

- Ana sayfa HTTPS ile açılıyor.
- Logo masaüstü, sticky ve mobil header'da doğru görünüyor.
- Mobil menü açılıp kapanıyor.
- Hero video yükleniyor ve duraklatılabiliyor.
- Mağaza bağlantıları doğru alt alanı açıyor.
- Gizlilik ve 404 sayfaları açılıyor.
- İletişim formu gerçek posta kutusuna ulaşıyor.
- `robots.txt` ve `sitemap.xml` gerçek domaini içeriyor.

Mağaza:

- Ana mağaza HTTPS ile açılıyor.
- `/install.php` yeniden kurulum kabul etmiyor.
- `/#/admin` giriş gerektiriyor.
- Ürün ve kategori ekleme/düzenleme/silme çalışıyor.
- Dört görsel eklenebiliyor; beşinci görsel reddediliyor.
- Ölçü fiyat farkı ürün, sepet, özet ve WhatsApp mesajında aynı.
- Siparişe kapalı ve açık durumları doğru çalışıyor.
- WhatsApp doğru numarayla açılıyor.
- JSON yedek alınabiliyor.
- Kurumsal site bağlantısı doğru ana domaine dönüyor.

Sunucu:

- Ana domain ve mağaza SSL sertifikaları geçerli.
- Dizin listeleme kapalı.
- `api/config.local.php`, `database/schema.sql` ve `storage/install.lock` internetten açılamıyor.
- ZIP dosyaları sunucudan kaldırılmış.
- Dosya veya klasörlerde `777` izni yok.
- Son dosya yedeği ve son MySQL yedeği alınmış.

## 16. Geri dönüş işlemi

Kurumsal siteyi geri almak için:

1. Yeni kurumsal dosyaları yayından kaldırın.
2. Kurulum öncesi ana belge kökü yedeğini geri yükleyin.
3. Eski e-posta ortam ayarlarını geri yükleyin.

Mağazayı geri almak için:

1. Mağazayı yönetim panelinden siparişe kapatın.
2. Kurulum öncesi mağaza belge kökü yedeğini geri yükleyin.
3. Aynı zamana ait MySQL yedeğini phpMyAdmin üzerinden geri yükleyin.
4. Yalnızca dosyaları veya yalnızca veritabanını geri almak yerine ikisini aynı sürüme döndürün.
5. Yönetici girişi, ürünler ve mağaza ayarlarını yeniden kontrol edin.

## 17. Sık karşılaşılan sorunlar

### Site 500 hatası veriyor

- PHP 8.1 veya üzeri seçildiğini kontrol edin.
- `.htaccess` içindeki son eklediğiniz satırları kontrol edin.
- cPanel Errors bölümündeki son hata kaydını inceleyin.
- Hostingin `AllowOverride` ve gerekli Apache modüllerine izin verdiğini doğrulayın.

### Kurucu veritabanına bağlanamıyor

- Veritabanı sunucusunu önce `localhost` deneyin.
- Veritabanı ve kullanıcı adında cPanel önekinin bulunduğunu kontrol edin.
- Kullanıcının veritabanına eklendiğini ve tüm yetkilere sahip olduğunu doğrulayın.
- Parolayı boşluk eklemeden yeniden girin.

### Ürün görseli kaydedilemiyor

- Görselin PNG, JPEG veya WebP olduğunu kontrol edin.
- Dosyanın 700 KB sınırını aşmadığını kontrol edin.
- Üründe dört görsel varsa önce birini silin.
- PHP `post_max_size`, `memory_limit` ve Fileinfo eklentisini kontrol edin.

### Mağaza siparişe açılamıyor

- WhatsApp numarasını ülke koduyla, yalnızca 10-15 rakam olarak girin.
- Ticari unvanı doldurun.
- Adresi doldurun.
- Geçerli satıcı e-posta adresi girin.

### İletişim formu 503 veriyor

- `NART_CONTACT_EMAIL` ve `NART_FROM_EMAIL` ortam değerlerini kontrol edin.
- `NART_FROM_EMAIL` için alan adına ait geçerli bir adres kullanın.
- Hostingin PHP e-posta gönderimine izin verdiğini kontrol edin.

