// Global variables
let allExams = [];
let filteredExams = [];
let currentViewMode = 'calendar';
let currentSearchQuery = '';

// Time slot mapping with exact times
const timeSlotMapping = {
    '1.DERS':  { start: '09:00', end: '09:40', displayName: '1. Ders' },
    '2.DERS':  { start: '09:50', end: '10:30', displayName: '2. Ders' },
    '3.DERS':  { start: '10:40', end: '11:20', displayName: '3. Ders' },
    '4.DERS':  { start: '11:30', end: '12:10', displayName: '4. Ders' },
    '5.DERS':  { start: '12:20', end: '13:00', displayName: '5. Ders' },
    '6.DERS':  { start: '13:30', end: '14:10', displayName: '6. Ders' },
    '7.DERS':  { start: '14:20', end: '15:00', displayName: '7. Ders' },
    '8.DERS':  { start: '15:10', end: '15:50', displayName: '8. Ders' },
    '9.DERS':  { start: '16:00', end: '16:40', displayName: '9. Ders' },
    '10.DERS': { start: '16:45', end: '17:25', displayName: '10. Ders' }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadExamData();
    initializeTheme();
    initializeEventListeners();
    updateHeaderDate();
    updateNextExamBanner();
    checkForNotifications();
    setInterval(updateNextExamBanner, 30000);
});

