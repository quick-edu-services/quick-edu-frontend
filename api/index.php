<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Load environment variables from .env file
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($key, $value) = explode('=', $line, 2);
        putenv(trim($key) . '=' . trim($value));
    }
}

$CASHFREE_APP_ID = getenv('CASHFREE_APP_ID');
$CASHFREE_SECRET_KEY = getenv('CASHFREE_SECRET_KEY');
$CASHFREE_ENV = getenv('CASHFREE_ENV') ?: 'sandbox';
$CASHFREE_BASE_URL = $CASHFREE_ENV === 'production' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';

$requestUri = $_SERVER['REQUEST_URI'];

// Health check endpoint
if (strpos($requestUri, '/api/health') !== false && $_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['status' => 'ok', 'message' => 'API is running']);
    exit;
}

// Route: Create Order
if (strpos($requestUri, '/api/create-order') !== false && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $ch = curl_init($CASHFREE_BASE_URL . '/orders');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($input));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'x-client-id: ' . $CASHFREE_APP_ID,
        'x-client-secret: ' . $CASHFREE_SECRET_KEY,
        'x-api-version: 2023-08-01'
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    http_response_code($httpCode);
    echo $response;
    exit;
}

// Route: Verify Payment
if (preg_match('#/api/verify-payment/(.+)#', $requestUri, $matches) && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $orderId = $matches[1];
    
    $ch = curl_init($CASHFREE_BASE_URL . '/orders/' . $orderId);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'x-client-id: ' . $CASHFREE_APP_ID,
        'x-client-secret: ' . $CASHFREE_SECRET_KEY,
        'x-api-version: 2023-08-01'
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    http_response_code($httpCode);
    echo $response;
    exit;
}

// Default response
http_response_code(404);
echo json_encode([
    'error' => 'Endpoint not found',
    'method' => $_SERVER['REQUEST_METHOD'],
    'uri' => $requestUri,
    'available_endpoints' => [
        'POST /api/create-order',
        'GET /api/verify-payment/{order_id}',
        'GET /api/health'
    ]
]);
?>
