const mqtt = require('mqtt');
require("dotenv").config();

// Konfigurasi broker MQTT
const brokerUrl = `${process.env.PROTOCOL}://${process.env.URL}`

const topic1 = process.env.TOPIC1
const topic2 = process.env.TOPIC2

// Buat koneksi MQTT dengan opsi
const client = mqtt.connect(brokerUrl);
let topic1Timeout; // Variabel untuk menampung timer

// Tangani ketika koneksi terbuka
client.on('connect', function () {
    console.log('Terhubung ke broker MQTT');

    // Lakukan subscribe ke topic MQTT
    client.subscribe(topic1, function (err) {
        if (err) {
            console.error('Gagal melakukan subscribe:', err);
        } else {
            console.log('Berlangganan ke topik:', topic1);
        }
    });

    // Set timer untuk memantau jika tidak ada pesan dari topic1 dalam 5 detik
    topic1Timeout = setTimeout(() => {
        const sendData = 0

        // Kirim data ke topic2 MQTT
        client.publish(topic2, sendData.toString(), function (err) {
            if (err) {
                console.error('Gagal mengirim pesan:', err);
            } else {
                console.log('Pesan berhasil dikirim:', sendData);
            }
        });
    }, 3000);
});

// Tangani pesan yang diterima dari topik yang di-subscribe
client.on('message', function (topic1, message) {
    // Bersihkan timer setiap kali ada pesan yang diterima dari topic1
    clearTimeout(topic1Timeout);

    // Menerima data dari topic1 
    const dataReceive = message.toString()

    // Kirim data ke topic2 MQTT
    client.publish(topic2, dataReceive.toString(), function (err) {
        if (err) {
            console.error('Gagal mengirim pesan:', err);
        } else {
            console.log('Pesan berhasil dikirim:', dataReceive);
        }
    });

    // Set timer kembali untuk memantau jika tidak ada pesan dari topic1 dalam 5 detik
    topic1Timeout = setTimeout(() => {
        const sendData = 0

        // Kirim data ke topic2 MQTT
        client.publish(topic2, sendData.toString(), function (err) {
            if (err) {
                console.error('Gagal mengirim pesan:', err);
            } else {
                console.log('Pesan berhasil dikirim:', sendData);
            }
        });
    }, 3000);
});

// Tangani kesalahan
client.on('error', function (error) {
    console.error('Terjadi kesalahan:', error);
});
