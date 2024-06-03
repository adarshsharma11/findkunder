<!DOCTYPE html>
<html>
<head>
    <title>New Lead Assigned</title>
</head>
<body>
    <h1>New Lead Assigned</h1>
    <p>A new lead has been assigned to your customer account.</p>
    <p>Lead Details:</p>
    <ul>
        <li>Company Name: {{ $lead->company_name }}</li>
        <li>Contact Name: {{ $lead->contact_name }}</li>
        <li>Contact Email: {{ $lead->contact_email }}</li>
        <li>Contact Phone: {{ $lead->contact_phone }}</li>
        <!-- Add more lead details as needed -->
    </ul>
</body>
</html>
