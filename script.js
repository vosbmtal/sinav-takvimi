// Global variables
let allExams = [];
let filteredExams = [];
let currentUserRole = 'student';
let currentTime = new Date();
let clockInterval;

// Time slot mapping with exact times
const timeSlotMapping = {
    '1.DERS': { start: '09:00', end: '09:40', displayName: '1. Ders' },
    '2.DERS': { start: '09:50', end: '10:30', displayName: '2. Ders' },
    '3.DERS': { start: '10:40', end: '11:20', displayName: '3. Ders' },
    '4.DERS': { start: '11:30', end: '12:10', displayName: '4. Ders' },
    '5.DERS': { start: '12:20', end: '13:00', displayName: '5. Ders' },
    '6.DERS': { start: '13:30', end: '14:10', displayName: '6. Ders' },
    '7.DERS': { start: '14:20', end: '15:00', displayName: '7. Ders' },
    '8.DERS': { start: '15:10', end: '15:50', displayName: '8. Ders' },
    '9.DERS': { start: '16:00', end: '16:40', displayName: '9. Ders' },
    '10.DERS': { start: '16:45', end: '17:25', displayName: '10. Ders' }
};

// Turkish day mapping
const dayMapping = {
    'MONDAY': 'PAZARTESİ',
    'TUESDAY': 'SALI',
    'WEDNESDAY': 'ÇARŞAMBA',
    'THURSDAY': 'PERŞEMBE',
    'FRIDAY': 'CUMA',
    'SATURDAY': 'CUMARTESİ',
    'SUNDAY': 'PAZAR'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadExamData();
    initializeEventListeners();
    initializeTheme();
    initializeClock();
    requestNotificationPermission();
    updateStatistics();
    renderScheduleView();
    checkForNotifications();
});

