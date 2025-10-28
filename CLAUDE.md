# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive exam schedule management system for 1st semester common exams. The project includes:
- **Excel data source**: `1.Dönem 1.Ortak Sınavlar (2).xlsx` containing exam schedules
- **Web application**: A comprehensive, responsive web app (index.html, styles.css, script.js) for viewing, searching, and managing exam schedules
- **Multi-user support**: Designed for students, parents, and administrators

## Data Structure

The Excel file contains multiple sheets, each representing a different week's exam schedule:

- **27-31 EKİM**: Exam schedule for October 27-31, 2025
- **3-7 KASIM**: Exam schedule for November 3-7, 2025
- **18 KASIM**: Additional exam day for November 18, 2025

Each sheet follows this structure:
- Row 3: Date headers (Monday through Friday with full dates)
- Row 4-11: Time slots (2.DERS through 9.DERS)
- Columns: Each day of the week has subjects scheduled for different class levels (9, 10, 11 grades)

The web application has embedded exam data extracted from the Excel file, containing 37 total exams across both weeks.

## Web Application Features

### Core Functionality
- **Multiple view modes**: Schedule grid, list view, and timeline view
- **Advanced search**: Search by subject, date, day, grade, or time slot
- **Multi-criteria filtering**: Filter by grade level (9, 10, 11) and week
- **User role switching**: Student, parent, and administrator interfaces
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Dark/light theme**: Theme toggle with persistence
- **Export functionality**: Export filtered data to CSV format
- **Print support**: Print-friendly layouts
- **Interactive modals**: Click on exams to see detailed information

### File Structure
```
├── index.html          # Main HTML structure
├── styles.css          # Comprehensive CSS with responsive design
├── script.js           # JavaScript application logic
├── CLAUDE.md           # This documentation file
└── 1.Dönem 1.Ortak Sınavlar (2).xlsx  # Excel data source
```

## Common Tasks

### Running the Web Application
The application is a static website that can be opened directly in a browser:
1. Open `index.html` in any modern web browser
2. No server setup required (all client-side JavaScript)

### Analyzing Exam Schedules (Excel)
Use pandas to read and analyze the Excel data:

```python
import pandas as pd

# Read specific sheet
df = pd.read_excel('1.Dönem 1.Ortak Sınavlar (2).xlsx', sheet_name='27-31 EKİM', header=None)

# Read all sheets
all_sheets = pd.read_excel('1.Dönem 1.Ortak Sınavlar (2).xlsx', sheet_name=None)
```

### Updating Exam Data in Web Application
When updating the Excel file:
1. Extract new exam data using Python/pandas
2. Update the `allExams` array in `script.js` with new data
3. Ensure data format consistency: `{ sheet, timeSlot, date, day, exam, grade, subject }`
4. Test all filtering and search functionality

### Adding New Features
The application is built with a modular structure:
- **HTML**: Semantic structure with clear sections for controls, statistics, and views
- **CSS**: Component-based styling with CSS variables for easy theming
- **JavaScript**: Modular functions for different features (search, filter, export, etc.)

## Working with Excel Files

This project requires Excel file manipulation. Key tools and workflows:

- **pandas**: For data analysis and bulk operations
- **openpyxl**: For preserving formatting when editing existing files
- **recalc.py**: Use this script after any modifications that include formulas

Always verify Excel file integrity after modifications by checking for formula errors and ensuring data consistency across sheets.

## Data Format Notes

- Dates are formatted as "DD MONTH YYYY\nDAYNAME" (in Turkish)
- Class levels use numbers 9, 10, 11
- Subject names are in Turkish
- Time slots are labeled as "X.DERS" (Xth lesson)
- Web app expects exam objects with properties: `sheet`, `timeSlot`, `date`, `day`, `exam`, `grade`, `subject`

## Development Notes

### Browser Compatibility
- Modern browsers with ES6+ support
- LocalStorage used for theme persistence
- Responsive design works on mobile and desktop

### Performance Considerations
- All data is client-side embedded for fast loading
- Efficient DOM manipulation for large datasets
- CSS transitions optimized for smooth animations

### Security Notes
- No sensitive data transmitted over networks
- All processing happens client-side
- CSV export functionality creates downloadable files locally