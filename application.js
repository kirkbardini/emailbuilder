// Update the preview and HTML code whenever any input changes
document.getElementById('emailForm').addEventListener('input', updatePreview);
document.getElementById('trackingForm').addEventListener('input', updatePreview);

function updatePreview() {
    const buttonColor = document.getElementById('buttonColor').value;
    const buttonTextColor = document.getElementById('buttonTextColor').value;
    const buttonUrl = document.getElementById('buttonUrl').value;
    const buttonText = document.getElementById('buttonText').value;
    const paddingTop = document.getElementById('paddingTop').value || 20;
    const paddingBottom = document.getElementById('paddingBottom').value || 0;

    const paragraphStyle = 'style="margin: 20px 0 0; line-height: 1.4; font-size: 18px;"';
    const bodyMessage = document.getElementById('bodyMessage').value.replace(/\n/g, `</p><p ${paragraphStyle}>`);
    const afterCtaMessage = document.getElementById('afterCtaMessage').value.replace(/\n/g, `</p><p ${paragraphStyle}>`);

    const utmSource = document.getElementById('utmSource').value || 'courier';
    const utmMedium = document.getElementById('utmMedium').value || 'email';
    const utmCampaign = document.getElementById('utmCampaign').value || 'email_campaign_name';
    const companyName = document.getElementById('companyName').value;
    const language = document.getElementById('language').value;
    const unsubscribeLink = document.getElementById('unsubscribeLink').value || '%UNSUBSCRIBELINK%';
    const bodyMessageAlignment = document.getElementById('bodyMessageAlignment').value || 'left';
    const afterCtaMessageAlignment = document.getElementById('afterCtaMessageAlignment').value || 'left';

    const address = companyName === 'ActiveView Inc.' ? '5004 Cobalt CT Greenacres, Florida 33463, US' : '10616 Keemia tn4, Tallinn, Estonia';

    const unsubscribeMessage = language === 'en'
        ? "All our content is designed to help you. If you no longer want to receive our recommendations, you can unsubscribe below."
        : "Todo nuestro contenido está diseñado para ayudarte. Si ya no deseas recibir nuestras recomendaciones, puedes darte de baja a continuación.";

    const unsubscribeLinkText = language === 'en' ? "Unsubscribe from this list" : "Darse de baja";

    const privacyText = language === 'en' ? "Privacy" : "Privacidad";
    const termsText = language === 'en' ? "Terms of Use" : "Términos de Uso";

    if (!buttonUrl || !buttonText) {
        return;
    }

    const fullUrl = `${buttonUrl}?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}`;
    const urlDomain = new URL(buttonUrl).origin;

    const emailTemplate = `
<!DOCTYPE html>
<html lang="${language}">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: sans-serif; }
    </style>
</head>

<body style="margin: 0; padding: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4;">
    <center style="width: 100%; background-color: #f4f4f4;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <tr>
                <td style="padding: 20px; text-align: ${bodyMessageAlignment}; background-color: #ffffff; border-radius: 8px 8px 0 0;">
                    <p style="margin: 20px 0 0; line-height: 1.4; font-size: 18px;">
                        ${bodyMessage}
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                            <td align="center" style="padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px;">
                                <a href="${fullUrl}" style="display: inline-block; background-color: ${buttonColor}; color: ${buttonTextColor}; font-size: 24px; font-weight: bold; text-align: center; text-decoration: none; padding: 12px 24px; border-radius: 5px; margin: 20px 0;">${buttonText}</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="padding-left: 20px; padding-right: 20px; text-align: ${afterCtaMessageAlignment}; background-color: #ffffff; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0 0 0 0; line-height: 1.4; font-size: 18px;">
                        ${afterCtaMessage}
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #ffffff; border-radius: 0 0 8px 8px;">
                    <hr style="border: none; border-top: 1px solid #cccccc; margin: 20px 0;" />
                    <p style="margin: 0; line-height: 1.4; font-size: 14px; color: #666666;">
                        ${companyName} - ${address}
                    </p>
                    <p style="margin: 10px 0; line-height: 1.4; font-size: 14px; color: #666666;">
                        <i>${unsubscribeMessage}</i>
                    </p>
                    <p style="margin: 10px 0; line-height: 1.4; font-size: 14px; color: #666666;">
                        <a href="${unsubscribeLink}" style="color: #666666; font-weight: bold; text-decoration: underline;">${unsubscribeLinkText}</a>
                    </p>
                    <p style="margin: 10px 0; line-height: 1.4; font-size: 14px; color: #666666;">
                        <a href="${urlDomain}/privacy/" style="color: #666666; text-decoration: underline;">${privacyText}</a>
                        &nbsp;|&nbsp;
                        <a href="${urlDomain}/terms/" style="color: #666666; text-decoration: underline;">${termsText}</a>
                    </p>
                </td>
            </tr>
        </table>
    </center>
</body>

</html>
    `.trim();

    const previewContainer = document.getElementById('previewContainer');
    previewContainer.srcdoc = emailTemplate;

    const htmlCodeElement = document.getElementById('htmlCode');
    htmlCodeElement.textContent = emailTemplate.replace(/<style>.*?<\/style>/s, ''); 
    Prism.highlightElement(htmlCodeElement); 
}




function setPreviewMode(mode) {
    const previewContainer = document.getElementById('previewContainer');
    const desktopViewButton = document.getElementById('desktopViewButton');
    const mobileViewButton = document.getElementById('mobileViewButton');

    if (mode === 'desktop') {
        previewContainer.style.width = '850px'; // Set the desktop view width to at least 850px
        previewContainer.style.height = '667px';

        desktopViewButton.classList.add('active');
        mobileViewButton.classList.remove('active');
    } else if (mode === 'mobile') {
        previewContainer.style.width = '375px';
        previewContainer.style.height = '667px';

        mobileViewButton.classList.add('active');
        desktopViewButton.classList.remove('active');
    }
}

function copyToClipboard() {
    const htmlCode = document.getElementById('htmlCode').textContent;
    navigator.clipboard.writeText(htmlCode).then(() => {
        alert('HTML code copied to clipboard!');
    }, (err) => {
        console.error('Could not copy text: ', err);
    });
}

// Theme toggle functionality
document.getElementById('themeToggleButton').addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
    document.querySelectorAll('.card').forEach(card => card.classList.toggle('dark-theme'));
    document.querySelectorAll('.iframe-container').forEach(container => container.classList.toggle('dark-theme'));
    document.querySelectorAll('.code-viewer pre').forEach(pre => pre.classList.toggle('dark-theme'));
    document.querySelectorAll('.navbar').forEach(navbar => navbar.classList.toggle('dark-theme'));
});

// Initial preview on page load
updatePreview();
setPreviewMode('mobile'); // Set the default view to mobile
