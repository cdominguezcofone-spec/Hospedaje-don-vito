const nightsInput = document.getElementById('nights');
const seasonSelect = document.getElementById('season');
const totalPriceSpan = document.getElementById('totalPrice');
const form = document.getElementById('bookingForm');

// Función encargada de calcular el precio en vivo según la temporada elegida
function calculatePrice() {
    const nights = parseInt(nightsInput.value) || 0;
    const pricePerNight = seasonSelect.value === 'alta' ? 85 : 60;
    totalPriceSpan.innerText = nights * pricePerNight;
}

// Escuchadores para actualizar la cotización inmediatamente si el usuario cambia algo
nightsInput.addEventListener('input', calculatePrice);
seasonSelect.addEventListener('change', calculatePrice);

// Manejo del envío del formulario a Google Sheets
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const data = {
        nombre: document.getElementById('name').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('phone').value,
        noches: nightsInput.value,
        temporada: seasonSelect.value,
        total: totalPriceSpan.innerText
    };

    // URL de Google Apps Script integrada con éxito
    const urlAppScript = 'https://script.google.com/macros/s/AKfycbx94_XNqidK7DOAH7vwei9gvV_ZpbXPVyrYNfKVo4WQpSnVvw74Dw0AkCO44XPjo_Nw/exec';

    fetch(urlAppScript, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(() => {
        form.reset();
        calculatePrice(); // Reinicia el total visual a la base por defecto
        document.getElementById('successMessage').style.display = 'block';
    }).catch(err => alert('Error al enviar los datos a la planilla.'));
});
