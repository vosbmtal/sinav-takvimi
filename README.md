# Sınav Takvimi - Interactive Exam Schedule

A comprehensive web application for managing and viewing 1st semester common exam schedules with real-time features and proctor management.

## Features

### Core Functionality
- **Real-time Clock** - Live current time display
- **Exam Schedule** - Complete schedule for 27-31 Ekim, 3-7 Kasım, and 18 Kasım 2025
- **Multiple View Modes**:
  - Schedule Grid View
  - List View
  - Timeline View
- **Advanced Search & Filtering** - By subject, grade, date, or time slot
- **User Role Support** - Student, Parent, and Administrator interfaces

### Time-Based Features
- **Live Countdown Timer** - Shows time until next exam
- **Exam Status Indicators**:
  - 🟣 Yaklaşak (Upcoming)
  - 🔴 Devam Ediyor (In Progress)
  - 🔵 Tamamlandı (Completed)
- **Smart Notifications** - 30-minute warnings and exam start alerts
- **Real-time Updates** - Automatic status changes based on current time

### Proctor Management (October 30th)
- **Role-based Access** - Proctor info visible to Parents and Admins only
- **Complete Assignments** - Main proctor and branch-specific assignments
- **Location Information** - Exam venues and room details
- **Toggle Control** - Show/hide proctor information

### User Interface
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle with persistence
- **Turkish Language Support** - Full Turkish interface
- **Export Functionality** - Download schedules as CSV
- **Print Support** - Optimized print layouts

## Quick Start

### Local Development
1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. No installation required - completely client-side

### Alternative Local Server
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

## Deployment to Vercel

### Method 1: Vercel CLI (Recommended)
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project directory:
   ```bash
   cd /Users/bugracanata/Developer/sinavprogrami
   vercel --prod
   ```

### Method 2: GitHub Integration
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically on push

### Method 3: Drag & Drop
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Drag and drop the project folder

## Project Structure
```
├── index.html              # Main HTML structure
├── styles.css              # Complete CSS with responsive design
├── script.js               # JavaScript application logic
├── vercel.json            # Vercel deployment configuration
├── package.json           # Project metadata
├── README.md              # This file
├── CLAUDE.md              # Claude Code documentation
└── 1.Dönem 1.Ortak Sınavlar (2).xlsx  # Excel data source
```

## Exam Schedule Data

### Time Slots
- 1.DERS: 09:00-09:40
- 2.DERS: 09:50-10:30
- 3.DERS: 10:40-11:20
- 4.DERS: 11:30-12:10
- 5.DERS: 12:20-13:00
- **Lunch Break: 13:00-13:30**
- 6.DERS: 13:30-14:10
- 7.DERS: 14:20-15:00
- 8.DERS: 15:10-15:50
- 9.DERS: 16:00-16:40
- 10.DERS: 16:45-17:25

### October 30th Proctor Assignments
**Sorumlu Gözetmen (Responsible Proctor): ÖZGE AYDIN**

## Technologies Used
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Icons**: Font Awesome 6.0
- **Deployment**: Vercel Static Hosting
- **Data**: Embedded JSON structure from Excel file

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Features by User Role

### Students
- View exam schedules
- Search and filter exams
- Receive notifications
- Export personal schedules

### Parents
- All student features
- View proctor assignments
- Complete exam details

### Administrators
- All parent features
- Full proctor management access
- Complete system access

## License
MIT License - feel free to use for educational purposes.

## Support
For questions or issues, please check the CLAUDE.md file for development guidance.