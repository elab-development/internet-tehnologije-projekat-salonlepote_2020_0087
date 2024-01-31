<!DOCTYPE html>
<html>
<head>
    <title>Potvrda Rezervacije</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            border: 1px solid #dedede;
            border-radius: 5px;
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
        }
        h1 {
            color: #333;
            font-size: 24px;
        }
        p {
            color: #666;
            font-size: 16px;
            line-height: 1.6;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            background-color: #e9e9e9;
            border: 1px solid #dcdcdc;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 3px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Potvrda Rezervacije</h1>
        <p>Zdravo {{ $user->name }},</p>
        <p>Vaša rezervacija je uspešno kreirana.</p>
        <p>Detalji Rezervacije:</p>
        <ul>
            <li>Usluga: {{ $rezervacija->usluga->naziv }}</li>
            <li>Datum: {{ $rezervacija->datum }}</li>
            <li>Vreme: {{ $rezervacija->vreme }}</li>
        </ul>
        <div class="footer">
            Hvala što koristite naše usluge.
        </div>
    </div>
</body>
</html>
