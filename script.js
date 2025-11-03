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
    // Exam data extracted from program.xlsx with proctor information
    allExams = [
        {
            sheet: '3 KASIM',
            timeSlot: '2.DERS',
            date: '3 KASIM 2025',
            day: 'PAZARTESİ',
            exam: '9 MESLEKİ GELİŞİM ATÖLYESİ',
            grade: '9',
            subject: 'MESLEKİ GELİŞİM ATÖLYESİ',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'BAHAR SARIKAYA',
                    location: 'DİKAB - 2'
                },
                {
                    section: 'A',
                    name: 'NURCAN DURMAZ'
                },
                {
                    section: 'B',
                    name: 'BÜŞRA TARIM',
                    location: 'MAT-1'
                },
                {
                    section: 'C',
                    name: 'KENAN ANGÜN'
                },
                {
                    section: 'D',
                    name: 'TURAN TURNA'
                },
                {
                    section: 'E',
                    name: 'CANAN TUGAYTİMUR'
                },
                {
                    section: 'F',
                    name: 'BESTAMİ KILINÇ'
                }
            ]
        },
        {
            sheet: '3 KASIM',
            timeSlot: '3.DERS',
            date: '3 KASIM 2025',
            day: 'PAZARTESİ',
            exam: '11 ORTAK TÜRK TARİHİ',
            grade: '11',
            subject: 'ORTAK TÜRK TARİHİ',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'ELİF AZBAY'
                },
                {
                    section: 'A',
                    name: 'ELİF AKKURT'
                },
                {
                    section: 'B',
                    name: 'ÖZKAN KAYA'
                },
                {
                    section: 'C',
                    name: 'ŞEVKET BUĞRA CANATA'
                },
                {
                    section: 'D',
                    name: 'ELİF AKKURT'
                },
                {
                    section: 'E',
                    name: 'ELİF AKKURT'
                },
                {
                    section: 'F',
                    name: 'ŞEVKET BUĞRA CANATA'
                }
            ]
        },
        {
            sheet: '3 KASIM',
            timeSlot: '4.DERS',
            date: '3 KASIM 2025',
            day: 'PAZARTESİ',
            exam: '10 MATEMATİK',
            grade: '10',
            subject: 'MATEMATİK',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'BAHAR SARIKAYA'
                },
                {
                    section: 'A',
                    name: 'ONUR TÜRE'
                },
                {
                    section: 'B',
                    name: 'GÜLBEN KARABULUT'
                },
                {
                    section: 'C',
                    name: 'ÖZLEM YETİM'
                },
                {
                    section: 'D',
                    name: 'HÜLYA BAHTİYAR'
                },
                {
                    section: 'E',
                    name: 'HÜLYA BAHTİYAR'
                },
                {
                    section: 'F',
                    name: 'RECEP SARIKAYA'
                }
            ]
        },
        {
            sheet: '3 KASIM',
            timeSlot: '6.DERS',
            date: '3 KASIM 2025',
            day: 'PAZARTESİ',
            exam: '9 DİN KÜLTÜRÜ',
            grade: '9',
            subject: 'DİN KÜLTÜRÜ',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'ELİF AZBAY'
                },
                {
                    section: 'A',
                    name: 'NURCAN DURMAZ',
                    location: 'Y.DİL-2'
                },
                {
                    section: 'B',
                    name: 'BAHAR SARIKAYA',
                    location: 'Y.DİL-1'
                },
                {
                    section: 'C',
                    name: 'ÖZLEM YETİM'
                },
                {
                    section: 'D',
                    name: 'RECEP GÜDÜCÜ',
                    location: 'EDEB-3'
                },
                {
                    section: 'E',
                    name: 'CANAN TUGAYTİMUR'
                },
                {
                    section: 'F',
                    name: 'MERVE OCAKLI'
                }
            ]
        },
        {
            sheet: '3 KASIM',
            timeSlot: '7.DERS',
            date: '3 KASIM 2025',
            day: 'PAZARTESİ',
            exam: '10 COĞRAFYA',
            grade: '10',
            subject: 'COĞRAFYA',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'BÜŞRA TARIM'
                },
                {
                    section: 'A',
                    name: 'BEKİR BAŞAR'
                },
                {
                    section: 'B',
                    name: 'GÜLBEN KARABULUT'
                },
                {
                    section: 'C',
                    name: 'KENAN ANGÜN'
                },
                {
                    section: 'D',
                    name: 'RECEP SARIKAYA',
                    location: 'EDEB-3'
                },
                {
                    section: 'E',
                    name: 'RECEP SARIKAYA',
                    location: 'EDEB-3'
                },
                {
                    section: 'F',
                    name: 'HÜLYA BAHTİYAR'
                }
            ]
        },
        {
            sheet: '3 KASIM',
            timeSlot: '8.DERS',
            date: '3 KASIM 2025',
            day: 'PAZARTESİ',
            exam: '11 TARİH',
            grade: '11',
            subject: 'TARİH',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'BAHAR SARIKAYA'
                },
                {
                    section: 'A',
                    name: 'MEHTAP PÜLGİR'
                },
                {
                    section: 'B',
                    name: 'RECEP SARIKAYA'
                },
                {
                    section: 'C',
                    name: 'AHMET CARİ'
                },
                {
                    section: 'D',
                    name: 'MEHTAP PÜLGİR'
                },
                {
                    section: 'E',
                    name: 'MEHTAP PÜLGİR'
                },
                {
                    section: 'F',
                    name: 'NUH SATILMIŞ'
                }
            ]
        },
        {
            sheet: '4 KASIM',
            timeSlot: '2.DERS',
            date: '4 KASIM 2025',
            day: 'SALI',
            exam: '9 FİZİK',
            grade: '9',
            subject: 'FİZİK',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'ALİ ÖZKAN ÇELİKLER'
                },
                {
                    section: 'A',
                    name: 'ELİF AKKURT'
                },
                {
                    section: 'B',
                    name: 'MERVE OCAKLI'
                },
                {
                    section: 'C',
                    name: 'BAHAR SARIKAYA',
                    location: 'BİYOLOJİ LAB'
                },
                {
                    section: 'D',
                    name: 'NURAY MERAL'
                },
                {
                    section: 'E',
                    name: 'HİLAL ARIKAN'
                },
                {
                    section: 'F',
                    name: 'ESRA AKBAŞ GÜLLER'
                }
            ]
        },
        {
            sheet: '4 KASIM',
            timeSlot: '3.DERS',
            date: '4 KASIM 2025',
            day: 'SALI',
            exam: '11 S. MESLEKİ YABANCI DİL',
            grade: '11',
            subject: 'S. MESLEKİ YABANCI DİL',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'ONUR KALABAK'
                },
                {
                    section: 'A',
                    name: 'KAĞAN BAHADIR DURGUT'
                },
                {
                    section: 'B',
                    name: 'HABİB GÖZLER'
                },
                {
                    section: 'C',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'D',
                    name: 'RECEP GÜDÜCÜ'
                },
                {
                    section: 'E',
                    name: 'CANAN TUGAYTİMUR'
                },
                {
                    section: 'F',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                }
            ]
        },
        {
            sheet: '4 KASIM',
            timeSlot: '4.DERS',
            date: '4 KASIM 2025',
            day: 'SALI',
            exam: '10 FİZİK',
            grade: '10',
            subject: 'FİZİK',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'GÜLBEN KARABULUT'
                },
                {
                    section: 'A',
                    name: 'RECEP SARIKAYA',
                    location: 'EDEB - 3'
                },
                {
                    section: 'B',
                    name: 'BÜŞRA TARIM'
                },
                {
                    section: 'C',
                    name: 'SÜLEYMAN ÜNAL'
                },
                {
                    section: 'D',
                    name: 'TURAN TURNA'
                },
                {
                    section: 'E',
                    name: 'CANAN TUGAYTİMUR'
                },
                {
                    section: 'F',
                    name: 'BEYHAN GENÇAĞ'
                }
            ]
        },
        {
            sheet: '4 KASIM',
            timeSlot: '5.DERS',
            date: '4 KASIM 2025',
            day: 'SALI',
            exam: '9. S.PROJE',
            grade: '9',
            subject: 'S.PROJE',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'ALİ ÖZKAN ÇELİKLER'
                },
                {
                    section: 'A',
                    name: 'BEKİR BAŞAR'
                },
                {
                    section: 'B',
                    name: 'KENAN ANGÜN'
                },
                {
                    section: 'C',
                    name: 'ELİF AKKURT'
                },
                {
                    section: 'D',
                    name: 'NURAY MERAL'
                },
                {
                    section: 'E',
                    name: 'HALİME İNÇAMUR'
                },
                {
                    section: 'F',
                    name: 'MERVE OCAKLI'
                }
            ]
        },
        {
            sheet: '4 KASIM',
            timeSlot: '6.DERS',
            date: '4 KASIM 2025',
            day: 'SALI',
            exam: '11 YABANCI DİL',
            grade: '11',
            subject: 'YABANCI DİL',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'RECEP SARIKAYA'
                },
                {
                    section: 'A',
                    name: 'KAĞAN BAHADIR DURGUT'
                },
                {
                    section: 'B',
                    name: 'ONUR KALABAK'
                },
                {
                    section: 'C',
                    name: 'MEHTAP PÜLGİR'
                },
                {
                    section: 'D',
                    name: 'RECEP GÜDÜCÜ'
                },
                {
                    section: 'E',
                    name: 'CANAN TUGAYTİMUR'
                },
                {
                    section: 'F',
                    name: 'MEHTAP PÜLGİR'
                }
            ]
        },
        {
            sheet: '4 KASIM',
            timeSlot: '7.DERS',
            date: '4 KASIM 2025',
            day: 'SALI',
            exam: '10 EDEBİYAT',
            grade: '10',
            subject: 'EDEBİYAT',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'BÜŞRA TARIM'
                },
                {
                    section: 'A',
                    name: 'NAGİHAN KARAKAYA'
                },
                {
                    section: 'B',
                    name: 'MEHMET AĞCA',
                    location: 'COĞRAFYA'
                },
                {
                    section: 'C',
                    name: 'SÜLEYMAN ÜNAL'
                },
                {
                    section: 'D',
                    name: 'TURAN TURNA'
                },
                {
                    section: 'E',
                    name: 'CANAN TUGAYTİMUR'
                },
                {
                    section: 'F',
                    name: 'AHMET CARİ'
                }
            ]
        },
        {
            sheet: '4 KASIM',
            timeSlot: '8.DERS',
            date: '4 KASIM 2025',
            day: 'SALI',
            exam: '9 YABANCI DİL',
            grade: '9',
            subject: 'YABANCI DİL',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'BÜŞRA TARIM'
                },
                {
                    section: 'A',
                    name: 'NURAY MERAL'
                },
                {
                    section: 'B',
                    name: 'GÜLBEN KARABULUT'
                },
                {
                    section: 'C',
                    name: 'BEKİR BAŞAR'
                },
                {
                    section: 'D',
                    name: 'ÖZLEM YETİM'
                },
                {
                    section: 'E',
                    name: 'HANDAN NİSA ANEMİKAYE',
                    location: 'Y.DİL -2'
                },
                {
                    section: 'F',
                    name: 'KENAN ANGÜN'
                }
            ]
        },
        {
            sheet: '5 KASIM',
            timeSlot: '2.DERS',
            date: '5 KASIM 2025',
            day: 'ÇARŞAMBA',
            exam: '9 KİMYA',
            grade: '9',
            subject: 'KİMYA',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'HALİME İNÇAMUR'
                },
                {
                    section: 'A',
                    name: 'NURAY MERAL'
                },
                {
                    section: 'B',
                    name: 'ELİF AZBAY'
                },
                {
                    section: 'C',
                    name: 'FATİH AKKOÇ'
                },
                {
                    section: 'D',
                    name: 'BEKİR BAŞAR'
                },
                {
                    section: 'E',
                    name: 'BAHAR SARIKAYA',
                    location: 'DİKAB -1'
                },
                {
                    section: 'F',
                    name: 'HİMMET SEVİNÇ'
                }
            ]
        },
        {
            sheet: '5 KASIM',
            timeSlot: '3.DERS',
            date: '5 KASIM 2025',
            day: 'ÇARŞAMBA',
            exam: '11 DİN KÜLTÜRÜ',
            grade: '11',
            subject: 'DİN KÜLTÜRÜ',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'A',
                    name: 'BAHAR SARIKAYA'
                },
                {
                    section: 'B',
                    name: 'HANDAN NİSA ANEMİKAYE'
                },
                {
                    section: 'C',
                    name: 'EVREN IŞIK'
                },
                {
                    section: 'D',
                    name: 'BAHAR SARIKAYA'
                },
                {
                    section: 'E',
                    name: 'BAHAR SARIKAYA'
                },
                {
                    section: 'F',
                    name: 'EVREN IŞIK'
                }
            ]
        },
        {
            sheet: '5 KASIM',
            timeSlot: '4.DERS',
            date: '5 KASIM 2025',
            day: 'ÇARŞAMBA',
            exam: '10 KİMYA',
            grade: '10',
            subject: 'KİMYA',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'A',
                    name: 'MERVE OCAKLI'
                },
                {
                    section: 'B',
                    name: 'HÜLYA BAHTİYAR'
                },
                {
                    section: 'C',
                    name: 'KENAN ANGÜN'
                },
                {
                    section: 'D',
                    name: 'BEYHAN GENÇAĞ'
                },
                {
                    section: 'E',
                    name: 'NURCAN DURMAZ'
                },
                {
                    section: 'F',
                    name: 'BÜŞRA TARIM'
                }
            ]
        },
        {
            sheet: '5 KASIM',
            timeSlot: '5.DERS',
            date: '5 KASIM 2025',
            day: 'ÇARŞAMBA',
            exam: '9. S.DÜŞÜNME EĞİTİMİ',
            grade: '9',
            subject: 'S.DÜŞÜNME EĞİTİMİ',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'NURAY MERAL'
                },
                {
                    section: 'A',
                    name: 'BÜŞRA TARIM'
                },
                {
                    section: 'B',
                    name: 'ŞEVKET BUĞRA CANATA',
                    location: 'EDEB -2'
                },
                {
                    section: 'C',
                    name: 'AHMET CARİ'
                },
                {
                    section: 'D',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'E',
                    name: 'HİLAL ARIKAN'
                },
                {
                    section: 'F',
                    name: 'HİMMET SEVİNÇ'
                }
            ]
        },
        {
            sheet: '5 KASIM',
            timeSlot: '6.DERS',
            date: '5 KASIM 2025',
            day: 'ÇARŞAMBA',
            exam: '11 EDEBİYAT',
            grade: '11',
            subject: 'EDEBİYAT',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'EVREN IŞIK'
                },
                {
                    section: 'A',
                    name: 'ESRA AKBAŞ GÜLLER'
                },
                {
                    section: 'B',
                    name: 'HANDAN NİSA ANEMİKAYE'
                },
                {
                    section: 'C',
                    name: 'ONUR TÜRE',
                    location: 'Y.DİL -2'
                },
                {
                    section: 'D',
                    name: 'RECEP SARIKAYA',
                    location: 'DİKAB -2'
                },
                {
                    section: 'E',
                    name: 'RECEP SARIKAYA',
                    location: 'DİKAB -2'
                },
                {
                    section: 'F',
                    name: 'ONUR TÜRE',
                    location: 'Y.DİL -2'
                }
            ]
        },
        {
            sheet: '5 KASIM',
            timeSlot: '7.DERS',
            date: '5 KASIM 2025',
            day: 'ÇARŞAMBA',
            exam: '10 TARİH',
            grade: '10',
            subject: 'TARİH',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'NAGİHAN KARAKAYA'
                },
                {
                    section: 'A',
                    name: 'MERVE OCAKLI'
                },
                {
                    section: 'B',
                    name: 'BÜŞRA TARIM'
                },
                {
                    section: 'C',
                    name: 'KENAN ANGÜN'
                },
                {
                    section: 'D',
                    name: 'BEYHAN GENÇAĞ'
                },
                {
                    section: 'E',
                    name: 'NURCAN DURMAZ'
                },
                {
                    section: 'F',
                    name: 'RECEP SARIKAYA'
                }
            ]
        },
        {
            sheet: '5 KASIM',
            timeSlot: '8.DERS',
            date: '5 KASIM 2025',
            day: 'ÇARŞAMBA',
            exam: '9 BİYOLOJİ',
            grade: '9',
            subject: 'BİYOLOJİ',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'MEHMET KAYGISIZ'
                },
                {
                    section: 'A',
                    name: 'ONUR TÜRE'
                },
                {
                    section: 'B',
                    name: 'HALİME İNÇAMUR'
                },
                {
                    section: 'C',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'D',
                    name: 'BAHAR SARIKAYA',
                    location: 'COĞRAFYA'
                },
                {
                    section: 'E',
                    name: 'NURAY MERAL'
                },
                {
                    section: 'F',
                    name: 'NUH SATILMIŞ'
                }
            ]
        },
        {
            sheet: '6 KASIM',
            timeSlot: '3.DERS',
            date: '6 KASIM 2025',
            day: 'PERŞEMBE',
            exam: '9 MATEMATİK',
            grade: '9',
            subject: 'MATEMATİK',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'EVREN IŞIK'
                },
                {
                    section: 'A',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'B',
                    name: 'ALİ ÖZKAN ÇELİKLER'
                },
                {
                    section: 'C',
                    name: 'FATİH AKKOÇ'
                },
                {
                    section: 'D',
                    name: 'MEHMET AĞCA'
                },
                {
                    section: 'E',
                    name: 'NURAY MERAL'
                },
                {
                    section: 'F',
                    name: 'NAGİHAN KARAKAYA'
                }
            ]
        },
        {
            sheet: '6 KASIM',
            timeSlot: '4.DERS',
            date: '6 KASIM 2025',
            day: 'PERŞEMBE',
            exam: '10 S. PROJE',
            grade: '10',
            subject: 'S. PROJE',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'ABDURRAHMAN ÖNER'
                },
                {
                    section: 'A',
                    name: 'KAĞAN BAHADIR DURGUT'
                },
                {
                    section: 'B',
                    name: 'RECEP SARIKAYA',
                    location: 'FELSEFE'
                },
                {
                    section: 'C',
                    name: 'HALİME İNÇAMUR'
                },
                {
                    section: 'D',
                    name: 'MERVE OCAKLI'
                },
                {
                    section: 'E',
                    name: 'MERVE OCAKLI'
                },
                {
                    section: 'F',
                    name: 'ELİF AZBAY'
                }
            ]
        },
        {
            sheet: '6 KASIM',
            timeSlot: '5.DERS',
            date: '6 KASIM 2025',
            day: 'PERŞEMBE',
            exam: '11 S. MATEMATİK',
            grade: '11',
            subject: 'S. MATEMATİK',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'MEHTAP PÜLGİR'
                },
                {
                    section: 'A',
                    name: 'ONUR KALABAK'
                },
                {
                    section: 'B',
                    name: 'RAMAZAN GENÇDAL'
                },
                {
                    section: 'C',
                    name: 'BESTAMİ KILINÇ'
                },
                {
                    section: 'D',
                    name: 'TURAN TURNA'
                },
                {
                    section: 'E',
                    name: 'NURCAN DURMAZ'
                },
                {
                    section: 'F',
                    name: 'NUH SATILMIŞ'
                }
            ]
        },
        {
            sheet: '6 KASIM',
            timeSlot: '6.DERS',
            date: '6 KASIM 2025',
            day: 'PERŞEMBE',
            exam: '11 FELSEFE',
            grade: '11',
            subject: 'FELSEFE',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'RAMAZAN GENÇDAL'
                },
                {
                    section: 'A',
                    name: 'ONUR KALABAK'
                },
                {
                    section: 'B',
                    name: 'MERVE OCAKLI'
                },
                {
                    section: 'C',
                    name: 'MEHMET AĞCA'
                },
                {
                    section: 'D',
                    name: 'TURAN TURNA'
                },
                {
                    section: 'E',
                    name: 'NURCAN DURMAZ'
                },
                {
                    section: 'F',
                    name: 'MEHMET AĞCA'
                }
            ]
        },
        {
            sheet: '6 KASIM',
            timeSlot: '7.DERS',
            date: '6 KASIM 2025',
            day: 'PERŞEMBE',
            exam: '10 S. TÜRK SOS. HAY. AİLE',
            grade: '10',
            subject: 'S. TÜRK SOS. HAY. AİLE',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'ELİF AZBAY'
                },
                {
                    section: 'A',
                    name: 'KAĞAN BAHADIR DURGUT'
                },
                {
                    section: 'B',
                    name: 'ABDURRAHMAN ÖNER'
                },
                {
                    section: 'C',
                    name: 'MEHMET AĞCA'
                },
                {
                    section: 'D',
                    name: 'BESTAMİ KILINÇ'
                },
                {
                    section: 'E',
                    name: 'BESTAMİ KILINÇ'
                },
                {
                    section: 'F',
                    name: 'NAGİHAN KARAKAYA'
                }
            ]
        },
        {
            sheet: '6 KASIM',
            timeSlot: '8.DERS',
            date: '6 KASIM 2025',
            day: 'PERŞEMBE',
            exam: '10 BİYOLOJİ',
            grade: '10',
            subject: 'BİYOLOJİ',
            administrator: 'ONUR TÜRE',
            proctors: [
                {
                    section: 'AV',
                    name: 'ELİF AZBAY'
                },
                {
                    section: 'A',
                    name: 'KAĞAN BAHADIR DURGUT'
                },
                {
                    section: 'B',
                    name: 'BEKİR BAŞAR'
                },
                {
                    section: 'C',
                    name: 'HÜLYA BAHTİYAR'
                },
                {
                    section: 'D',
                    name: 'RECEP SARIKAYA'
                },
                {
                    section: 'E',
                    name: 'RECEP SARIKAYA'
                },
                {
                    section: 'F',
                    name: 'NAGİHAN KARAKAYA'
                }
            ]
        },
        {
            sheet: '7 KASIM',
            timeSlot: '3.DERS',
            date: '7 KASIM 2025',
            day: 'CUMA',
            exam: '9 S. PEYG. HAYATI',
            grade: '9',
            subject: 'S. PEYG. HAYATI',
            administrator: 'TALHA GÖNÜL',
            proctors: [
                {
                    section: 'AV',
                    name: 'ELİF AKKURT'
                },
                {
                    section: 'A',
                    name: 'BÜŞRA TARIM'
                },
                {
                    section: 'B',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'C',
                    name: 'TALHA GÖNÜL'
                },
                {
                    section: 'D',
                    name: 'HİLAL ARIKAN'
                },
                {
                    section: 'E',
                    name: 'EVREN IŞIK'
                },
                {
                    section: 'F',
                    name: 'HALİME İNÇAMUR'
                }
            ]
        },
        {
            sheet: '7 KASIM',
            timeSlot: '4.DERS',
            date: '7 KASIM 2025',
            day: 'CUMA',
            exam: '10 S. TEMEL DİNİ BİLGİ',
            grade: '10',
            subject: 'S. TEMEL DİNİ BİLGİ',
            administrator: 'TALHA GÖNÜL',
            proctors: [
                {
                    section: 'AV',
                    name: 'HABİB GÖZLER'
                },
                {
                    section: 'A',
                    name: 'ABDURRAHMAN GÜNER'
                },
                {
                    section: 'B',
                    name: 'NAGİHAN KARAKAYA'
                },
                {
                    section: 'C',
                    name: 'ÖZLEM YETİM'
                },
                {
                    section: 'D',
                    name: 'ŞEVKET BUĞRA CANATA'
                },
                {
                    section: 'E',
                    name: 'ŞEVKET BUĞRA CANATA'
                },
                {
                    section: 'F',
                    name: 'ÖZKAN KAYA'
                }
            ]
        },
        {
            sheet: '7 KASIM',
            timeSlot: '5.DERS',
            date: '7 KASIM 2025',
            day: 'CUMA',
            exam: '9. S.ADABI MUA.',
            grade: '9',
            subject: 'S.ADABI MUA.',
            administrator: 'TALHA GÖNÜL',
            proctors: [
                {
                    section: 'AV',
                    name: 'EVREN IŞIK'
                },
                {
                    section: 'A',
                    name: 'OKTAY APAYDIN'
                },
                {
                    section: 'B',
                    name: 'ŞEVKET BUĞRA CANATA'
                },
                {
                    section: 'C',
                    name: 'BÜŞRA TARIM'
                },
                {
                    section: 'D',
                    name: 'HİLAL ARIKAN'
                },
                {
                    section: 'E',
                    name: 'ELİF AZBAY'
                },
                {
                    section: 'F',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                }
            ]
        },
        {
            sheet: '7 KASIM',
            timeSlot: '6.DERS',
            date: '7 KASIM 2025',
            day: 'CUMA',
            exam: '11 S. PEYG. HAYATI',
            grade: '11',
            subject: 'S. PEYG. HAYATI',
            administrator: 'TALHA GÖNÜL',
            proctors: [
                {
                    section: 'AV',
                    name: 'HANDAN NİSA ANEMİKAYE'
                },
                {
                    section: 'A',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'B',
                    name: 'MEHTAP PÜLGİR'
                },
                {
                    section: 'C',
                    name: 'FATİH AKKOÇ'
                },
                {
                    section: 'D',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'E',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'F',
                    name: 'HİMMET SEVİNÇ'
                }
            ]
        },
        {
            sheet: '7 KASIM',
            timeSlot: '7.DERS',
            date: '7 KASIM 2025',
            day: 'CUMA',
            exam: '10 YABANCI DİL',
            grade: '10',
            subject: 'YABANCI DİL',
            administrator: 'TALHA GÖNÜL',
            proctors: [
                {
                    section: 'AV',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'A',
                    name: 'ÖZKAN KAYA'
                },
                {
                    section: 'B',
                    name: 'HABİB GÖZLER'
                },
                {
                    section: 'C',
                    name: 'ŞEVKET BUĞRA CANATA'
                },
                {
                    section: 'D',
                    name: 'HALİME İNÇAMUR'
                },
                {
                    section: 'E',
                    name: 'HALİME İNÇAMUR'
                },
                {
                    section: 'F',
                    name: 'NAGİHAN KARAKAYA'
                }
            ]
        },
        {
            sheet: '7 KASIM',
            timeSlot: '8.DERS',
            date: '7 KASIM 2025',
            day: 'CUMA',
            exam: '9 COĞRAFYA',
            grade: '9',
            subject: 'COĞRAFYA',
            administrator: 'TALHA GÖNÜL',
            proctors: [
                {
                    section: 'AV',
                    name: 'NESLİHAN DÜLGER AKKAYA'
                },
                {
                    section: 'A',
                    name: 'MEHTAP PÜLGİR'
                },
                {
                    section: 'B',
                    name: 'OKTAY APAYDIN'
                },
                {
                    section: 'C',
                    name: 'ŞEVKET BUĞRA CANATA'
                },
                {
                    section: 'D',
                    name: 'ELİF AZBAY'
                },
                {
                    section: 'E',
                    name: 'ÖZLEM YETİM'
                },
                {
                    section: 'F',
                    name: 'EVREN IŞIK'
                }
            ]
        },
        {
            sheet: '18 KASIM',
            timeSlot: '2.DERS',
            date: '18 KASIM 2025',
            day: 'SALI',
            exam: '9 EDEBİYAT',
            grade: '9',
            subject: 'EDEBİYAT',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'ALİ ÖZKAN ÇELİKLER'
                },
                {
                    section: 'A',
                    name: 'ELİF AKKURT'
                },
                {
                    section: 'B',
                    name: 'MERVE OCAKLI'
                },
                {
                    section: 'C',
                    name: 'BAHAR SARIKAYA',
                    location: 'BİYOLOJİ LAB'
                },
                {
                    section: 'D',
                    name: 'NURAY MERAL'
                },
                {
                    section: 'E',
                    name: 'HİLAL ARIKAN'
                },
                {
                    section: 'F',
                    name: 'ESRA AKBAŞ GÜLLER'
                }
            ]
        },
        {
            sheet: '18 KASIM',
            timeSlot: '3.DERS',
            date: '18 KASIM 2025',
            day: 'SALI',
            exam: '10 DİN KÜLTÜRÜ',
            grade: '10',
            subject: 'DİN KÜLTÜRÜ',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'GÜLBEN KARABULUT'
                },
                {
                    section: 'A',
                    name: 'RECEP SARIKAYA',
                    location: 'EDEB -2'
                },
                {
                    section: 'B',
                    name: 'ELİF AKKURT'
                },
                {
                    section: 'C',
                    name: 'SÜLEYMAN ÜNAL'
                },
                {
                    section: 'D',
                    name: 'TURAN TURNA',
                    location: 'MAT - 2'
                },
                {
                    section: 'E',
                    name: 'CANAN TUGAYTİMUR'
                },
                {
                    section: 'F',
                    name: 'BEYHAN GENÇAĞ'
                }
            ]
        },
        {
            sheet: '18 KASIM',
            timeSlot: '4.DERS',
            date: '18 KASIM 2025',
            day: 'SALI',
            exam: '10 FELSEFE',
            grade: '10',
            subject: 'FELSEFE',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'GÜLBEN KARABULUT'
                },
                {
                    section: 'A',
                    name: 'RECEP SARIKAYA',
                    location: 'EDEB -3'
                },
                {
                    section: 'B',
                    name: 'BÜŞRA TARIM'
                },
                {
                    section: 'C',
                    name: 'SÜLEYMAN ÜNAL'
                },
                {
                    section: 'D',
                    name: 'TURAN TURNA'
                },
                {
                    section: 'E',
                    name: 'CANAN TUGAYTİMUR'
                },
                {
                    section: 'F',
                    name: 'BEYHAN GENÇAĞ'
                }
            ]
        },
        {
            sheet: '18 KASIM',
            timeSlot: '5.DERS',
            date: '18 KASIM 2025',
            day: 'SALI',
            exam: '9. TARİH',
            grade: '9',
            subject: 'TARİH',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'ALİ ÖZKAN ÇELİKLER'
                },
                {
                    section: 'A',
                    name: 'BEKİR BAŞAR'
                },
                {
                    section: 'B',
                    name: 'KENAN ANGÜN'
                },
                {
                    section: 'C',
                    name: 'ELİF AKKURT'
                },
                {
                    section: 'D',
                    name: 'NURAY MERAL'
                },
                {
                    section: 'E',
                    name: 'HALİME İNÇAMUR'
                },
                {
                    section: 'F',
                    name: 'MERVE OCAKLI'
                }
            ]
        },
        {
            sheet: '18 KASIM',
            timeSlot: '7.DERS',
            date: '18 KASIM 2025',
            day: 'SALI',
            exam: '11 SAĞLIK BİLGİSİ',
            grade: '11',
            subject: 'SAĞLIK BİLGİSİ',
            administrator: 'MEHMET KAYGISIZ',
            proctors: [
                {
                    section: 'AV',
                    name: 'HABİB GÖZLER'
                },
                {
                    section: 'A',
                    name: 'KAĞAN BAHADIR DURGUT'
                },
                {
                    section: 'B',
                    name: 'ONUR KALABAK'
                },
                {
                    section: 'C',
                    name: 'MEHTAP PÜLGİR'
                },
                {
                    section: 'D',
                    name: 'RECEP GÜDÜCÜ',
                    location: 'DİKAB -1'
                },
                {
                    section: 'E',
                    name: 'CANAN TUGAYTİMUR'
                },
                {
                    section: 'F',
                    name: 'MEHTAP PÜLGİR'
                }
            ]
        }
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
        'EKİM': '10', 'KASIM': '11', 'ARALIK': '12',
        'OCAK': '01', 'ŞUBAT': '02', 'MART': '03',
        'NİSAN': '04', 'MAYIS': '05', 'HAZİRAN': '06',
        'TEMMUZ': '07', 'AĞUSTOS': '08', 'EYLÜL': '09'
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

    if (upcomingExams.length === 0) return null;

    // Sort by date and time
    upcomingExams.sort((a, b) => {
        const dateA = parseExamDate(a.date);
        const dateB = parseExamDate(b.date);
        if (dateA.getTime() !== dateB.getTime()) {
            return dateA - dateB;
        }
        return a.timeSlot.localeCompare(b.timeSlot);
    });

    return upcomingExams[0];
}