// Load exam data from Excel file structure (simulated with embedded data)
function loadExamData() {
    // Since we can't directly read Excel files in browser JavaScript,
    // I've embedded the exam data extracted from the Excel file
    allExams = [
        // Exams originally in 27-31 EKİM week (moved to 18 KASIM)
        { sheet: '18 KASIM', timeSlot: '2.DERS', date: '18 KASIM 2025', day: 'SALI', exam: '9 EDEBİYAT', grade: '9', subject: 'EDEBİYAT' },
        { sheet: '18 KASIM', timeSlot: '3.DERS', date: '18 KASIM 2025', day: 'SALI', exam: '10 DİN KÜLTÜRÜ', grade: '10', subject: 'DİN KÜLTÜRÜ' },
        { sheet: '18 KASIM', timeSlot: '4.DERS', date: '18 KASIM 2025', day: 'SALI', exam: '10 FELSEFE', grade: '10', subject: 'FELSEFE' },
        { sheet: '18 KASIM', timeSlot: '5.DERS', date: '18 KASIM 2025', day: 'SALI', exam: '9 TARİH', grade: '9', subject: 'TARİH' },
        { sheet: '18 KASIM', timeSlot: '7.DERS', date: '18 KASIM 2025', day: 'SALI', exam: '11 SAĞLIK BİL.', grade: '11', subject: 'SAĞLIK BİL.' },

        // 3-7 KASIM week
        { sheet: '3-7 KASIM', timeSlot: '2.DERS', date: '3 KASIM 2025', day: 'PAZARTESİ', exam: '9 MES. GEL. AT.', grade: '9', subject: 'MES. GEL. AT.' },
        { sheet: '3-7 KASIM', timeSlot: '2.DERS', date: '4 KASIM 2025', day: 'SALI', exam: '9 FİZİK', grade: '9', subject: 'FİZİK' },
        { sheet: '3-7 KASIM', timeSlot: '2.DERS', date: '5 KASIM 2025', day: 'ÇARŞAMBA', exam: '9 KİMYA', grade: '9', subject: 'KİMYA' },
        { sheet: '3-7 KASIM', timeSlot: '3.DERS', date: '3 KASIM 2025', day: 'PAZARTESİ', exam: '11 ORT. TÜRK TAR.', grade: '11', subject: 'ORT. TÜRK TAR.' },
        { sheet: '3-7 KASIM', timeSlot: '3.DERS', date: '4 KASIM 2025', day: 'SALI', exam: '11. S.MES. YAB. DİL', grade: '11', subject: 'S.MES. YAB. DİL' },
        { sheet: '3-7 KASIM', timeSlot: '3.DERS', date: '5 KASIM 2025', day: 'ÇARŞAMBA', exam: '11 DİN KÜLTÜRÜ', grade: '11', subject: 'DİN KÜLTÜRÜ' },
        { sheet: '3-7 KASIM', timeSlot: '3.DERS', date: '6 KASIM 2025', day: 'PERŞEMBE', exam: '9 MATEMATİK', grade: '9', subject: 'MATEMATİK' },
        { sheet: '3-7 KASIM', timeSlot: '3.DERS', date: '7 KASIM 2025', day: 'CUMA', exam: '9 S. PEYG. HAYATI', grade: '9', subject: 'S. PEYG. HAYATI' },
        { sheet: '3-7 KASIM', timeSlot: '4.DERS', date: '3 KASIM 2025', day: 'PAZARTESİ', exam: '10 MATEMATİK', grade: '10', subject: 'MATEMATİK' },
        { sheet: '3-7 KASIM', timeSlot: '4.DERS', date: '4 KASIM 2025', day: 'SALI', exam: '10 FİZİK', grade: '10', subject: 'FİZİK' },
        { sheet: '3-7 KASIM', timeSlot: '4.DERS', date: '5 KASIM 2025', day: 'ÇARŞAMBA', exam: '10 KİMYA', grade: '10', subject: 'KİMYA' },
        { sheet: '3-7 KASIM', timeSlot: '4.DERS', date: '6 KASIM 2025', day: 'PERŞEMBE', exam: '10 S. PROJE', grade: '10', subject: 'S. PROJE' },
        { sheet: '3-7 KASIM', timeSlot: '4.DERS', date: '7 KASIM 2025', day: 'CUMA', exam: '10 S. TEM. DİNİ BİL.', grade: '10', subject: 'S. TEM. DİNİ BİL.' },
        { sheet: '3-7 KASIM', timeSlot: '5.DERS', date: '4 KASIM 2025', day: 'SALI', exam: '9 S. PROJE', grade: '9', subject: 'S. PROJE' },
        { sheet: '3-7 KASIM', timeSlot: '5.DERS', date: '5 KASIM 2025', day: 'ÇARŞAMBA', exam: '9 S. DÜŞÜNME EĞ.', grade: '9', subject: 'S. DÜŞÜNME EĞ.' },
        { sheet: '3-7 KASIM', timeSlot: '5.DERS', date: '6 KASIM 2025', day: 'PERŞEMBE', exam: '11 S. MATEMATİK', grade: '11', subject: 'S. MATEMATİK' },
        { sheet: '3-7 KASIM', timeSlot: '5.DERS', date: '7 KASIM 2025', day: 'CUMA', exam: '9 S. ADABI MUA.', grade: '9', subject: 'S. ADABI MUA.' },
        { sheet: '3-7 KASIM', timeSlot: '6.DERS', date: '3 KASIM 2025', day: 'PAZARTESİ', exam: '9 DİN KÜLTÜRÜ', grade: '9', subject: 'DİN KÜLTÜRÜ' },
        { sheet: '3-7 KASIM', timeSlot: '6.DERS', date: '4 KASIM 2025', day: 'SALI', exam: '11 YAB. DİL', grade: '11', subject: 'YAB. DİL' },
        { sheet: '3-7 KASIM', timeSlot: '6.DERS', date: '5 KASIM 2025', day: 'ÇARŞAMBA', exam: '11 EDEBİYAT', grade: '11', subject: 'EDEBİYAT' },
        { sheet: '3-7 KASIM', timeSlot: '6.DERS', date: '6 KASIM 2025', day: 'PERŞEMBE', exam: '11 FELSEFE', grade: '11', subject: 'FELSEFE' },
        { sheet: '3-7 KASIM', timeSlot: '6.DERS', date: '7 KASIM 2025', day: 'CUMA', exam: '11 S. PEY. HAYATI', grade: '11', subject: 'S. PEY. HAYATI' },
        { sheet: '3-7 KASIM', timeSlot: '7.DERS', date: '3 KASIM 2025', day: 'PAZARTESİ', exam: '10 COĞRAFYA', grade: '10', subject: 'COĞRAFYA' },
        { sheet: '3-7 KASIM', timeSlot: '7.DERS', date: '4 KASIM 2025', day: 'SALI', exam: '10 EDEBİYAT', grade: '10', subject: 'EDEBİYAT' },
        { sheet: '3-7 KASIM', timeSlot: '7.DERS', date: '5 KASIM 2025', day: 'ÇARŞAMBA', exam: '10 TARİH', grade: '10', subject: 'TARİH' },
        { sheet: '3-7 KASIM', timeSlot: '7.DERS', date: '6 KASIM 2025', day: 'PERŞEMBE', exam: '10 S. TÜRK S.H.AİLE', grade: '10', subject: 'S. TÜRK S.H.AİLE' },
        { sheet: '3-7 KASIM', timeSlot: '7.DERS', date: '7 KASIM 2025', day: 'CUMA', exam: '10. YAB. DİL', grade: '10', subject: 'YAB. DİL' },
        { sheet: '3-7 KASIM', timeSlot: '8.DERS', date: '3 KASIM 2025', day: 'PAZARTESİ', exam: '11 TARİH', grade: '11', subject: 'TARİH' },
        { sheet: '3-7 KASIM', timeSlot: '8.DERS', date: '4 KASIM 2025', day: 'SALI', exam: '9 YAB. DİL', grade: '9', subject: 'YAB. DİL' },
        { sheet: '3-7 KASIM', timeSlot: '8.DERS', date: '5 KASIM 2025', day: 'ÇARŞAMBA', exam: '9 BİYOLOJİ', grade: '9', subject: 'BİYOLOJİ' },
        { sheet: '3-7 KASIM', timeSlot: '8.DERS', date: '6 KASIM 2025', day: 'PERŞEMBE', exam: '10 BİYOLOJİ', grade: '10', subject: 'BİYOLOJİ' },
        { sheet: '3-7 KASIM', timeSlot: '8.DERS', date: '7 KASIM 2025', day: 'CUMA', exam: '9 COĞRAFYA', grade: '9', subject: 'COĞRAFYA' }
    ];

    filteredExams = [...allExams];
}

