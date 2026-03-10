const API_KEY = "numlookup100-90c872b4da9548699c6fc5a92e92676b74fc0107dace4957889ddbc666d170119";

async function lookupNumber() {
    const number = document.getElementById('phoneNumber').value.trim();
    const resultCard = document.getElementById('resultCard');
    const resultContent = document.getElementById('resultContent');
    const loader = document.getElementById('loader');

    if (!number) {
        alert("দয়া করে একটি নাম্বার লিখুন!");
        return;
    }

    // Reset UI
    resultCard.style.display = 'none';
    loader.style.display = 'block';

    try {
        const response = await fetch(`https://api.numlookupapi.com/v1/validate/${number}?apikey=${API_KEY}`);
        const data = await response.json();

        loader.style.display = 'none';
        resultCard.style.display = 'block';

        if (data.valid) {
            resultContent.innerHTML = `
                <div class="info-row"><b>স্ট্যাটাস:</b> <span style="color:green">সঠিক (Valid)</span></div>
                <div class="info-row"><b>দেশ:</b> ${data.country_name} (${data.country_code})</div>
                <div class="info-row"><b>অপারেটর:</b> ${data.carrier || 'Unknown'}</div>
                <div class="info-row"><b>ধরন:</b> ${data.line_type || 'N/A'}</div>
                <div class="info-row"><b>লোকেশন:</b> ${data.location || 'N/A'}</div>
            `;
        } else {
            resultContent.innerHTML = `<div class="info-row" style="color:red">দুঃখিত, এই নাম্বারটি সঠিক নয়।</div>`;
        }
    } catch (error) {
        loader.style.display = 'none';
        alert("সার্ভারে সমস্যা হচ্ছে। পরে চেষ্টা করুন।");
    }
}