// Load exam data — 2. Dönem 1. Yazılı Sınavları
function loadExamData() {
    // 2. Dönem 1. Yazılı sınav verileri
    allExams = [
        // Week 1: 30 MART – 3 NİSAN 2026
        {
            sheet: '30 MART-3 NİSAN',
            timeSlot: '3.DERS',
            date: '30 MART 2026',
            day: 'PAZARTESİ',
            exam: '11 ORT. TÜRK TAR.',
            grade: '11',
            subject: 'ORT. TÜRK TAR.'
        },
        {
            sheet: '30 MART-3 NİSAN',
            timeSlot: '4.DERS',
            date: '30 MART 2026',
            day: 'PAZARTESİ',
            exam: '10 KİMYA',
            grade: '10',
            subject: 'KİMYA'
        },
        {
            sheet: '30 MART-3 NİSAN',
            timeSlot: '5.DERS',
            date: '30 MART 2026',
            day: 'PAZARTESİ',
            exam: '9 BİYOLOJİ',
            grade: '9',
            subject: 'BİYOLOJİ'
        },
        {
            sheet: '30 MART-3 NİSAN',
            timeSlot: '6.DERS',
            date: '30 MART 2026',
            day: 'PAZARTESİ',
            exam: '9 S. ADABI MUA.',
            grade: '9',
            subject: 'S. ADABI MUA.'
        },
        {
            sheet: '30 MART-3 NİSAN',
            timeSlot: '7.DERS',
            date: '30 MART 2026',
            day: 'PAZARTESİ',
            exam: '11 TARİH',
            grade: '11',
            subject: 'TARİH'
        },
        {
            sheet: '30 MART-3 NİSAN',
            timeSlot: '8.DERS',
            date: '30 MART 2026',
            day: 'PAZARTESİ',
            exam: '10 BİYOLOJİ',
            grade: '10',
            subject: 'BİYOLOJİ'
        },
        {
            sheet: '30 MART-3 NİSAN',
            timeSlot: '3.DERS',
            date: '3 NİSAN 2026',
            day: 'CUMA',
            exam: '9 S. PEYG. HAYATI',
            grade: '9',
            subject: 'S. PEYG. HAYATI'
        },
        {
            sheet: '30 MART-3 NİSAN',
            timeSlot: '4.DERS',
            date: '3 NİSAN 2026',
            day: 'CUMA',
            exam: '10 S. TEM. DİNİ BİL.',
            grade: '10',
            subject: 'S. TEM. DİNİ BİL.'
        },
        {
            sheet: '30 MART-3 NİSAN',
            timeSlot: '6.DERS',
            date: '3 NİSAN 2026',
            day: 'CUMA',
            exam: '11 S. PEY. HAYATI',
            grade: '11',
            subject: 'S. PEY. HAYATI'
        },
        {
            sheet: '30 MART-3 NİSAN',
            timeSlot: '7.DERS',
            date: '3 NİSAN 2026',
            day: 'CUMA',
            exam: '9 KİMYA',
            grade: '9',
            subject: 'KİMYA'
        },
        // Week 2: 6 – 10 NİSAN 2026
        {
            sheet: '6-10 NİSAN',
            timeSlot: '3.DERS',
            date: '6 NİSAN 2026',
            day: 'PAZARTESİ',
            exam: '10 DİN KÜLTÜRÜ',
            grade: '10',
            subject: 'DİN KÜLTÜRÜ'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '5.DERS',
            date: '6 NİSAN 2026',
            day: 'PAZARTESİ',
            exam: '9 TARİH',
            grade: '9',
            subject: 'TARİH'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '6.DERS',
            date: '6 NİSAN 2026',
            day: 'PAZARTESİ',
            exam: '10 COĞRAFYA',
            grade: '10',
            subject: 'COĞRAFYA'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '7.DERS',
            date: '6 NİSAN 2026',
            day: 'PAZARTESİ',
            exam: '11 FELSEFE',
            grade: '11',
            subject: 'FELSEFE'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '8.DERS',
            date: '6 NİSAN 2026',
            day: 'PAZARTESİ',
            exam: '9 COĞRAFYA',
            grade: '9',
            subject: 'COĞRAFYA'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '3.DERS',
            date: '7 NİSAN 2026',
            day: 'SALI',
            exam: '10 FELSEFE',
            grade: '10',
            subject: 'FELSEFE'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '4.DERS',
            date: '7 NİSAN 2026',
            day: 'SALI',
            exam: '9 DİN KÜLTÜRÜ',
            grade: '9',
            subject: 'DİN KÜLTÜRÜ'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '5.DERS',
            date: '7 NİSAN 2026',
            day: 'SALI',
            exam: '11 SAĞLIK BİL.',
            grade: '11',
            subject: 'SAĞLIK BİL.'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '6.DERS',
            date: '7 NİSAN 2026',
            day: 'SALI',
            exam: '9 YAB. DİL',
            grade: '9',
            subject: 'YAB. DİL'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '8.DERS',
            date: '7 NİSAN 2026',
            day: 'SALI',
            exam: '10. YAB. DİL',
            grade: '10',
            subject: 'YAB. DİL'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '3.DERS',
            date: '8 NİSAN 2026',
            day: 'ÇARŞAMBA',
            exam: '9 MATEMATİK',
            grade: '9',
            subject: 'MATEMATİK'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '5.DERS',
            date: '8 NİSAN 2026',
            day: 'ÇARŞAMBA',
            exam: '11 S. MATEMATİK',
            grade: '11',
            subject: 'S. MATEMATİK'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '6.DERS',
            date: '8 NİSAN 2026',
            day: 'ÇARŞAMBA',
            exam: '9 S. DÜŞÜNME EĞ.',
            grade: '9',
            subject: 'S. DÜŞÜNME EĞ.'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '7.DERS',
            date: '8 NİSAN 2026',
            day: 'ÇARŞAMBA',
            exam: '10 S. TÜRK S.H.AİLE',
            grade: '10',
            subject: 'S. TÜRK S.H.AİLE'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '3.DERS',
            date: '9 NİSAN 2026',
            day: 'PERŞEMBE',
            exam: '10 MATEMATİK',
            grade: '10',
            subject: 'MATEMATİK'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '5.DERS',
            date: '9 NİSAN 2026',
            day: 'PERŞEMBE',
            exam: '11 DİN KÜLTÜRÜ',
            grade: '11',
            subject: 'DİN KÜLTÜRÜ'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '6.DERS',
            date: '9 NİSAN 2026',
            day: 'PERŞEMBE',
            exam: '10 FİZİK',
            grade: '10',
            subject: 'FİZİK'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '7.DERS',
            date: '9 NİSAN 2026',
            day: 'PERŞEMBE',
            exam: '9 FİZİK',
            grade: '9',
            subject: 'FİZİK'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '8.DERS',
            date: '9 NİSAN 2026',
            day: 'PERŞEMBE',
            exam: '11 EDEBİYAT',
            grade: '11',
            subject: 'EDEBİYAT'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '9.DERS',
            date: '9 NİSAN 2026',
            day: 'PERŞEMBE',
            exam: '11 FİZİK',
            grade: '11',
            subject: 'FİZİK'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '3.DERS',
            date: '10 NİSAN 2026',
            day: 'CUMA',
            exam: '10 TÜRK DİLİ VE EDEBİYATI',
            grade: '10',
            subject: 'TÜRK DİLİ VE EDEBİYATI'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '6.DERS',
            date: '10 NİSAN 2026',
            day: 'CUMA',
            exam: '10 TARİH',
            grade: '10',
            subject: 'TARİH'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '7.DERS',
            date: '10 NİSAN 2026',
            day: 'CUMA',
            exam: '9 EDEBİYAT',
            grade: '9',
            subject: 'EDEBİYAT'
        },
        {
            sheet: '6-10 NİSAN',
            timeSlot: '8.DERS',
            date: '10 NİSAN 2026',
            day: 'CUMA',
            exam: '11 YAB. DİL',
            grade: '11',
            subject: 'YAB. DİL'
        }
    ];

    filteredExams = [...allExams];
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDay = new Date(examDate);
    examDay.setHours(0, 0, 0, 0);

    if (examDay.getTime() !== today.getTime()) {
        return examDay < today ? 'completed' : 'upcoming';
    }

    if (now < examStart) return 'upcoming';
    if (now >= examStart && now <= examEnd) return 'in_progress';
    if (now > examEnd) return 'completed';

    return 'upcoming';
}