// Initialize real-time clock
function initializeClock() {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
}

// Update clock display
function updateClock() {
    currentTime = new Date();
    const clockElement = document.getElementById('currentTime');
    if (clockElement) {
        clockElement.textContent = formatTime(currentTime);
    }

    // Update date display
    updateDateDisplay();

    // Update current time indicator in views
    updateCurrentTimeIndicators();
}

// Update date display
function updateDateDisplay() {
    const dateElement = document.getElementById('todayDate');
    if (dateElement) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        dateElement.textContent = currentTime.toLocaleDateString('tr-TR', options);
    }
}

// Format time
function formatTime(date) {
    return date.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Get exam status based on current time
function getExamStatus(exam) {
    if (!exam || !exam.date || !exam.timeSlot) return 'unknown';

    const now = new Date();
    const examDate = parseExamDate(exam.date);
    const timeSlot = timeSlotMapping[exam.timeSlot];

    if (!timeSlot) return 'unknown';

    const examStart = new Date(examDate);
    const examEnd = new Date(examDate);

    const [startHour, startMin] = timeSlot.start.split(':');
    const [endHour, endMin] = timeSlot.end.split(':');

    examStart.setHours(parseInt(startHour), parseInt(startMin), 0);
    examEnd.setHours(parseInt(endHour), parseInt(endMin), 0);

    // Check if exam is today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    examDate.setHours(0, 0, 0, 0);

    if (examDate.getTime() !== today.getTime()) {
        return examDate < today ? 'completed' : 'upcoming';
    }

    // Check exam status for today
    if (now < examStart) return 'upcoming';
    if (now >= examStart && now <= examEnd) return 'in_progress';
    if (now > examEnd) return 'completed';

    return 'upcoming';
}

// Parse exam date
function parseExamDate(dateStr) {
    // Parse Turkish date format "DD MONTH YYYY"
    const months = {
        'EKİM': '09', 'KASIM': '10', 'ARALIK': '11',
        'OCAK': '00', 'ŞUBAT': '01', 'MART': '02',
        'NİSAN': '03', 'MAYIS': '04', 'HAZİRAN': '05',
        'TEMMUZ': '06', 'AĞUSTOS': '07', 'EYLÜL': '08'
    };

    const parts = dateStr.split(' ');
    const day = parts[0];
    const month = months[parts[1].toUpperCase()];
    const year = '2025';

    return new Date(`${year}-${month}-${day}`);
}

// Get next exam
function getNextExam() {
    const now = new Date();
    const upcomingExams = filteredExams.filter(exam => {
        const status = getExamStatus(exam);
        return status === 'upcoming' || status === 'in_progress';
    });

    // Sort by date and time
    upcomingExams.sort((a, b) => {
        const dateA = parseExamDate(a.date);
        const dateB = parseExamDate(b.date);
        if (dateA !== dateB) return dateA - dateB;
        return timeSlotMapping[a.timeSlot].start.localeCompare(timeSlotMapping[b.timeSlot].start);
    });

    return upcomingExams[0] || null;
}

// Get current exam
function getCurrentExam() {
    return filteredExams.find(exam => getExamStatus(exam) === 'in_progress') || null;
}

// Update current time indicators in views
function updateCurrentTimeIndicators() {
    const currentExam = getCurrentExam();
    const nextExam = getNextExam();

    // Update countdown
    updateCountdown(nextExam);

    // Highlight current exam in schedule view
    highlightCurrentExam(currentExam);
}

// Update countdown for next exam
function updateCountdown(nextExam) {
    const countdownElement = document.getElementById('nextExamCountdown');
    if (!countdownElement) return;

    if (!nextExam) {
        countdownElement.innerHTML = '<span class="countdown-empty">Bugün sınav yok</span>';
        return;
    }

    const now = new Date();
    const examDate = parseExamDate(nextExam.date);
    const timeSlot = timeSlotMapping[nextExam.timeSlot];

    const examStart = new Date(examDate);
    const [startHour, startMin] = timeSlot.start.split(':');
    examStart.setHours(parseInt(startHour), parseInt(startMin), 0);

    const diff = examStart - now;

    if (diff <= 0) {
        countdownElement.innerHTML = `<span class="countdown-now">ŞİMDİ: ${nextExam.exam}</span>`;
    } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        let timeString = '';
        if (hours > 0) timeString += `${hours}s `;
        timeString += `${minutes}d ${seconds}s`;

        countdownElement.innerHTML = `
            <div class="countdown-content">
                <span class="countdown-time">${timeString}</span>
                <span class="countdown-exam">${nextExam.exam} (${nextExam.timeSlot})</span>
            </div>
        `;
    }
}

