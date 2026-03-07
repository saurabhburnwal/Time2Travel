/**
 * TripPDFDocument.tsx
 *
 * Utility module that generates a clean, multi-section PDF summarizing
 * the user's complete trip. Uses jsPDF for PDF creation and html2canvas
 * to capture the Leaflet map from the UI as an image.
 *
 * Called from FinalReview.tsx via generateTripPDF().
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getPlaces } from '../services/placesService';
import { AppPlace } from '../services/supabaseClient';

// ---- internal helpers ----

/**
 * Draws a horizontal gradient header strip and returns the new Y position.
 */
function drawSectionHeader(doc: jsPDF, title: string, y: number): number {
    const pageW = doc.internal.pageSize.getWidth();
    // Gradient-like header background (brand teal rectangle)
    doc.setFillColor(24, 70, 90); // brand-600 approximation
    doc.roundedRect(14, y, pageW - 28, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 20, y + 7);
    doc.setTextColor(50, 50, 50);
    return y + 16;
}

/**
 * Draws a label: value row and returns the new Y position.
 */
function drawRow(doc: jsPDF, label: string, value: string, y: number): number {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text(`${label}:`, 20, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    doc.text(value, 65, y);
    return y + 7;
}

/**
 * Checks if we need a new page and adds one if needed, returning the new Y.
 */
function ensureSpace(doc: jsPDF, y: number, needed: number): number {
    if (y + needed > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        return 20;
    }
    return y;
}

// ---- transport mode labels ----
const TRANSPORT_LABELS: Record<string, string> = {
    car: 'Car (₹800/day)',
    bike: 'Bike (₹300/day)',
    bus: 'Bus (₹150/day)',
    train: 'Train (₹200/day)',
    cab: 'Cab/Taxi (₹600/day)',
};
const TRANSPORT_RATES: Record<string, number> = {
    car: 800, bike: 300, bus: 150, train: 200, cab: 600,
};

// ---- public API ----

export interface TripDataForPDF {
    // User
    userName: string;
    // Trip details
    state: string;
    destination: string;
    days: number;
    budget: number;
    travelType: string;
    groupType: string;
    // Stay info
    selectedStay: string;
    stayType: 'hotel' | 'host' | null;
    hotelPrice: number;
    // Route / Preferences
    transportMode: string;
    selectedRoadmap: { type: string; estimatedCost?: number } | null;
    // Optional map element id to capture
    mapElementId?: string;
}

/**
 * Generates and downloads a PDF containing the complete trip summary.
 *
 * @param data – trip state & user info collected from useTrip() + useAuth()
 */
export async function generateTripPDF(data: TripDataForPDF): Promise<void> {
    const doc = await buildTripPDFDoc(data);
    doc.save(`Time2Travel_${data.destination}_Trip.pdf`);
}

/**
 * Generates the PDF and returns it as a base64 string (without downloading).
 * Used for sending the PDF as an email attachment.
 */
export async function generateTripPDFBase64(data: TripDataForPDF): Promise<string> {
    const doc = await buildTripPDFDoc(data);
    // output as base64 string (without data URI prefix)
    return doc.output('datauristring').split(',')[1];
}

/**
 * Internal: builds the jsPDF document with all trip content.
 */
async function buildTripPDFDoc(data: TripDataForPDF): Promise<jsPDF> {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    let y = 14;

    // =================================================================
    //  TITLE
    // =================================================================
    doc.setFillColor(24, 70, 90);
    doc.rect(0, 0, pageW, 36, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Time2Travel', pageW / 2, 14, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Complete Trip Summary', pageW / 2, 22, { align: 'center' });
    doc.setFontSize(9);
    doc.text(`Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageW / 2, 30, { align: 'center' });
    y = 44;

    // =================================================================
    //  1. USER & TRIP DETAILS
    // =================================================================
    y = drawSectionHeader(doc, '1. User & Trip Details', y);
    y = drawRow(doc, 'User', data.userName || 'Guest', y);
    y = drawRow(doc, 'Trip Date', new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), y);
    y = drawRow(doc, 'Source', `${data.state} (Home State)`, y);
    y = drawRow(doc, 'Destination', `${data.destination}, ${data.state}`, y);
    y = drawRow(doc, 'Duration', `${data.days} days`, y);
    y += 4;

    // =================================================================
    //  2. USER PREFERENCES
    // =================================================================
    y = ensureSpace(doc, y, 50);
    y = drawSectionHeader(doc, '2. User Preferences', y);
    y = drawRow(doc, 'Budget', `₹${data.budget.toLocaleString()} per person`, y);
    y = drawRow(doc, 'Route', data.selectedRoadmap?.type || 'N/A', y);
    y = drawRow(doc, 'Transport', TRANSPORT_LABELS[data.transportMode] || data.transportMode, y);
    y = drawRow(doc, 'Travel Type', data.travelType || 'N/A', y);
    y = drawRow(doc, 'Group Type', data.groupType || 'N/A', y);
    y += 4;

    // =================================================================
    //  3. STAY DETAILS
    // =================================================================
    y = ensureSpace(doc, y, 40);
    y = drawSectionHeader(doc, '3. Selected Stay', y);
    y = drawRow(doc, 'Stay Name', data.selectedStay || 'N/A', y);
    y = drawRow(doc, 'Stay Type', data.stayType === 'hotel' ? 'Hotel' : data.stayType === 'host' ? 'Local Host (Free)' : 'N/A', y);
    if (data.stayType === 'hotel') {
        y = drawRow(doc, 'Price/Night', `₹${data.hotelPrice.toLocaleString()}`, y);
        y = drawRow(doc, 'Total Stay', `₹${(data.hotelPrice * data.days).toLocaleString()} (${data.days} nights)`, y);
    }
    y += 4;

    // =================================================================
    //  4. DAY-WISE ITINERARY
    // =================================================================
    const places = await getPlaces(data.destination);
    const placesPerDay = Math.ceil(places.length / data.days);

    y = ensureSpace(doc, y, 30);
    y = drawSectionHeader(doc, '4. Day-wise Itinerary', y);

    for (let dayIdx = 0; dayIdx < data.days; dayIdx++) {
        const dayPlaces = places.slice(dayIdx * placesPerDay, (dayIdx + 1) * placesPerDay);

        y = ensureSpace(doc, y, 16 + dayPlaces.length * 8);

        // Day sub-header
        doc.setFillColor(230, 242, 247);
        doc.roundedRect(18, y - 3, pageW - 36, 8, 1, 1, 'F');
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(24, 70, 90);
        doc.text(`Day ${dayIdx + 1}`, 22, y + 2);
        doc.setTextColor(50, 50, 50);
        y += 10;

        dayPlaces.forEach((place, i) => {
            y = ensureSpace(doc, y, 8);
            const startHour = 8 + i * 2;
            const h = startHour > 12 ? startHour - 12 : startHour;
            const ampm = startHour >= 12 ? 'PM' : 'AM';
            const time = `${h}:00 ${ampm}`;

            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text(time, 24, y);
            doc.setTextColor(40, 40, 40);
            doc.setFont('helvetica', 'bold');
            doc.text(place.name, 48, y);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(120, 120, 120);
            doc.text(`${place.category} · ${place.visitTime} · ₹${place.entryFee}`, 48, y + 4);
            y += 10;
        });
        y += 2;
    }

    // =================================================================
    //  5. ESTIMATED COST BREAKDOWN
    // =================================================================
    const transportRate = TRANSPORT_RATES[data.transportMode] || 800;
    const accommodation = data.stayType === 'hotel' ? data.hotelPrice * data.days : 0;
    const transport = transportRate * data.days;
    const entryFees = 80 * data.days;
    const total = accommodation + transport + entryFees;

    y = ensureSpace(doc, y, 55);
    y = drawSectionHeader(doc, '5. Estimated Cost Breakdown', y);
    y = drawRow(doc, 'Accommodation', data.stayType === 'hotel' ? `₹${accommodation.toLocaleString()}` : 'Free (Local Host)', y);
    y = drawRow(doc, 'Transport', `₹${transport.toLocaleString()}`, y);
    y = drawRow(doc, 'Entry Fees', `₹${entryFees.toLocaleString()}`, y);

    // Total
    doc.setDrawColor(180, 180, 180);
    doc.line(20, y, pageW - 20, y);
    y += 6;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(24, 70, 90);
    doc.text(`Total per Person:  ₹${total.toLocaleString()}`, 20, y);
    y += 6;
    const remaining = data.budget - total;
    doc.setFontSize(10);
    doc.setTextColor(remaining >= 0 ? 34 : 220, remaining >= 0 ? 139 : 38, remaining >= 0 ? 34 : 38);
    doc.text(remaining >= 0 ? `Budget Remaining: ₹${remaining.toLocaleString()}` : `Over Budget by: ₹${Math.abs(remaining).toLocaleString()}`, 20, y);
    y += 10;

    // =================================================================
    //  6. MAP IMAGE (if available in DOM)
    // =================================================================
    if (data.mapElementId) {
        const mapEl = document.getElementById(data.mapElementId);
        if (mapEl) {
            try {
                y = ensureSpace(doc, y, 100);
                y = drawSectionHeader(doc, '6. Route Map', y);

                const canvas = await html2canvas(mapEl, {
                    useCORS: true,
                    allowTaint: true,
                    scale: 3,
                    logging: false,
                    backgroundColor: '#ffffff',
                });
                const imgData = canvas.toDataURL('image/png');
                const imgW = pageW - 40;
                const imgH = (canvas.height / canvas.width) * imgW;
                const maxH = doc.internal.pageSize.getHeight() - y - 20;
                const finalH = Math.min(imgH, maxH);
                doc.addImage(imgData, 'PNG', 20, y, imgW, finalH);
                y += finalH + 6;
            } catch (err) {
                console.warn('Map capture failed, skipping map in PDF:', err);
            }
        }
    }

    // =================================================================
    //  FOOTER
    // =================================================================
    const finalPageH = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text('Generated by Time2Travel · Smart Travel Planning Within Your Budget', pageW / 2, finalPageH - 8, { align: 'center' });

    return doc;
}

