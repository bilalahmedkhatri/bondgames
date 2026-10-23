import type { PartnerPageContent } from '@/lib/types';

export const pressPage: PartnerPageContent = {
  path: '/press',
  title: 'Press & Review Codes',
  description: 'Contact GamerGrid about game announcements, press materials, review access, hardware samples and embargo details. Read what to include in a press enquiry.',
  introduction: 'A guide for developers, publishers and public-relations teams who want to share a gaming announcement or discuss review access. Send enough context for the editorial team to assess the relevance of your request.',
  sections: [
    {
      id: 'announcements', title: 'Announcements & press materials',
      paragraphs: ['Share the main news, the intended announcement date and a public source that confirms the details. Explain what has changed and why it matters to players.'],
      items: ['Game or product name, developer or publisher, supported platforms and target regions.', 'A concise summary of the announcement, with an official website or press-kit URL.', 'Release timing, pricing and availability only where these details are confirmed.', 'A contact name and reply address for follow-up questions.'],
    },
    {
      id: 'review-access', title: 'Review codes & preview access',
      paragraphs: ['Contact the team before sending access credentials or arranging a physical shipment. Describe the access you can offer and any restrictions so the editor can assess the proposal.'],
      items: ['The platform, access region and whether the build is a preview, early-access release or final version.', 'When access becomes available, how long it lasts and any online services needed to evaluate it.', 'Known build limitations, unavailable features or planned updates relevant to coverage.', 'The proposed method for arranging review access after the team responds.'],
    },
    {
      id: 'embargoes', title: 'Embargoes & coverage timing',
      paragraphs: ['State any proposed embargo date, exact time and timezone in your initial enquiry. Identify which materials it covers, such as screenshots, gameplay footage, impressions or a full review.', 'An embargo or other condition must be explicitly agreed before access is accepted. Sending a message does not establish an agreement, a publication date or a promise of coverage.'],
    },
    {
      id: 'hardware-samples', title: 'Hardware samples & testing',
      paragraphs: ['For hardware enquiries, identify the exact model and configuration, the region where the sample is available and whether it is a loan or a supplied review unit. Agree delivery, return arrangements and any costs before shipping.', 'Include the specifications and supporting documentation needed to evaluate the product. Performance claims should identify their source; manufacturer figures are not a substitute for independent measurements.'],
    },
    {
      id: 'independence', title: 'Editorial independence',
      paragraphs: ['Providing a code, access or a sample does not guarantee coverage, a positive review, a score or an outgoing link. Editorial decisions remain separate from advertising and sponsorship discussions.', 'Commercial relationships and supplied review access should be disclosed where relevant. For a paid campaign, use the separate Advertise With Us page rather than presenting the proposal as an independent review request.'],
    },
    {
      id: 'send-enquiry', title: 'Send a press enquiry',
      paragraphs: ['Use the contact form with the Press department selected. Add a short subject line and include the announcement, official links, proposed access and any timing conditions in the message.', 'For an error in an existing article, include its URL and the specific statement that needs checking. Coverage requests and correction requests are reviewed on their own evidence; no response deadline is guaranteed.'],
    },
  ],
  contact: {
    title: 'Contact the press desk', description: 'Open the contact form with Press preselected to send your announcement or review-access enquiry.',
    label: 'Open press contact form', href: '/contact?dept=Press#contact-form',
  },
};