// Highlight current exam in schedule view
function highlightCurrentExam(currentExam) {
    // Remove all current highlights
    document.querySelectorAll('.current-exam, .upcoming-exam, .completed-exam').forEach(el => {
        el.classList.remove('current-exam', 'upcoming-exam', 'completed-exam');
    });

    // Add status indicators to exam cells
    filteredExams.forEach(exam => {
        const status = getExamStatus(exam);
        const examCells = document.querySelectorAll('.exam-cell');

        examCells.forEach(cell => {
            if (cell.textContent.includes(exam.exam)) {
                cell.classList.add(`exam-${status}`);
            }
        });
    });
}

// Check for notifications
function checkForNotifications() {
    const nextExam = getNextExam();
    if (!nextExam) return;

    const now = new Date();
    const examDate = parseExamDate(nextExam.date);
    const timeSlot = timeSlotMapping[nextExam.timeSlot];

    const examStart = new Date(examDate);
    const [startHour, startMin] = timeSlot.start.split(':');
    examStart.setHours(parseInt(startHour), parseInt(startMin), 0);

    const diff = examStart - now;

    // Show notification 30 minutes before exam
    if (diff > 0 && diff <= 30 * 60 * 1000) {
        showNotification('Sınav Yaklaşıyor!', `${nextExam.exam} sınavı 30 dakika içinde başlayacak!`, 'warning');
    }

    // Show notification when exam starts
    if (diff >= -60 * 1000 && diff <= 0) {
        showNotification('Sınav Başladı!', `${nextExam.exam} sınavı şimdi başladı!`, 'info');
    }
}

