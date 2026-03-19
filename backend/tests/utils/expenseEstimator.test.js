const { estimateExpenses } = require('../../utils/expenseEstimator');

describe('Expense Estimator Utility', () => {

    const baseParams = {
        days: 3,
        accommodationPerNight: 1000,
        totalDistanceKm: 100,
        places: [
            { entry_fee: 100 },
            { entry_fee: 50 }
        ],
        groupType: 'Duo',
        style: 'standard'
    };

    it('should calculate expenses correctly for Duo/Standard', () => {
        const result = estimateExpenses(baseParams);
        
        // Accommodation: 1000 * 3 = 3000
        expect(result.accommodation).toBe(3000);
        
        // Food: Standard = 600/person/day. Duo = 2 people. 3 days.
        // 600 * 2 * 3 = 3600
        expect(result.food).toBe(3600);
        
        // Entry Fees: (100 + 50) * 2 = 300
        expect(result.entryFees).toBe(300);
        
        // Transport: Standard = 22/km. 100km. Allowance = 300/day.
        // (100 * 22) + (3 * 300) = 2200 + 900 = 3100
        // With 8% buffer: 3100 * 1.08 = 3348
        expect(result.transport).toBe(3348);
        
        // Total: 3000 + 3600 + 300 + 3348 = 10248
        expect(result.total).toBe(10248);
    });

    it('should calculate budget expenses correctly for Solo', () => {
        const budgetParams = {
            ...baseParams,
            groupType: 'Solo',
            style: 'budget'
        };
        const result = estimateExpenses(budgetParams);
        
        // Food: Budget = 300/person/day. Solo = 1. 3 days. = 900
        expect(result.food).toBe(900);
        
        // Transport: Budget = 15/km. Allowance = 0.
        // (100 * 15) + 0 = 1500. Buffer 8%: 1500 * 1.08 = 1620
        expect(result.transport).toBe(1620);
    });

    it('should handle missing groupType by defaulting to Solo (multiplier 1)', () => {
        const result = estimateExpenses({ ...baseParams, groupType: 'Unknown' });
        // Standard food 600 * 1 * 3 = 1800
        expect(result.food).toBe(1800);
    });

    it('should handle zero entry fees', () => {
        const result = estimateExpenses({ ...baseParams, places: [] });
        expect(result.entryFees).toBe(0);
    });
});
