// Category definitions with icons and accent colors for NGO triage
// Keeping this config in a separate file ensures maintainability and clarity

export const ISSUE_CATEGORIES = [
  { value: 'general', label: 'General Medical', icon: '🩺', color: '#6c63ff' },
  { value: 'emergency', label: 'Emergency / Critical Care', icon: '🚨', color: '#e53935' },
  { value: 'mental_health', label: 'Mental Health & Emotional Support', icon: '🧠', color: '#2196f3' },
  { value: 'womens_health', label: 'Women’s Health', icon: '♀️', color: '#e91e63' },
  { value: 'child_elderly', label: 'Child & Elderly Care', icon: '👶👴', color: '#ffb300' },
  { value: 'chronic', label: 'Chronic Illness Support', icon: '♾️', color: '#8bc34a' },
  { value: 'disability', label: 'Disability Assistance', icon: '♿', color: '#607d8b' },
  { value: 'medication', label: 'Medication / Treatment Guidance', icon: '💊', color: '#00bcd4' },
  { value: 'financial', label: 'Financial / Aid Assistance', icon: '💰', color: '#43a047' },
  { value: 'other', label: 'Other / Not Sure', icon: '❓', color: '#bdbdbd' }
];

// Helper to get category details by value
export function getCategoryDetails(value) {
  return ISSUE_CATEGORIES.find(cat => cat.value === value) || ISSUE_CATEGORIES[0];
}