// Show notification
function showNotification(title, message, type = 'info') {
    // Check if browser supports notifications
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body: message,
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233498db"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
        });
    }

    // Show in-app notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <strong>${title}</strong>
            <p>${message}</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function(e) {
        searchExams(e.target.value);
    });

    // Filter functionality
    document.getElementById('gradeFilter').addEventListener('change', applyFilters);
    document.getElementById('weekFilter').addEventListener('change', applyFilters);
    document.getElementById('viewMode').addEventListener('change', function(e) {
        switchView(e.target.value);
    });

    // User role selector
    document.getElementById('userRole').addEventListener('change', function(e) {
        currentUserRole = e.target.value;
        updateUIForUserRole();
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Action buttons
    document.getElementById('refreshBtn').addEventListener('click', refreshData);
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('printBtn').addEventListener('click', printSchedule);

    // Schedule tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchScheduleTab(this.dataset.week);
        });
    });

    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('examModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Toggle theme
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');

    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Search exams
function searchExams(query) {
    query = query.toLowerCase().trim();

    if (!query) {
        filteredExams = [...allExams];
    } else {
        filteredExams = allExams.filter(exam =>
            exam.subject.toLowerCase().includes(query) ||
            exam.exam.toLowerCase().includes(query) ||
            exam.date.toLowerCase().includes(query) ||
            exam.day.toLowerCase().includes(query) ||
            exam.grade.includes(query) ||
            exam.timeSlot.toLowerCase().includes(query)
        );
    }

    applyFilters();
}

// Apply filters
function applyFilters() {
    let tempExams = [...filteredExams];

    // Grade filter
    const selectedGrades = Array.from(document.getElementById('gradeFilter').selectedOptions)
        .map(option => option.value);

    if (selectedGrades.length > 0) {
        tempExams = tempExams.filter(exam => selectedGrades.includes(exam.grade));
    }

    // Week filter
    const weekFilter = document.getElementById('weekFilter').value;
    if (weekFilter !== 'all') {
        tempExams = tempExams.filter(exam => exam.sheet === weekFilter);
    }

    // Update filtered exams
    filteredExams = tempExams;

    // Update current view
    updateCurrentView();
    updateStatistics();
}

// Switch view
function switchView(viewMode) {
    // Hide all views
    document.getElementById('scheduleView').classList.add('hidden');
    document.getElementById('listView').classList.add('hidden');
    document.getElementById('timelineView').classList.add('hidden');

    // Show selected view
    switch (viewMode) {
        case 'schedule':
            document.getElementById('scheduleView').classList.remove('hidden');
            renderScheduleView();
            break;
        case 'list':
            document.getElementById('listView').classList.remove('hidden');
            renderListView();
            break;
        case 'timeline':
            document.getElementById('timelineView').classList.remove('hidden');
            renderTimelineView();
            break;
    }
}

// Update current view
function updateCurrentView() {
    const viewMode = document.getElementById('viewMode').value;

    switch (viewMode) {
        case 'schedule':
            renderScheduleView();
            break;
        case 'list':
            renderListView();
            break;
        case 'timeline':
            renderTimelineView();
            break;
    }
}

// Render schedule view
function renderScheduleView() {
    const scheduleGrid = document.getElementById('scheduleGrid');

    // Get active week
    const activeTab = document.querySelector('.tab-btn.active');
    const activeWeek = activeTab ? activeTab.dataset.week : '27-31 EKİM';

    // Filter exams for active week
    const weekExams = filteredExams.filter(exam => exam.sheet === activeWeek);

    // Create schedule grid
    const scheduleGridHTML = createScheduleGrid(weekExams);
    scheduleGrid.innerHTML = scheduleGridHTML;
}

// Create schedule grid
function createScheduleGrid(exams) {
    // Include all time slots from 1.DERS to 10.DERS
    const timeSlots = Object.keys(timeSlotMapping);
    const days = ['PAZARTESİ', 'SALI', 'ÇARŞAMBA', 'PERŞEMBE', 'CUMA'];

    let html = '<table class="schedule-table"><thead><tr><th>Saat<br><small>Start-End</small></th>';

    // Add day headers
    days.forEach(day => {
        const dayExam = exams.find(exam => exam.day === day);
        const date = dayExam ? dayExam.date : '';
        html += `<th>${day}<br><small>${date}</small></th>`;
    });

    html += '</tr></thead><tbody>';

    // Add time slot rows
    timeSlots.forEach(timeSlot => {
        const timeInfo = timeSlotMapping[timeSlot];
        html += `<tr><td><div class="time-slot-info"><strong>${timeSlot}</strong><br><small>${timeInfo.start} - ${timeInfo.end}</small></div></td>`;

        days.forEach(day => {
            const exam = exams.find(e => e.day === day && e.timeSlot === timeSlot);
            if (exam) {
                const status = getExamStatus(exam);
                html += `
                    <td>
                        <div class="exam-cell exam-${status}" onclick="showExamDetails('${exam.exam}', '${exam.date}', '${exam.timeSlot}', '${exam.grade}')">
                            ${exam.exam}
                        </div>
                    </td>
                `;
            } else {
                html += '<td><div class="exam-cell empty">-</div></td>';
            }
        });

        html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
}

// Render list view
function renderListView() {
    const tbody = document.getElementById('examTableBody');

    // Sort exams by date and time
    const sortedExams = [...filteredExams].sort((a, b) => {
        const dateA = new Date(a.date.split(' ')[0] + ' 2025');
        const dateB = new Date(b.date.split(' ')[0] + ' 2025');
        if (dateA !== dateB) return dateA - dateB;
        return a.timeSlot.localeCompare(b.timeSlot);
    });

    let html = '';
    sortedExams.forEach(exam => {
        const status = getExamStatus(exam);
        const timeInfo = timeSlotMapping[exam.timeSlot];

        html += `
            <tr class="exam-row exam-${status}">
                <td>${exam.date}</td>
                <td>${exam.day}</td>
                <td>${exam.timeSlot}<br><small>${timeInfo.start} - ${timeInfo.end}</small></td>
                <td><span class="grade-badge">${exam.grade}. Sınıf</span></td>
                <td>
                    <span class="exam-subject">${exam.exam}</span>
                    <span class="exam-status status-${status}">${getStatusText(status)}</span>
                </td>
                <td>
                    <button class="btn btn-primary" onclick="showExamDetails('${exam.exam}', '${exam.date}', '${exam.timeSlot}', '${exam.grade}')" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
                        <i class="fas fa-info-circle"></i> Detay
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// Get status text in Turkish
function getStatusText(status) {
    const statusMap = {
        'upcoming': 'Yaklaşacak',
        'in_progress': 'Devam Ediyor',
        'completed': 'Tamamlandı',
        'unknown': 'Bilinmiyor'
    };
    return statusMap[status] || 'Bilinmiyor';
}

// Get proctor information for an exam
function getProctorInfo(exam) {
    // Proctor information removed - will be updated later
    return null;
}

// Render timeline view
function renderTimelineView() {
    const timelineContainer = document.getElementById('timelineContainer');

    // Sort exams by date
    const sortedExams = [...filteredExams].sort((a, b) => {
        const dateA = new Date(a.date.split(' ')[0] + ' 2025');
        const dateB = new Date(b.date.split(' ')[0] + ' 2025');
        return dateA - dateB;
    });

    // Group exams by date
    const groupedExams = {};
    sortedExams.forEach(exam => {
        if (!groupedExams[exam.date]) {
            groupedExams[exam.date] = [];
        }
        groupedExams[exam.date].push(exam);
    });

    let html = '';
    Object.keys(groupedExams).forEach((date, index) => {
        const exams = groupedExams[date];
        const isToday = new Date().toDateString() === parseExamDate(date).toDateString();

        html += `
            <div class="timeline-item ${isToday ? 'timeline-today' : ''}">
                <div class="timeline-date">
                    ${date}
                    ${isToday ? '<span class="today-badge">BUGÜN</span>' : ''}
                </div>
                <div class="timeline-content">
                    <h3>${date}</h3>
                    <div class="exam-list">
        `;

        // Sort exams by time
        exams.sort((a, b) => {
            return timeSlotMapping[a.timeSlot].start.localeCompare(timeSlotMapping[b.timeSlot].start);
        });

        exams.forEach(exam => {
            const status = getExamStatus(exam);
            const timeInfo = timeSlotMapping[exam.timeSlot];

            html += `
                <div class="exam-item exam-${status}" onclick="showExamDetails('${exam.exam}', '${exam.date}', '${exam.timeSlot}', '${exam.grade}')">
                    <div class="exam-time">
                        <strong>${exam.timeSlot}</strong>
                        <small>${timeInfo.start} - ${timeInfo.end}</small>
                    </div>
                    <div class="exam-details">
                        <div class="exam-subject">${exam.exam}</div>
                        <div class="exam-meta">
                            <span class="grade-badge">${exam.grade}. Sınıf</span>
                            <span class="exam-status status-${status}">${getStatusText(status)}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
            </div>
        `;
    });

    timelineContainer.innerHTML = html;
}

// Switch schedule tab
function switchScheduleTab(week) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.week === week) {
            btn.classList.add('active');
        }
    });

    // Re-render schedule view
    renderScheduleView();
}

// Show exam details modal
function showExamDetails(exam, date, timeSlot, grade) {
    const modal = document.getElementById('examModal');
    const details = document.getElementById('examDetails');

    const timeInfo = timeSlotMapping[timeSlot];
    const status = getExamStatus({ exam, date, timeSlot, grade });
    const examDate = parseExamDate(date);

    details.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">${exam}</h3>
            <div class="exam-status-badge status-${status}" style="margin-bottom: 1rem; padding: 0.5rem 1rem; border-radius: 20px; color: white; font-weight: 600; display: inline-block;">
                ${getStatusText(status)}
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                <div><strong>Tarih:</strong> ${date}</div>
                <div><strong>Sınıf:</strong> ${grade}. Sınıf</div>
                <div><strong>Ders:</strong> ${exam}</div>
                <div><strong>Ders Kodu:</strong> ${timeSlot}</div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(52, 152, 219, 0.1); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>Başlangıç:</strong> ${timeInfo.start}
                    </div>
                    <div>
                        <strong>Bitiş:</strong> ${timeInfo.end}
                    </div>
                </div>
                <div style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.9rem;">
                    Süre: ${calculateExamDuration(timeInfo.start, timeInfo.end)} dakika
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Calculate exam duration in minutes
function calculateExamDuration(startTime, endTime) {
    const [startHour, startMin] = startTime.split(':');
    const [endHour, endMin] = endTime.split(':');

    const startTotal = parseInt(startHour) * 60 + parseInt(startMin);
    const endTotal = parseInt(endHour) * 60 + parseInt(endMin);

    return endTotal - startTotal;
}

// Close modal
function closeModal() {
    document.getElementById('examModal').style.display = 'none';
}

// Update statistics
function updateStatistics() {
    document.getElementById('totalExams').textContent = filteredExams.length;

    // Count exams by grade
    const gradeCounts = {};
    filteredExams.forEach(exam => {
        gradeCounts[exam.grade] = (gradeCounts[exam.grade] || 0) + 1;
    });
    document.getElementById('totalStudents').textContent = Object.keys(gradeCounts).length;

    // Count upcoming exams (next 7 days)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingExams = filteredExams.filter(exam => {
        const examDate = parseExamDate(exam.date);
        return examDate >= today && examDate <= nextWeek;
    });
    document.getElementById('upcomingExams').textContent = upcomingExams.length;

    // Count today's exams
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const tomorrow = new Date(todayDate);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysExams = filteredExams.filter(exam => {
        const examDate = parseExamDate(exam.date);
        examDate.setHours(0, 0, 0, 0);
        return examDate.getTime() === todayDate.getTime();
    });
    document.getElementById('todayExams').textContent = todaysExams.length;

    // Update countdown immediately
    updateCurrentTimeIndicators();
}

// Update UI for user role
function updateUIForUserRole() {
    // Show/hide features based on user role
    const exportBtn = document.getElementById('exportBtn');
    const printBtn = document.getElementById('printBtn');

    switch (currentUserRole) {
        case 'student':
            // Students can view and search
            exportBtn.style.display = 'inline-flex';
            printBtn.style.display = 'inline-flex';
            break;
        case 'parent':
            // Parents have same access as students
            exportBtn.style.display = 'inline-flex';
            printBtn.style.display = 'inline-flex';
            break;
        case 'admin':
            // Admins have full access
            exportBtn.style.display = 'inline-flex';
            printBtn.style.display = 'inline-flex';
            break;
    }

    // Update current view
    updateCurrentView();
}

// Refresh data
function refreshData() {
    loadExamData();
    applyFilters();

    // Show loading indicator
    const refreshBtn = document.getElementById('refreshBtn');
    const originalContent = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yenileniyor...';
    refreshBtn.disabled = true;

    setTimeout(() => {
        refreshBtn.innerHTML = originalContent;
        refreshBtn.disabled = false;
    }, 1000);
}

// Export data
function exportData() {
    // Create CSV content
    let csvContent = 'Tarih,Gün,Saat,Sınıf,Ders\n';

    const sortedExams = [...filteredExams].sort((a, b) => {
        const dateA = new Date(a.date.split(' ')[0] + ' 2025');
        const dateB = new Date(b.date.split(' ')[0] + ' 2025');
        if (dateA !== dateB) return dateA - dateB;
        return a.timeSlot.localeCompare(b.timeSlot);
    });

    sortedExams.forEach(exam => {
        csvContent += `"${exam.date}","${exam.day}","${exam.timeSlot}","${exam.grade}. Sınıf","${exam.exam}"\n`;
    });

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sinav_takvimi_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Print schedule
function printSchedule() {
    window.print();
}