// Parse exam date — "DD MONTH YYYY" format
function parseExamDate(dateStr) {
    const months = {
        'EKİM': '10', 'KASIM': '11', 'ARALIK': '12',
        'OCAK': '01', 'ŞUBAT': '02', 'MART': '03',
        'NİSAN': '04', 'MAYIS': '05', 'HAZİRAN': '06',
        'TEMMUZ': '07', 'AĞUSTOS': '08', 'EYLÜL': '09'
    };

    const parts = dateStr.split(' ');
    const day = parts[0];
    const month = months[parts[1].toUpperCase()];
    const year = parts[2] || '2026';

    return new Date(`${year}-${month}-${day}`);
}

// Get next upcoming exam from filteredExams
function getNextExam() {
    const upcoming = filteredExams.filter(exam => {
        const status = getExamStatus(exam);
        return status === 'upcoming' || status === 'in_progress';
    });

    if (upcoming.length === 0) return null;

    upcoming.sort((a, b) => {
        const da = parseExamDate(a.date), db = parseExamDate(b.date);
        if (da.getTime() !== db.getTime()) return da - db;
        return a.timeSlot.localeCompare(b.timeSlot);
    });

    return upcoming[0];
}

// Format short date: "30 MART 2026" → "30 Mart"
function formatShortDate(dateStr) {
    const parts = dateStr.split(' ');
    if (parts.length >= 2) {
        const month = parts[1].charAt(0) + parts[1].slice(1).toLowerCase();
        return `${parts[0]} ${month}`;
    }
    return dateStr;
}

