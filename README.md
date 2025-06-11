# Pohon Pengakuan 🌳

Tempat anonim untuk berbagi cerita dan pengakuan. Platform yang memungkinkan siapa pun untuk:
- Menambahkan pengakuan secara anonim (tanpa login)
- Membaca pengakuan acak dari pengguna lain

## 🚀 Fitur

- **Anonim 100%**: Tidak perlu registrasi atau login
- **Pengakuan Acak**: Sistem untuk membaca pengakuan secara acak
- **Responsive Design**: Tampil sempurna di semua perangkat
- **Real-time**: Menggunakan Supabase untuk data real-time
- **Production Ready**: Siap deploy ke Vercel

## 🛠️ Teknologi

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: Supabase (Database + API)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Setup Database Supabase

1. Buat project baru di [Supabase](https://supabase.com)
2. Jalankan migration SQL yang ada di `supabase/migrations/create_confessions_table.sql`
3. Copy URL dan Anon Key dari project settings

## 🔧 Setup Development

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy file environment:
   ```bash
   cp .env.example .env
   ```

4. Isi environment variables di `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Jalankan development server:
   ```bash
   npm run dev
   ```

## 🚀 Deploy ke Vercel

1. Push code ke GitHub repository
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy!

## 📊 Database Schema

**Table: confessions**
- `id` (uuid, primary key)
- `content` (text, 10-1000 karakter)
- `created_at` (timestamptz)
- `is_active` (boolean, default: true)

## 🎨 Design System

- **Colors**: 
  - Primary: Emerald (tree theme)
  - Secondary: Orange (warm accent)
- **Typography**: System fonts dengan hierarki yang jelas
- **Spacing**: 8px base grid system
- **Animations**: Subtle hover effects dan transitions

## 📝 License

MIT License - Feel free to use this project for your own purposes.

---

Dibuat dengan ❤️ untuk komunitas yang ingin berbagi cerita secara anonim.