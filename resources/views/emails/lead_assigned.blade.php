<!DOCTYPE html>
<html>
<head>
    <title>New Lead Assigned</title>
</head>
<body>
    @if (!empty($body))
    <div style="font-size: 16px; line-height: 1.6;">
        {!! nl2br(e($body)) !!}
    </div>
    <hr style="margin: 20px 0;">
    @endif

    <h1>New Lead Assigned</h1>
    <p>A new lead has been assigned to your customer account.</p>
    <p>Lead Details:</p>

    @if (!empty($selectedFields) && !empty($selectedData))
    <ul>
        @foreach($selectedFields as $field)
            <li><strong>{{ ucwords(str_replace('_', ' ', $field)) }}:</strong> {{ data_get($selectedData, $field, 'N/A') }}</li>
        @endforeach
    </ul>
    @else
    <ul>
        <li>Company Name: {{ $lead->company_name }}</li>
        <li>Contact Name: {{ $lead->contact_name }}</li>
        <li>Contact Email: {{ $lead->contact_email }}</li>
        <li>Contact Phone: {{ $lead->contact_phone }}</li>
        <!-- Add more lead details as needed -->
    </ul>
    @endif
</body>
</html>