// Update the compact next-exam banner
function updateNextExamBanner() {
    const banner = document.getElementById('nextExamBanner');
    if (!banner) return;

    const now = new Date();

    // Check for ongoing exam
    const ongoingExam = filteredExams.find(exam => getExamStatus(exam) === 'in_progress');

    // Get sorted upcoming exams
    const upcomingExams = filteredExams
        .filter(exam => getExamStatus(exam) === 'upcoming')
        .sort((a, b) => {
            const da = parseExamDate(a.date), db = parseExamDate(b.date);
            if (da.getTime() !== db.getTime()) return da - db;
            return timeSlotMapping[a.timeSlot].start.localeCompare(timeSlotMapping[b.timeSlot].start);
        });

    const nextExam = upcomingExams[0];

    if (ongoingExam) {
        const ts = timeSlotMapping[ongoingExam.timeSlot];
        const endDate = parseExamDate(ongoingExam.date);
        const [eh, em] = ts.end.split(':');
        endDate.setHours(+eh, +em, 0);
        const minsLeft = Math.max(0, Math.floor((endDate - now) / 60000));

        banner.className = 'next-exam-banner ongoing';
        banner.innerHTML = `<div class="banner-inner">
            <span class="banner-label">Devam Eden Sınav</span>
            <span class="banner-subject">${ongoingExam.exam}</span>
            <span class="banner-sep">·</span>
            <span class="banner-time">${ts.start}–${ts.end}</span>
            <span class="banner-sep">·</span>
            <span class="banner-grade-pill grade-${ongoingExam.grade}">${ongoingExam.grade}</span>
            <span class="banner-countdown ongoing">${minsLeft} dk kaldı</span>
        </div>`;
        return;
    }

    if (nextExam) {
        const ts = timeSlotMapping[nextExam.timeSlot];
        const startDate = parseExamDate(nextExam.date);
        const [sh, sm] = ts.start.split(':');
        startDate.setHours(+sh, +sm, 0);

        const diff = startDate - now;
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);

        let countdown;
        if (days > 0) countdown = `${days}g ${hours}sa`;
        else if (hours > 0) countdown = `${hours}sa ${mins}dk`;
        else countdown = `${mins}dk`;

        banner.className = 'next-exam-banner';
        banner.innerHTML = `<div class="banner-inner">
            <span class="banner-label">Sonraki Sınav</span>
            <span class="banner-subject">${nextExam.exam}</span>
            <span class="banner-sep">·</span>
            <span class="banner-time">${formatShortDate(nextExam.date)} · ${ts.start}–${ts.end}</span>
            <span class="banner-sep">·</span>
            <span class="banner-grade-pill grade-${nextExam.grade}">${nextExam.grade}</span>
            <span class="banner-countdown">${countdown}</span>
        </div>`;
    } else {
        banner.className = 'next-exam-banner done';
        banner.innerHTML = `<div class="banner-inner">
            <span class="banner-done"><i class="fas fa-check-circle"></i> Tüm sınavlar tamamlandı</span>
        </div>`;
    }
}

