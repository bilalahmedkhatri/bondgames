import { GuestPostSubmission, AdInquiry, ContactMessage } from '../types';
import { runNeonQuery } from './neon';

let guestPostsStore: GuestPostSubmission[] = [
  {
    id: 'gp-1',
    title: 'The Future of Neural Rendering and Frame Generation in AAA Engines',
    draftUrl: 'https://docs.google.com/document/d/sample-guest-post-1',
    authorName: 'Elena Rostova',
    authorEmail: 'elena@rendertech.io',
    authorBio: 'Graphics engineer and technical writer covering neural rendering pipelines.',
    packageType: 'Featured Editorial ($50)',
    paymentMethod: 'Credit Card / Stripe',
    status: 'Approved',
    createdAt: '2026-10-20T10:00:00Z'
  }
];

let adInquiriesStore: AdInquiry[] = [
  {
    id: 'ad-1',
    companyName: 'Corsair Gaming',
    contactName: 'Mark Sterling',
    email: 'm.sterling@corsair.com',
    budgetRange: '$5,000 - $10,000',
    campaignObjective: 'Display Banners & Sponsored Hardware Review',
    message: 'Seeking homepage takeover banner and dedicated hardware benchmark review for upcoming mechanical keyboard lineup.',
    createdAt: '2026-10-21T09:00:00Z'
  }
];

let contactMessagesStore: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Julian Vance',
    email: 'julian@prgaming.com',
    subject: 'Review Code Request: Indie Metroidvania',
    department: 'Press',
    message: 'Hi editorial team, we would love to provide early PC Steam review keys for our upcoming title next month.',
    createdAt: '2026-10-21T16:30:00Z'
  }
];

// Guest Posts CRUD
export async function submitGuestPost(
  data: Omit<GuestPostSubmission, 'id' | 'status' | 'createdAt'>
): Promise<GuestPostSubmission> {
  const item: GuestPostSubmission = {
    ...data,
    id: 'gp-' + Date.now(),
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  await runNeonQuery(
    `INSERT INTO guest_posts (id, title, draft_url, author_name, author_email, author_bio, package_type, payment_method, status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      item.id,
      item.title,
      item.draftUrl,
      item.authorName,
      item.authorEmail,
      item.authorBio,
      item.packageType,
      item.paymentMethod,
      item.status,
      item.createdAt
    ]
  );

  guestPostsStore.unshift(item);
  return item;
}

export async function getGuestPosts(): Promise<GuestPostSubmission[]> {
  const neonResults = await runNeonQuery<any>('SELECT * FROM guest_posts ORDER BY created_at DESC');
  if (neonResults && neonResults.length > 0) {
    return neonResults.map(r => ({
      id: r.id,
      title: r.title,
      draftUrl: r.draft_url,
      authorName: r.author_name,
      authorEmail: r.author_email,
      authorBio: r.author_bio,
      packageType: r.package_type,
      paymentMethod: r.payment_method,
      status: r.status,
      createdAt: r.created_at
    }));
  }
  return guestPostsStore;
}

// Advertising Inquiries CRUD
export async function submitAdInquiry(
  data: Omit<AdInquiry, 'id' | 'createdAt'>
): Promise<AdInquiry> {
  const item: AdInquiry = {
    ...data,
    id: 'ad-' + Date.now(),
    createdAt: new Date().toISOString()
  };

  await runNeonQuery(
    `INSERT INTO ad_inquiries (id, company_name, contact_name, email, budget_range, campaign_objective, message, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      item.id,
      item.companyName,
      item.contactName,
      item.email,
      item.budgetRange,
      item.campaignObjective,
      item.message,
      item.createdAt
    ]
  );

  adInquiriesStore.unshift(item);
  return item;
}

export async function getAdInquiries(): Promise<AdInquiry[]> {
  const neonResults = await runNeonQuery<any>('SELECT * FROM ad_inquiries ORDER BY created_at DESC');
  if (neonResults && neonResults.length > 0) {
    return neonResults.map(r => ({
      id: r.id,
      companyName: r.company_name,
      contactName: r.contact_name,
      email: r.email,
      budgetRange: r.budget_range,
      campaignObjective: r.campaign_objective,
      message: r.message,
      createdAt: r.created_at
    }));
  }
  return adInquiriesStore;
}

// Contact Messages CRUD
export async function submitContactMessage(
  data: Omit<ContactMessage, 'id' | 'createdAt'>
): Promise<ContactMessage> {
  const item: ContactMessage = {
    ...data,
    id: 'msg-' + Date.now(),
    createdAt: new Date().toISOString()
  };

  await runNeonQuery(
    `INSERT INTO contact_messages (id, name, email, subject, department, message, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      item.id,
      item.name,
      item.email,
      item.subject,
      item.department,
      item.message,
      item.createdAt
    ]
  );

  contactMessagesStore.unshift(item);
  return item;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const neonResults = await runNeonQuery<any>('SELECT * FROM contact_messages ORDER BY created_at DESC');
  if (neonResults && neonResults.length > 0) {
    return neonResults.map(r => ({
      id: r.id,
      name: r.name,
      email: r.email,
      subject: r.subject,
      department: r.department,
      message: r.message,
      createdAt: r.created_at
    }));
  }
  return contactMessagesStore;
}
