<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $code, array $data): never {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if (!in_array($method, ['GET', 'POST'], true)) {
    header('Allow: GET, POST');
    respond(405, ['ok' => false, 'message' => 'Bu işlem desteklenmiyor.']);
}
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 32768) {
    respond(413, ['ok' => false, 'message' => 'Mesaj çok uzun. Lütfen kısaltarak tekrar deneyin.']);
}
session_name('nart_contact');
session_set_cookie_params(['httponly' => true, 'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off', 'samesite' => 'Strict', 'path' => '/']);
session_start();
if (!isset($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
if ($method === 'GET') respond(200, ['csrf' => $_SESSION['csrf']]);
$csrf = $_POST['csrf'] ?? '';
if (!is_string($csrf) || !hash_equals($_SESSION['csrf'], $csrf)) {
    respond(403, ['ok' => false, 'message' => 'Form oturumu doğrulanamadı. Sayfayı yenileyerek tekrar deneyin.']);
}
if (!is_string($_POST['form_botcheck'] ?? '') || ($_POST['form_botcheck'] ?? '') !== '') {
    respond(422, ['ok' => false, 'message' => 'Form doğrulanamadı. Lütfen tekrar deneyin.']);
}
if (!is_string($_POST['privacy_consent'] ?? '') || ($_POST['privacy_consent'] ?? '') !== '1') {
    respond(422, ['ok' => false, 'message' => 'Mesajı göndermek için gizlilik bilgilendirmesini onaylayın.']);
}
$limits = ['form_name' => 100, 'form_email' => 254, 'form_subject' => 160, 'form_phone' => 30, 'form_message' => 5000];
$fields = [];
foreach ($limits as $key => $limit) {
    $value = $_POST[$key] ?? '';
    if (!is_string($value) || !preg_match('//u', $value)) respond(422, ['ok' => false, 'message' => 'Lütfen form bilgilerini kontrol edin.']);
    $value = trim($value);
    $length = function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
    if ($length > $limit || ($key !== 'form_phone' && $value === '')) respond(422, ['ok' => false, 'message' => 'Lütfen zorunlu alanları eksiksiz doldurun ve uzunluk sınırlarını kontrol edin.']);
    if ($key !== 'form_message' && preg_match('/[\r\n\x00]/', $value)) respond(422, ['ok' => false, 'message' => 'Form alanlarında geçersiz karakter var.']);
    $fields[$key] = $value;
}
if (!filter_var($fields['form_email'], FILTER_VALIDATE_EMAIL)) respond(422, ['ok' => false, 'message' => 'Lütfen geçerli bir e-posta adresi girin.']);
$recipient = getenv('NART_CONTACT_EMAIL') ?: '';
$sender = getenv('NART_FROM_EMAIL') ?: '';
if (!filter_var($recipient, FILTER_VALIDATE_EMAIL) || !filter_var($sender, FILTER_VALIDATE_EMAIL)) {
    respond(503, ['ok' => false, 'message' => 'İletişim formu şu anda mesaj kabul edemiyor. Lütfen daha sonra tekrar deneyin.']);
}
if (time() - ($_SESSION['last_attempt'] ?? 0) < 60) {
    header('Retry-After: 60');
    respond(429, ['ok' => false, 'message' => 'Yeni bir mesaj göndermeden önce lütfen bir dakika bekleyin.']);
}
$_SESSION['last_attempt'] = time();
$subject = '=?UTF-8?B?' . base64_encode('Nart Falcon | ' . $fields['form_subject']) . '?=';
$body = "Ad: {$fields['form_name']}\nE-posta: {$fields['form_email']}\nTelefon: {$fields['form_phone']}\n\nMesaj:\n{$fields['form_message']}";
$headers = ['From' => 'Nart Falcon <' . $sender . '>', 'Reply-To' => $fields['form_email'], 'MIME-Version' => '1.0', 'Content-Type' => 'text/plain; charset=UTF-8'];
$sent = @mail($recipient, $subject, $body, $headers);
if (!$sent) respond(502, ['ok' => false, 'message' => 'Mesaj gönderilemedi. Girdiğiniz bilgileri koruyarak biraz sonra tekrar deneyin.']);
respond(200, ['ok' => true, 'message' => 'Mesajınız gönderim için kabul edildi. Bizimle iletişime geçtiğiniz için teşekkür ederiz.']);
