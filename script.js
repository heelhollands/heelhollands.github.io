(function () {
    // Willekeurig weetje (op de homepage staat er server-side al één in de HTML voor Google)
    var WEETJES = [
        "Nederland heeft meer fietsen dan inwoners.",
        "De naam 'Nederland' betekent 'laag land'.",
        "Amsterdam heeft meer bruggen dan Venetië.",
        "Het Nederlandse koningshuis stamt af van Willem van Oranje.",
        "De VOC was in de 17e eeuw het grootste handelsbedrijf ter wereld.",
        "Nederland telt 21 nationale parken.",
        "De allereerste verkeerswet ter wereld kwam uit Nederland (1906).",
        "Het Nederlandse volkslied, het Wilhelmus, is een van de oudste ter wereld."
    ];
    var weetje = document.getElementById('weetje');
    if (weetje) {
        weetje.textContent = WEETJES[Math.floor(Math.random() * WEETJES.length)];
    }

    // Audiospeler
    var audio = document.getElementById('audio-player');
    var huidigeKnop = null;

    function resetKnop(knop) {
        knop.innerHTML = knop.dataset.origineel;
        knop.classList.remove('actief');
        huidigeKnop = null;
    }

    var stopHtml = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

    function speelStream(knop) {
        if (huidigeKnop && huidigeKnop !== knop) { audio.pause(); resetKnop(huidigeKnop); }
        if (huidigeKnop === knop) { audio.pause(); resetKnop(knop); return; }
        audio.src = knop.dataset.url;
        audio.play().catch(function (e) { console.log('Fout bij afspelen:', e); });
        knop.innerHTML = knop.classList.contains('mini') ? stopHtml : stopHtml + ' Stop';
        knop.classList.add('actief');
        huidigeKnop = knop;
    }

    var knoppen = document.querySelectorAll('.play-knop[data-url]');
    for (var i = 0; i < knoppen.length; i++) {
        (function (knop) {
            knop.dataset.origineel = knop.innerHTML;
            knop.addEventListener('click', function () { speelStream(knop); });
        })(knoppen[i]);
    }
})();
