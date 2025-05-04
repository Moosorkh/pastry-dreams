# Sweet Creations - Pastry Portfolio Website

A full-stack web application for a pastry chef portfolio featuring recipe management, image gallery, and contact functionality.

<p align="center">
  <img src="./public/banner-image.png" alt="Sweet Creations Screenshot" width="800">
</p>

## 🍰 Features

- **Recipe Management**: Create, read, update, and delete recipes with detailed information
- **Image Gallery**: Showcase pastry creations with categorized images
- **Admin Dashboard**: Secure admin interface for content management
- **Contact System**: Contact form with message management
- **User Authentication**: Secure login system for administrators
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Image Upload**: Integration with Cloudinary for image hosting
- **Database Integration**: PostgreSQL database with Prisma ORM

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Material-UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe server
- **Prisma** - ORM for database
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Cloudinary** - Image hosting
- **Multer** - File upload handling

## 📂 Project Structure

```
pastry-portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── types/
│   ├── public/
│   └── package.json
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── lib/
    │   ├── middleware/
    │   ├── routes/
    │   └── utils/
    ├── prisma/
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Cloudinary account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pastry-portfolio.git
   cd pastry-portfolio
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Backend Environment**
   Create `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="postgresql://username:password@localhost:5432/sweet_creations"
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=30d
   FRONTEND_URL=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Database Setup**
   ```bash
   npx prisma migrate dev
   npx prisma db seed  # For seeding initial admin user
   ```

5. **Start Backend Server**
   ```bash
   npm run dev
   ```

6. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

7. **Configure Frontend Environment**
   Create `.env.local` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

8. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```

### Usage

1. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

2. **Admin Access**
   - Email: admin@sweetcreations.com
   - Password: password123

3. **Create Content**
   - Log in as admin
   - Navigate to the admin dashboard
   - Create recipes and manage gallery items
   - View and respond to contact messages

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
# Build files will be in dist/
```

### Backend
```bash
cd backend
npm run build
# Build files will be in dist/
```

## 🔧 Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Environment (development/production) |
| `PORT` | Server port |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for JWT signing |
| `JWT_EXPIRES_IN` | JWT expiration time |
| `FRONTEND_URL` | Frontend URL for CORS |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create recipe (admin)
- `PUT /api/recipes/:id` - Update recipe (admin)
- `DELETE /api/recipes/:id` - Delete recipe (admin)

### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get gallery item by ID
- `POST /api/gallery` - Create gallery item (admin)
- `PUT /api/gallery/:id` - Update gallery item (admin)
- `DELETE /api/gallery/:id` - Delete gallery item (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `GET /api/contact/:id` - Get message by ID (admin)
- `PATCH /api/contact/:id/status` - Update message status (admin)
- `DELETE /api/contact/:id` - Delete message (admin)

### Uploads
- `POST /api/upload/recipe` - Upload recipe image
- `POST /api/upload/gallery` - Upload gallery image

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Project Link: [https://github.com/yourusername/pastry-portfolio](https://github.com/yourusername/pastry-portfolio)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Prisma](https://www.prisma.io/)
- [Cloudinary](https://cloudinary.com/)
- [Express](https://expressjs.com/)

## 📈 Future Enhancements

- [ ] Add user comments on recipes
- [ ] Implement recipe ratings
- [ ] Add recipe search functionality
- [ ] Implement email notifications
- [ ] Add recipe sharing capabilities
- [ ] Implement advanced filtering and sorting
- [ ] Add recipe PDF export
- [ ] Implement multi-language support

---

Made with ❤️ by [Mehdi Azar](https://github.com/Moosorkh/pastry-dreams.git)