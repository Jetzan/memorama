// ip.js
const os = require('os');

function getWifiIP() {
  const interfaces = os.networkInterfaces();

  for (let name in interfaces) {
    // Filtrar por nombres comunes de interfaces Wi-Fi
    if (name.toLowerCase().includes('wi') || name.toLowerCase().includes('wlan')) {
      for (let iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address; // IP encontrada
        }
      }
    }
  }

  return null; // No se encontró IP de Wi-Fi
}

const ipWifi = getWifiIP();

module.exports = ipWifi;
