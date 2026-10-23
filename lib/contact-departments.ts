import type { ContactMessage } from '@/lib/types';

const departments: ContactMessage['department'][] = ['General', 'Press', 'Tech Bug', 'Advertising'];

export function resolveContactDepartment(value: string | string[] | undefined): ContactMessage['department'] {
  const requested = Array.isArray(value) ? value[0] : value;
  return departments.find(department => department.toLowerCase() === requested?.toLowerCase()) ?? 'General';
}
