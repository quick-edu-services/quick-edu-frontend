# 🎓 QuickEdu - Online Learning Platform

<div align="center">
  <img src="src/assets/Quickedulogo-01.png" alt="QuickEdu Logo" width="120"/>
  
  ### Transform Your Future with World-Class Online Education
  
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Admin Panel](#admin-panel)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🌟 About

**QuickEdu** is a modern, full-featured online learning platform built with React and TypeScript. It provides a comprehensive e-learning experience with course management, user authentication, payment integration, and an admin dashboard for platform management.

**Live Demo:** [QuickEdu Platform](https://quickedu.org.in)

### Platform Statistics
- 📚 **100+ Courses** across multiple categories
- 👨‍🏫 **50+ Expert Instructors** from industry
- 👥 **250,000+ Active Students** worldwide
- 🏢 **3+ Branches** serving students globally

---

## ✨ Features

### For Students
- 🔐 **User Authentication** - Secure login/register system
- 📚 **Course Catalog** - Browse 100+ courses across categories
- 🛒 **Shopping Cart** - Add multiple courses and checkout together
- 💳 **Secure Checkout** - Integrated payment gateway
- 📊 **Student Dashboard** - Track enrolled courses and progress
- 🎓 **Certificates** - Earn industry-recognized certificates
- ⭐ **Course Reviews** - Read and write course reviews
- 📱 **Responsive Design** - Works on all devices

### For Instructors
- 👤 **Instructor Profiles** - Detailed instructor pages
- 📈 **Course Analytics** - Track student enrollment
- 💬 **Student Interaction** - Engage with learners

### For Admins
- 🔒 **Admin Panel** - Secure admin dashboard
- 📊 **Analytics** - Platform statistics and insights
- 💰 **Transaction Management** - View all orders and payments
- ⚙️ **Site Settings** - Update contact info, stats, and content
- 👥 **User Management** - Monitor students and instructors

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety
- **Vite 5.4.2** - Build tool
- **React Router DOM 6.26.2** - Routing

### Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS
- **Framer Motion 11.5.4** - Animations
- **Radix UI** - Accessible components
- **Lucide React** - Icon library

### State & Data
- **TanStack Query 5.56.2** - Data fetching
- **LocalStorage** - Client-side storage
- **JSON** - Course and instructor data

### Additional Libraries
- **Swiper 11.1.14** - Carousels
- **Sonner** - Toast notifications
- **React Hook Form** - Form handling

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sujeeth-infosec/QuickEdu.git
cd QuickEdu
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed file organization.

```
QuickEdu/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, videos, logos
│   ├── components/     # Reusable components
│   ├── data/          # JSON data files
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   └── App.tsx        # Main app component
├── scripts/           # Build scripts
└── package.json       # Dependencies
```

---

## 🎯 Key Features

### 1. Multi-Course Enrollment
Students can add multiple courses to cart and purchase them together in a single transaction.

### 2. Admin Dashboard
Comprehensive admin panel with:
- Platform overview and statistics
- Transaction history with search
- Site settings management
- Content management

### 3. Responsive Design
Fully responsive design that works seamlessly on:
- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktops
- 🖥️ Large screens

### 4. Video Background
Dynamic video backgrounds on hero sections for engaging user experience.

### 5. Demo Page
Dedicated demo page showcasing platform features with video presentation.

---

## 🔐 Admin Panel

### Access
- **URL:** `/admin/login`
- **Username:** `admin`
- **Password:** `QuickEdu@2024`

### Features
- **Overview Dashboard** - Platform statistics
- **Transactions** - Complete order history
- **Site Settings** - Update contact information
- **Statistics** - Manage displayed stats
- **Content Management** - Course and instructor management

For detailed admin guide, see [ADMIN_GUIDE.md](ADMIN_GUIDE.md)

---

## 📸 Screenshots

### Homepage
![Homepage](docs/screenshots/homepage.png)

### Course Catalog
![Courses](docs/screenshots/courses.png)

### Admin Dashboard
![Admin](docs/screenshots/admin.png)

---

## 🎨 Customization

### Update Site Information
1. Navigate to Admin Panel (`/admin/login`)
2. Go to "Site Settings" tab
3. Update email, phone, address, etc.
4. Click "Save Changes"

### Add Video Background
1. Place your video file as `public/web-video.mp4`
2. Video will automatically play on homepage and demo page
3. See [HOW_TO_ADD_VIDEO.md](HOW_TO_ADD_VIDEO.md) for details

### Modify Courses
Edit `src/data/courses.json` to add/remove/update courses.

### Modify Instructors
Edit `src/data/instructors.json` to manage instructor profiles.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**MirawoTech Solutions Private Limited**

### Developer
**Sujeeth Kumar Arjun**
- GitHub: [@Sujeeth-infosec](https://github.com/Sujeeth-infosec)
- Email: sujeethkumararjun@gmail.com

---

## 📞 Contact

**QuickEdu Platform**
- 📧 Email: info@quickedu.org.in
- 📱 Phone/WhatsApp: +91 9392328940
- 🏢 Address: PLOT NO - 39/C, H. NO - 301, SR TOWERS, HMT HILLS, ADDAGUTTA, TIRUMALAGIRI, KUKATPALLY, Medchal - Malkajgiri, HYDERABAD, TELANGANA - 500072, INDIA

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Unsplash](https://unsplash.com/) for images

---

## 📊 Project Status

🟢 **Active Development** - Regular updates and improvements

### Recent Updates
- ✅ Multi-course cart system
- ✅ Admin dashboard with transactions
- ✅ Video background support
- ✅ Demo page with platform showcase
- ✅ Enhanced UI/UX improvements

---

<div align="center">
  
  ### ⭐ Star this repository if you find it helpful!
  
  Made with ❤️ by Sujeeth
  
</div>
