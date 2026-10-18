const LEADS_KEY = 'crm_leads';
const AUTH_KEY = 'crm_auth';
const CRM_EVENT = 'crm-updated';

export const CRM_PASSWORD = import.meta.env.VITE_CRM_PASSWORD || 'admin123';

export const LEAD_STATUSES = [
  'new',
  'contacted',
  'viewing',
  'negotiation',
  'completed',
  'lost',
];

export const LEAD_PRIORITIES = ['low', 'medium', 'high'];

export const LEAD_SOURCES = [
  'website',
  'whatsapp',
  'instagram',
  'referral',
  'manual',
];

export const AGENTS = [
  { id: 'alex', name: 'Alexander Volkov' },
  { id: 'dmitry', name: 'Dmitry Sokolov' },
  { id: 'michael', name: 'Michael Chen' },
];

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function normalizeStatus(status) {
  if (status === 'inProgress') return 'contacted';
  if (LEAD_STATUSES.includes(status)) return status;
  return 'new';
}

function migrateLead(lead) {
  return {
    id: lead.id || generateId(),
    name: lead.name || '',
    email: lead.email || '',
    phone: lead.phone || '',
    property: lead.property || '',
    propertyTitle: lead.propertyTitle || '',
    message: lead.message || '',
    status: normalizeStatus(lead.status),
    source: lead.source || 'website',
    assignedTo: lead.assignedTo || '',
    priority: lead.priority || 'medium',
    budget: lead.budget || '',
    language: lead.language || 'en',
    notes: Array.isArray(lead.notes) ? lead.notes : [],
    createdAt: lead.createdAt || new Date().toISOString(),
    updatedAt: lead.updatedAt || lead.createdAt || new Date().toISOString(),
  };
}

function notify() {
  window.dispatchEvent(new CustomEvent(CRM_EVENT));
}

export function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function login(password) {
  if (password === CRM_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function subscribe(listener) {
  const handler = () => listener();
  window.addEventListener(CRM_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(CRM_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

export function getLeads() {
  try {
    const raw = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]');
    return raw.map(migrateLead);
  } catch {
    return [];
  }
}

function persistLeads(leads) {
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  notify();
}

export function createLead(data) {
  const now = new Date().toISOString();
  const lead = migrateLead({
    ...data,
    id: generateId(),
    status: data.status || 'new',
    source: data.source || 'website',
    createdAt: now,
    updatedAt: now,
    notes: [],
  });
  const leads = getLeads();
  leads.push(lead);
  persistLeads(leads);
  return lead;
}

export function updateLead(id, updates) {
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  leads[index] = migrateLead({
    ...leads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  });
  persistLeads(leads);
  return leads[index];
}

export function deleteLead(id) {
  const leads = getLeads().filter((l) => l.id !== id);
  persistLeads(leads);
}

export function addNote(leadId, text, author = 'Manager') {
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === leadId);
  if (index === -1) return null;

  const note = {
    id: generateId(),
    text: text.trim(),
    author,
    createdAt: new Date().toISOString(),
  };

  leads[index].notes = [...(leads[index].notes || []), note];
  leads[index].updatedAt = new Date().toISOString();
  persistLeads(leads);
  return note;
}

export function getLeadStats(leads = getLeads()) {
  const total = leads.length;
  const byStatus = LEAD_STATUSES.reduce((acc, status) => {
    acc[status] = leads.filter((l) => l.status === status).length;
    return acc;
  }, {});

  const completed = byStatus.completed || 0;
  const conversionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    ...byStatus,
    conversionRate,
    active: total - (byStatus.completed || 0) - (byStatus.lost || 0),
  };
}

export function exportLeadsCSV(leads = getLeads()) {
  const headers = [
    'Name',
    'Email',
    'Phone',
    'Property',
    'Message',
    'Status',
    'Source',
    'Assigned To',
    'Priority',
    'Budget',
    'Date',
    'Language',
  ];

  const rows = leads.map((l) => [
    l.name,
    l.email,
    l.phone,
    l.propertyTitle || l.property || '',
    l.message || '',
    l.status,
    l.source,
    l.assignedTo,
    l.priority,
    l.budget || '',
    l.createdAt,
    l.language,
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell || '').replace(/"/g, '""')}"`).join(',')
    )
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `archipelago_leads_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function getAgentName(agentId) {
  return AGENTS.find((a) => a.id === agentId)?.name || '';
}
