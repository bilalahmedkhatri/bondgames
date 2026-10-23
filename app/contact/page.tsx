import { ContactPageContent } from '@/components/ContactPageContent';
import { resolveContactDepartment } from '@/lib/contact-departments';

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ dept?: string | string[] }> }) {
  const { dept } = await searchParams;
  const department = resolveContactDepartment(dept);
  return <ContactPageContent key={department} initialDepartment={department} />;
}