// Update header date (one-time, no clock)
function updateHeaderDate() {
    const el = document.getElementById('headerDate');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleDateString('tr-TR', {
        weekday: 'short', day: 'numeric', month: 'long'
    });
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Check for notifications
function checkForNotifications() {
    const nextExam = getNextExam();
    if (!nextExam) return;

    const examDate = parseExamDate(nextExam.date);
    const timeSlot = timeSlotMapping[nextExam.timeSlot];
    const [hour, min] = timeSlot.start.split(':');
    examDate.setHours(parseInt(hour), parseInt(min), 0);

    const now = new Date();
    const timeUntilExam = examDate - now;

    if (timeUntilExam > 0 && timeUntilExam < 3600000) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Sınav Yaklaşıyor!', {
                body: `${nextExam.exam} sınavınız ${Math.floor(timeUntilExam / 60000)} dakika sonra başlayacak.`,
                icon: '/favicon.ico'
            });
        }
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Search
    document.getElementById('searchInput').addEventListener('input', function(e) {
        searchExams(e.target.value);
        const clearBtn = document.getElementById('searchClear');
        if (clearBtn) clearBtn.classList.toggle('hidden', !e.target.value);
    });

    document.getElementById('searchClear').addEventListener('click', function() {
        document.getElementById('searchInput').value = '';
        this.classList.add('hidden');
        searchExams('');
    });

    // Grade filter chips
    document.querySelectorAll('.grade-chip').forEach(btn => {
        btn.addEventListener('click', () => setGradeFilter(btn.dataset.grade));
    });

    // View pills
    document.querySelectorAll('.view-pill').forEach(btn => {
        btn.addEventListener('click', () => setViewMode(btn.dataset.view));
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Action buttons
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('printBtn').addEventListener('click', printSchedule);

    // Week tabs
    document.querySelectorAll('.week-tab').forEach(btn => {
        btn.addEventListener('click', function() {
            switchWeek(this.dataset.week);
        });
    });

    // Modal close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('examModal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // Initialize filters
    setGradeFilter('all');
    setViewMode('calendar');
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    document.getElementById('themeToggle').innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Search exams
function searchExams(query) {
    currentSearchQuery = query.toLowerCase().trim();
    applyFilters();
}

// Apply all active filters
function applyFilters() {
    let tempExams = [...allExams];

    if (currentSearchQuery) {
        tempExams = tempExams.filter(exam =>
            exam.subject.toLowerCase().includes(currentSearchQuery) ||
            exam.exam.toLowerCase().includes(currentSearchQuery) ||
            exam.date.toLowerCase().includes(currentSearchQuery) ||
            exam.day.toLowerCase().includes(currentSearchQuery) ||
            exam.grade.includes(currentSearchQuery) ||
            exam.timeSlot.toLowerCase().includes(currentSearchQuery)
        );
    }

    // Grade filter
    const allBtn = document.querySelector('.grade-chip[data-grade="all"]');
    const gradeButtons = Array.from(document.querySelectorAll('.grade-chip'))
        .filter(b => b.dataset.grade !== 'all');
    const selectedGrades = allBtn && allBtn.classList.contains('active')
        ? gradeButtons.map(b => b.dataset.grade)
        : gradeButtons.filter(b => b.classList.contains('active')).map(b => b.dataset.grade);

    if (selectedGrades.length > 0) {
        tempExams = tempExams.filter(exam => selectedGrades.includes(exam.grade));
    }

    filteredExams = tempExams;
    updateCurrentView();
    updateNextExamBanner();
}

// Set grade filter
function setGradeFilter(grade) {
    document.querySelectorAll('.grade-chip').forEach(btn => btn.classList.remove('active'));
    const target = document.querySelector(`.grade-chip[data-grade="${grade}"]`);
    if (target) target.classList.add('active');
    applyFilters();
}

// Set view mode
function setViewMode(viewMode) {
    currentViewMode = viewMode;

    document.querySelectorAll('.view-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewMode);
    });

    const calView = document.getElementById('calendarView');
    const listView = document.getElementById('listView');
    const weekNav = document.getElementById('weekNav');

    if (viewMode === 'calendar') {
        calView.classList.remove('hidden');
        listView.classList.add('hidden');
        if (weekNav) weekNav.classList.remove('hidden');
        renderCalendarView();
    } else {
        calView.classList.add('hidden');
        listView.classList.remove('hidden');
        if (weekNav) weekNav.classList.add('hidden');
        renderListView();
    }
}

// Update the currently active view
function updateCurrentView() {
    if (currentViewMode === 'calendar') {
        renderCalendarView();
    } else {
        renderListView();
    }
}

// Switch active week tab
function switchWeek(week) {
    document.querySelectorAll('.week-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.week === week);
    });
    renderCalendarView();
}

