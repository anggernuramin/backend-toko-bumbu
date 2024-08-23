https://youtu.be/l9reBF_i00g referensi koneksi ke prisma

cara mengatasi mysql client dibuka di terminal error

1. npx prisma migrate dev --name init => membuat file migration dengan nam init. ini akan merecord semua perubahan yang ada di file model schema dan menterjemahkan kodenya menjadi syntax database query postgresql
2. npx prisma generate => digunakan untuk mensinkronisasi perubah yang ada di schema.prisma dan hasil migrations sama. Patikan saat menjalankan perintah ini maka project matikan dulu 
