<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome To Findkunder</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #666666;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
    </style>
</head>
<body>
<div class="container">
        <h1>Welcome to FindKunder, {{ $user->email }}!</h1>
        <p>We're thrilled to have you join our community. With FindKunder, you'll be able to connected with companies who are using our marketing network to attract relevant leads more affordably.</p>
        <p>To get started, follow these steps:</p>
        <ol>
            <li>Your Login Password:</li>
            <li>{{ $password }}</li>
        </ol>
        <p>We recommend using a password that is at least 12 characters long and includes a combination of uppercase and lowercase letters, numbers, and symbols.</p>
        <p>For your security, we strongly recommend changing your password upon first login.</p>
        <p>We look forward to seeing you explore FindKunder!</p>
        <p>Best regards,<br>FindKunder Team</p>
    </div>
</body>
</html>
