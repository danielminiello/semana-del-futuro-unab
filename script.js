// Espera a que todo el contenido de la página se cargue antes de ejecutar el código.
document.addEventListener('DOMContentLoaded', function() {

    // --- Función para rellenar un campo de texto ---
    const updateField = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    };

    // --- Sección de Red ---
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => updateField('ip', data.ip))
        .catch(() => updateField('ip', 'No se pudo obtener'));

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        updateField('connection-type', connection.effectiveType ? connection.effectiveType.toUpperCase() : 'No disponible');
        updateField('connection-speed', connection.downlink ? `${connection.downlink} Mbps` : 'No disponible');
    } else {
        updateField('connection-type', 'API no soportada');
        updateField('connection-speed', 'API no soportada');
    }

    // --- Sección de Dispositivo y Software ---
    const ua = navigator.userAgent;
    let os = 'Desconocido';
    let browser = 'Desconocido';
    let device = 'Computadora de Escritorio';

    if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    else if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Macintosh')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';

    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edg')) browser = 'Edge';
    
    if (ua.includes('Mobi')) device = 'Móvil o Tablet';

    updateField('os', os);
    updateField('browser', browser);
    updateField('device', device);
    updateField('platform', navigator.platform || 'No disponible');
    updateField('language', navigator.language || 'No disponible');

    // --- Sección de Pantalla y Ventana ---
    updateField('screen', `${window.screen.width} x ${window.screen.height} píxeles`);
    updateField('viewport', `${window.innerWidth} x ${window.innerHeight} píxeles`);

    // --- Sección de Batería (requiere una llamada asíncrona) ---
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            updateField('battery-level', `${Math.round(battery.level * 100)}%`);
            updateField('battery-charging', battery.charging ? 'Sí' : 'No');
        });
    } else {
        updateField('battery-level', 'API no soportada');
        updateField('battery-charging', 'API no soportada');
    }
    
    // --- Sección de Hora y Zona Horaria ---
    try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        updateField('timezone', timeZone);
    } catch (e) {
        updateField('timezone', 'No se pudo obtener');
    }
    
    const now = new Date();
    updateField('local-time', now.toLocaleTimeString());

});
