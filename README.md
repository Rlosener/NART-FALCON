# NART FALCON — kurumsal web sitesi paketi

Bu depo, NART FALCON kurumsal web sitesi için cPanel dağıtım arşivlerini, kurulum notlarını ve referans dosyalarını içerir. Depo içeriği bir e-ticaret backend'inin, ödeme akışının veya stok yönetiminin çalıştığını doğrulamıyor; bu özellikleri mevcut ürün kapsamı olarak kabul etmeyin.

## Tasarım yönü

Kurumsal marka sunumunda ürün ve hizmet bilgisini net bir hiyerarşiyle sunun. Referans ekranları ve Figma materyalleri görsel kararların kaynağıdır; mevcut marka varlıklarını yeniden çizmek yerine doğrudan kullanın. Mobil kırılımlarda başlık, görsel ve iletişim aksiyonlarının okunaklı kalması önceliklidir.

## Depodaki materyaller

- cPanel kurulum rehberi ve yayın arşivleri
- `NART-FALCON-cPanel/` dağıtım dosyaları
- `documentation/` ve referans ekranları
- Figma referans arşivi

## Kurulum ve doğrulama

Yayın hedefi cPanel ise `NART-FALCON-CPANEL-KURULUM-REHBERI.md` içindeki adımları izleyin. Dağıtım arşivini açmadan önce yanında verilen SHA-256 dosyasıyla bütünlüğü kontrol edin ve arşivin kendisini listeleyip doğrulayın. Yerel dosya veya ZIP doğrulaması canlı hosting, alan adı, HTTPS ya da form teslimatını kanıtlamaz.

## Mühendislik notları

Bu depo kaynak kodundan çok, dağıtım ve tasarım referanslarını bir araya getirir. Kod tabanlı değişiklik yapılacaksa önce `NART-FALCON-cPanel/` içindeki gerçek uygulama kökü ve kullanılan teknoloji belirlenmelidir. Güvenlik sırlarını yayın arşivlerine eklemeyin.
