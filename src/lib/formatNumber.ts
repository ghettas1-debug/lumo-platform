// Utility function to format numbers consistently for SSR/CSR
export function formatNumber(num: number): string {
  // Always use English locale for consistent formatting between server and client
  return num.toLocaleString('en-US');
}

// Alternative: Simple manual formatting to avoid locale issues
export function formatNumberSimple(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Format currency consistently
export function formatCurrency(amount: number, currency: string = 'SAR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'SAR' ? 'SAR' : 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Format percentage consistently
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value / 100);
}