// Update current time indicators
function updateCurrentTimeIndicators() {
    const countdownElement = document.getElementById('nextExamCountdown');
    const titleElement = document.getElementById('nextExamTitle');
    if (!countdownElement) return;

    const now = new Date();

    // Find currently ongoing exam
    const ongoingExam = filteredExams.find(exam => {
        const status = getExamStatus(exam);
        return status === 'in_progress';
    });

    // Find next upcoming exam
    const upcomingExams = filteredExams.filter(exam => {
        const status = getExamStatus(exam);
        return status === 'upcoming';
    }).sort((a, b) => {
        const dateA = parseExamDate(a.date);
        const dateB = parseExamDate(b.date);
        if (dateA.getTime() !== dateB.getTime()) {
            return dateA - dateB;
        }
        const timeA = timeSlotMapping[a.timeSlot];
        const timeB = timeSlotMapping[b.timeSlot];
        return timeA.start.localeCompare(timeB.start);
    });

    const nextExam = upcomingExams[0];

    // Show ongoing exam if exists
    if (ongoingExam) {
        if (titleElement) titleElement.textContent = 'Devam Eden Sınav';
        const timeSlot = timeSlotMapping[ongoingExam.timeSlot];
        const examDate = parseExamDate(ongoingExam.date);
        const endTime = timeSlot.end.split(':');
        examDate.setHours(parseInt(endTime[0]), parseInt(endTime[1]), 0);

        const timeLeft = examDate - now;
        const minutesLeft = Math.floor(timeLeft / 60000);

        countdownElement.innerHTML = `
            <div class="next-exam-info" style="background: linear-gradient(135deg, rgba(255, 193, 7, 0.15), rgba(255, 193, 7, 0.05)); border-left: 4px solid #ffc107; padding: 1.5rem; border-radius: 8px;">
                <div class="exam-status-badge" style="background: #ffc107; color: #000; padding: 0.4rem 1rem; border-radius: 20px; display: inline-block; font-weight: 700; font-size: 0.85rem; letter-spacing: 0.5px; margin-bottom: 1rem;">
                    ⚡ DEVAM EDEN SINAV
                </div>
                <div class="exam-subject" style="font-size: 1.4rem; font-weight: 700; color: var(--primary-color); margin-bottom: 1rem; line-height: 1.3;">
                    ${ongoingExam.exam}
                </div>
                <div class="exam-meta" style="display: flex; flex-direction: column; gap: 0.6rem; color: var(--text-secondary); font-size: 0.95rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-calendar" style="width: 20px; color: var(--primary-color);"></i>
                        <span>${ongoingExam.date}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-clock" style="width: 20px; color: var(--primary-color);"></i>
                        <span>${timeSlot.start} - ${timeSlot.end}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; color: #ffc107; font-weight: 700; font-size: 1.1rem; margin-top: 0.5rem; padding-top: 0.8rem; border-top: 1px solid rgba(255, 193, 7, 0.2);">
                        <i class="fas fa-hourglass-half" style="width: 20px;"></i>
                        <span>Bitiş: ${minutesLeft} dakika</span>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    // Show next upcoming exam
    if (nextExam) {
        if (titleElement) titleElement.textContent = 'Sonraki Sınav';
        const timeSlot = timeSlotMapping[nextExam.timeSlot];
        const examDate = parseExamDate(nextExam.date);
        const startTime = timeSlot.start.split(':');
        examDate.setHours(parseInt(startTime[0]), parseInt(startTime[1]), 0);

        const timeUntil = examDate - now;
        const daysLeft = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));

        let countdownText = '';
        if (daysLeft > 0) {
            countdownText = `${daysLeft} gün ${hoursLeft} saat`;
        } else if (hoursLeft > 0) {
            countdownText = `${hoursLeft} saat ${minutesLeft} dakika`;
        } else {
            countdownText = `${minutesLeft} dakika`;
        }

        countdownElement.innerHTML = `
            <div class="next-exam-info" style="padding: 1.5rem;">
                <div class="exam-subject" style="font-size: 1.4rem; font-weight: 700; color: var(--primary-color); margin-bottom: 1rem; line-height: 1.3;">
                    ${nextExam.exam}
                </div>
                <div class="exam-meta" style="display: flex; flex-direction: column; gap: 0.6rem; color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-calendar" style="width: 20px; color: var(--primary-color);"></i>
                        <span>${nextExam.date}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-clock" style="width: 20px; color: var(--primary-color);"></i>
                        <span>${timeSlot.start} - ${timeSlot.end}</span>
                    </div>
                </div>
                <div class="countdown-timer" style="padding: 1.5rem; background: linear-gradient(135deg, rgba(52, 152, 219, 0.15), rgba(52, 152, 219, 0.05)); border-radius: 12px; text-align: center; border: 2px solid rgba(52, 152, 219, 0.2);">
                    <div style="font-size: 2.2rem; font-weight: 700; color: var(--primary-color); letter-spacing: -0.5px;">
                        ${countdownText}
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.6rem; font-weight: 500;">
                        sınava kaldı
                    </div>
                </div>
            </div>
        `;
    } else {
        // No upcoming exams
        countdownElement.innerHTML = `
            <span class="countdown-empty">
                <i class="fas fa-check-circle" style="color: var(--success-color); margin-right: 0.5rem;"></i>
                Tüm sınavlar tamamlandı!
            </span>
        `;
    }
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

    // Notify 1 hour before exam
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
    const activeWeek = activeTab ? activeTab.dataset.week : '3-7 KASIM';

    // Filter exams for active week
    // Handle both week ranges and individual days
    let weekExams;
    if (activeWeek === '3-7 KASIM') {
        // Show exams from 3, 4, 5, 6, 7 KASIM
        weekExams = filteredExams.filter(exam =>
            ['3 KASIM', '4 KASIM', '5 KASIM', '6 KASIM', '7 KASIM'].includes(exam.sheet)
        );
    } else if (activeWeek === '18 KASIM') {
        // Show exams from 18 KASIM
        weekExams = filteredExams.filter(exam => exam.sheet === '18 KASIM');
    } else {
        // Fallback to exact match
        weekExams = filteredExams.filter(exam => exam.sheet === activeWeek);
    }

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

    // Find the full exam object with proctor information
    const examObj = allExams.find(e =>
        e.exam === exam &&
        e.date === date &&
        e.timeSlot === timeSlot &&
        e.grade === grade
    );

    // Generate proctor list HTML
    let proctorsHTML = '';
    if (examObj && examObj.proctors && examObj.proctors.length > 0) {
        proctorsHTML = `
            <div style="margin-top: 1.5rem; text-align: left;">
                <h4 style="color: var(--primary-color); margin-bottom: 0.75rem; text-align: center;">Gözetmen Öğretmenler</h4>
                <div style="background: rgba(52, 152, 219, 0.05); padding: 1rem; border-radius: 8px;">
                    ${examObj.proctors.map(proctor => `
                        <div style="padding: 0.5rem; border-bottom: 1px solid rgba(52, 152, 219, 0.1); display: flex; justify-content: space-between;">
                            <span><strong>${proctor.section} Şubesi:</strong> ${proctor.name}</span>
                            ${proctor.location ? `<span style="color: var(--text-secondary); font-size: 0.9rem;">${proctor.location}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Generate administrator HTML
    let administratorHTML = '';
    if (examObj && examObj.administrator) {
        administratorHTML = `
            <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(46, 204, 113, 0.1); border-radius: 8px; text-align: center;">
                <strong>Müdür Yardımcısı:</strong> ${examObj.administrator}
            </div>
        `;
    }

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
            ${administratorHTML}
            ${proctorsHTML}
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