// Render the primary calendar grid view
function renderCalendarView() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;

    const activeTab = document.querySelector('.week-tab.active');
    const activeWeek = activeTab ? activeTab.dataset.week : '30 MART-3 NİSAN';
    const weekExams = filteredExams.filter(exam => exam.sheet === activeWeek);

    const dayOrder = ['PAZARTESİ', 'SALI', 'ÇARŞAMBA', 'PERŞEMBE', 'CUMA'];
    const slotOrder = ['1.DERS','2.DERS','3.DERS','4.DERS','5.DERS','6.DERS','7.DERS','8.DERS','9.DERS','10.DERS'];

    const activeDays = dayOrder.filter(day => weekExams.some(e => e.day === day));
    const activeSlots = slotOrder.filter(slot => weekExams.some(e => e.timeSlot === slot));

    if (activeDays.length === 0 || activeSlots.length === 0) {
        grid.style.gridTemplateColumns = '1fr';
        grid.innerHTML = '<div class="cal-no-exams">Bu hafta için sınav bulunamadı.</div>';
        return;
    }

    // Set grid columns: time gutter + one per active day
    grid.style.gridTemplateColumns = `80px repeat(${activeDays.length}, 1fr)`;

    // Collect date for each active day
    const dayDates = {};
    activeDays.forEach(day => {
        const exam = weekExams.find(e => e.day === day);
        if (exam) dayDates[day] = exam.date;
    });

    let html = '';

    // Header row
    html += '<div class="cal-cell cal-corner"></div>';
    activeDays.forEach(day => {
        const shortDate = dayDates[day] ? formatShortDate(dayDates[day]) : '';
        html += `<div class="cal-cell cal-day-header">
            <span class="cal-day-name">${day}</span>
            <span class="cal-day-date">${shortDate}</span>
        </div>`;
    });

    // Time slot rows
    activeSlots.forEach(slot => {
        const timeInfo = timeSlotMapping[slot];
        html += `<div class="cal-cell cal-time-gutter">
            <span class="cal-slot-name">${slot}</span>
            <span class="cal-slot-time">${timeInfo.start}</span>
        </div>`;

        activeDays.forEach(day => {
            const exam = weekExams.find(e => e.day === day && e.timeSlot === slot);
            if (exam) {
                const status = getExamStatus(exam);
                const safeExam = exam.exam.replace(/'/g, '&#39;');
                const safeDate = exam.date.replace(/'/g, '&#39;');
                html += `<div class="cal-cell cal-exam-cell">
                    <div class="exam-card grade-${exam.grade} exam-${status}"
                         onclick="showExamDetails('${safeExam}', '${safeDate}', '${exam.timeSlot}', '${exam.grade}')">
                        <span class="ec-subject">${exam.subject}</span>
                        <span class="ec-grade">${exam.grade}</span>
                    </div>
                </div>`;
            } else {
                html += '<div class="cal-cell cal-empty-cell"></div>';
            }
        });
    });

    grid.innerHTML = html;
}

// Render the list view
function renderListView() {
    const tbody = document.getElementById('examTableBody');
    if (!tbody) return;

    const sortedExams = [...filteredExams].sort((a, b) => {
        const da = parseExamDate(a.date), db = parseExamDate(b.date);
        return da - db || a.timeSlot.localeCompare(b.timeSlot);
    });

    if (sortedExams.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--text-3);font-family:var(--font-mono);font-size:0.85rem;">Sınav bulunamadı.</td></tr>';
        return;
    }

    let html = '';
    sortedExams.forEach(exam => {
        const status = getExamStatus(exam);
        const timeInfo = timeSlotMapping[exam.timeSlot];
        const safeExam = exam.exam.replace(/'/g, '&#39;');
        const safeDate = exam.date.replace(/'/g, '&#39;');

        html += `
            <tr class="exam-${status}">
                <td>${exam.date}</td>
                <td>${exam.day}</td>
                <td>${exam.timeSlot}<br><small style="color:var(--text-3);font-size:0.72rem;">${timeInfo.start}–${timeInfo.end}</small></td>
                <td><span class="lt-grade grade-${exam.grade}">${exam.grade}</span></td>
                <td>
                    <span style="font-weight:600;">${exam.exam}</span>
                    <br>
                    <span class="lt-status ${status}">${getStatusText(status)}</span>
                </td>
                <td>
                    <button class="list-detail-btn"
                            onclick="showExamDetails('${safeExam}', '${safeDate}', '${exam.timeSlot}', '${exam.grade}')"
                            aria-label="Detay">
                        <i class="fas fa-info-circle"></i>
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
        'upcoming':    'Yaklaşıyor',
        'in_progress': 'Devam Ediyor',
        'completed':   'Tamamlandı',
        'unknown':     'Bilinmiyor'
    };
    return statusMap[status] || 'Bilinmiyor';
}

// Show exam details in modal
function showExamDetails(examName, date, timeSlot, grade) {
    const modal = document.getElementById('examModal');
    const details = document.getElementById('examDetails');

    const timeInfo = timeSlotMapping[timeSlot];
    const status = getExamStatus({ exam: examName, date, timeSlot, grade });

    const examObj = allExams.find(e =>
        e.exam === examName &&
        e.date === date &&
        e.timeSlot === timeSlot &&
        e.grade === grade
    );

    const day = examObj ? examObj.day : '';

    // Proctor section
    let proctorsHTML = '';
    if (examObj && examObj.proctors && examObj.proctors.length > 0) {
        proctorsHTML = `<div class="ed-proctors">
            <div class="ed-proctors-title">Gözetmen Öğretmenler</div>
            ${examObj.proctors.map(p => `
                <div class="ed-proctor-row">
                    <span>${p.section} Şubesi: ${p.name}</span>
                    ${p.location ? `<span class="ed-proctor-loc">${p.location}</span>` : ''}
                </div>
            `).join('')}
        </div>`;
    }

    let adminHTML = '';
    if (examObj && examObj.administrator) {
        adminHTML = `<div class="ed-admin">Müdür Yardımcısı: ${examObj.administrator}</div>`;
    }

    details.innerHTML = `
        <div class="ed-header">
            <span class="ed-grade-pill grade-${grade}">${grade}. Sınıf</span>
            <h3 class="ed-title">${examName}</h3>
            <span class="ed-status ${status}">${getStatusText(status)}</span>
        </div>
        <div class="ed-info">
            <div class="ed-row">
                <span>Tarih</span>
                <span>${date}</span>
            </div>
            <div class="ed-row">
                <span>Gün</span>
                <span>${day}</span>
            </div>
            <div class="ed-row">
                <span>Başlangıç</span>
                <span>${timeInfo.start}</span>
            </div>
            <div class="ed-row">
                <span>Bitiş</span>
                <span>${timeInfo.end}</span>
            </div>
            <div class="ed-row">
                <span>Ders Saati</span>
                <span>${timeSlot}</span>
            </div>
            <div class="ed-row">
                <span>Süre</span>
                <span>${calculateExamDuration(timeInfo.start, timeInfo.end)} dk</span>
            </div>
        </div>
        ${proctorsHTML}
        ${adminHTML}
    `;

    modal.style.display = 'block';
}

// Calculate exam duration in minutes
function calculateExamDuration(startTime, endTime) {
    const [sh, sm] = startTime.split(':');
    const [eh, em] = endTime.split(':');
    return (parseInt(eh) * 60 + parseInt(em)) - (parseInt(sh) * 60 + parseInt(sm));
}

// Close modal
function closeModal() {
    document.getElementById('examModal').style.display = 'none';
}

// Export data as CSV
function exportData() {
    let csv = 'Tarih,Gün,Saat,Sınıf,Ders\n';

    const sorted = [...filteredExams].sort((a, b) => {
        return parseExamDate(a.date) - parseExamDate(b.date) || a.timeSlot.localeCompare(b.timeSlot);
    });

    sorted.forEach(exam => {
        csv += `"${exam.date}","${exam.day}","${exam.timeSlot}","${exam.grade}. Sınıf","${exam.exam}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
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
