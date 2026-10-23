import type { PartnerPageContent } from '@/lib/types';

export const mediaKitPage: PartnerPageContent = {
  path: '/media-kit',
  title: 'Media Kit & Audience Information',
  description: 'Explore GamerGrid coverage, audience interests, campaign formats and media planning requirements. Request verified audience data for your campaign.',
  introduction: 'Plan a gaming campaign with a clear view of our coverage, available partnership discussions and the information needed for a proposal. This media kit helps you prepare a brief before requesting a quote.',
  sections: [
    {
      id: 'coverage', title: 'What GamerGrid covers',
      paragraphs: ['GamerGrid publishes gaming news, game features, hardware comparisons and store offers. Our coverage spans PC, PlayStation, Xbox and Nintendo gaming.'],
      items: ['Game announcements, industry developments and practical player guides.', 'PC hardware, system requirements and performance topics.', 'Gaming offers, community discussions and contributor perspectives.'],
    },
    {
      id: 'audience', title: 'Audience & demographics',
      paragraphs: ['Our subject matter is aimed at players researching games, PC builders comparing hardware and readers following the gaming industry. These are editorial audience interests, not measured demographic segments.', 'Verified audience totals, country breakdowns, age ranges and engagement reports are not published in this media kit. Campaign forecasts require current, verified reporting. Ask which analytics can be supplied before making a booking.'],
      items: ['Request the reporting period and measurement source for any audience figure.', 'Confirm whether a figure represents users, sessions, pageviews or an estimate.', 'Agree the audience location and placement context relevant to your campaign.'],
    },
    {
      id: 'formats', title: 'Campaign formats to discuss',
      paragraphs: ['Availability and pricing are confirmed individually. A proposed format is not a booked placement until its scope, dates and terms have been agreed.'],
      items: ['Clearly labelled sponsored articles that provide useful gaming or hardware information.', 'Display placements with dimensions, device coverage and duration agreed in advance.', 'Relevant product launches or partner features with a clear advertising disclosure.', 'Supporting social or newsletter distribution only where a channel and schedule have been confirmed.'],
    },
    {
      id: 'creative-brief', title: 'Creative & campaign brief',
      paragraphs: ['Send enough detail for the team to assess relevance and practical requirements. Final creative specifications depend on the placement.'],
      items: ['Your company, product, landing page and the goal of the campaign.', 'Preferred dates, budget range, target locations and device priorities.', 'Proposed copy, image formats, dimensions and file sizes where available.', 'Rights to use the artwork, logos and supplied material, plus any required disclosures.', 'Tracking requirements and the reporting you need to evaluate the campaign.'],
    },
    {
      id: 'measurement', title: 'Measurement & editorial boundaries',
      paragraphs: ['Agree reporting definitions, tracking links and any permitted measurement tools before launch. Forecasts should identify their source and assumptions; they are not guarantees of clicks, sales or search visibility.', 'A sponsorship does not purchase a favourable verdict or editorial control. Paid placements need a visible label, and paid links must be qualified as sponsored.'],
    },
  ],
  contact: { title: 'Request a campaign proposal', description: 'Use the existing advertising enquiry form to share your brief and ask for current availability, creative specifications and any verified audience reports.', label: 'Contact advertising', href: '/advertise' },
};

export const editorialGuidelinesPage: PartnerPageContent = {
  path: '/editorial-guidelines',
  title: 'Editorial Guidelines',
  description: 'Read GamerGrid standards for sourcing, original reporting, game reviews, hardware benchmarks, corrections and clear sponsorship disclosures.',
  introduction: 'These standards explain how contributors should research, write and check gaming coverage. They apply to news, features, reviews and hardware articles, including commissioned and sponsored submissions.',
  sections: [
    {
      id: 'independence', title: 'Editorial independence',
      paragraphs: ['Coverage should serve the reader. Advertisers, affiliates and the companies whose products are covered must not determine review scores, conclusions or which material facts are included.', 'Disclose employment, consulting relationships, investments, sponsored travel, review samples and any other connection that could affect how readers interpret an article. Receiving a sample does not promise coverage or a positive recommendation.'],
    },
    {
      id: 'sources', title: 'Sources & verification',
      paragraphs: ['Check factual claims against reliable evidence and link to the original source where possible. Separate confirmed information from reporting, opinion, estimates and rumours.'],
      items: ['For announcements, check the publisher, developer or platform source and its publication date.', 'Attribute quotations accurately, preserve their context and explain any material limitations.', 'Label leaks and unconfirmed reports; do not present a rumour as an official release date or specification.', 'Keep source notes so claims can be checked during editing or after a correction request.'],
    },
    {
      id: 'reviews', title: 'Game reviews & scoring',
      paragraphs: ['A scored review should be based on actual play and explain the experience behind the verdict. Identify the reviewed platform, relevant build or patch, access provided by a publisher and any limitations that materially affect the assessment.', 'Distinguish a preview, hands-on impression and full review. Do not assign an upcoming game a completed-review verdict based on trailers or marketing material. A score is an editorial assessment, not a promise that every reader will have the same experience.'],
    },
    {
      id: 'benchmarks', title: 'Hardware testing & benchmarks',
      paragraphs: ['Performance claims need a reproducible method. Identify the hardware, driver version, software build, settings, resolution and measurement method. Explain the test conditions and the limits of the result.'],
      items: ['Distinguish measured results from manufacturer claims and third-party measurements.', 'Label estimates and illustrative data clearly; they must not be described as verified lab results.', 'Explain repeated runs, aggregation and unusual results where they affect the comparison.', 'Use images and charts you created or have permission to publish, with relevant attribution.'],
    },
    {
      id: 'originality', title: 'Originality & writing tools',
      paragraphs: ['Submit original work and identify any material that has appeared elsewhere. Plagiarism, fabricated experience, invented quotations and unsupported measurements are not acceptable.', 'Authors remain responsible for accuracy when using research or writing tools. Check every source, quotation and factual claim; automated output does not establish first-hand testing or permission to reuse material.'],
    },
    {
      id: 'commercial-disclosures', title: 'Sponsored & affiliate content',
      paragraphs: ['Sponsored articles must be visibly labelled. A commercial relationship does not justify hiding drawbacks or changing a conclusion. Paid links need a sponsored attribute, and affiliate relationships should be disclosed close to the relevant recommendation.', 'Editorial links should help readers understand or verify the article. Remove unrelated promotional links and disclose a contributor relationship with a linked company.'],
    },
    {
      id: 'corrections', title: 'Corrections & updates',
      paragraphs: ['If a material error is identified, review the supporting evidence and correct the affected claim. Significant corrections should explain what changed. Update dates should reflect an actual revision rather than make unchanged coverage appear new.', 'When requesting a correction, include the article URL, the disputed statement and a reliable source or clear explanation. Do not send confidential information that is unnecessary for checking the issue.'],
    },
  ],
  contact: { title: 'Raise an editorial question', description: 'Send a correction request or a question about these standards to the editorial team through the contact page. For a new article idea, read the separate Write for Us guide.', label: 'Contact editorial', href: '/contact' },
};

export const affiliatePolicyPage: PartnerPageContent = {
  path: '/affiliate-policy',
  title: 'Affiliate Policy',
  description: 'Understand GamerGrid affiliate disclosures, purchase links, editorial independence, retailer pricing and how to report a missing disclosure.',
  introduction: 'This policy explains how commercial purchase links should be presented on GamerGrid and how those relationships are kept separate from editorial decisions. A link to a retailer is not, by itself, evidence of an affiliate agreement.',
  sections: [
    {
      id: 'affiliate-links', title: 'What an affiliate link means',
      paragraphs: ['An affiliate link can allow a retailer or partner to attribute a purchase or another qualifying action to a referral. If an active agreement applies, the publisher may receive a commission under that programme.', 'Not every store link on GamerGrid is monetised. This page does not assert membership of any particular retailer programme. The disclosure accompanying the relevant article or offer should explain the relationship that actually applies.'],
    },
    {
      id: 'disclosures', title: 'Where disclosures belong',
      paragraphs: ['Readers should be able to identify a commercial recommendation before acting on it. An affiliate disclosure belongs near the relevant recommendations or purchase links, rather than relying only on a link to this policy.'],
      items: ['Use plain language explaining that qualifying purchases may earn a commission.', 'Qualify paid or affiliate links with the sponsored attribute where a commercial relationship applies.', 'Label paid articles separately from ordinary editorial content; an affiliate disclosure is not a substitute for a sponsorship label.', 'Do not mark an ordinary source link as a paid endorsement when there is no such relationship.'],
    },
    {
      id: 'independence', title: 'Recommendations & editorial independence',
      paragraphs: ['Commission availability should not determine a review score, remove a material drawback or turn an untested claim into a recommendation. A product should earn coverage on the relevance and evidence available to the editor.', 'Affiliate arrangements, sponsored placements and review samples are different relationships. Each should be disclosed as appropriate so readers understand the context of an article.'],
    },
    {
      id: 'prices', title: 'Prices, availability & purchases',
      paragraphs: ['Offers, stock, regional availability and retailer terms can change. Check the final price, currency, delivery conditions and product details on the retailer website before buying.', 'The retailer handles checkout, billing, fulfilment and returns under its own terms. A listed offer does not guarantee that a price or discount will still be available when you follow the link.'],
    },
    {
      id: 'tracking', title: 'Referral tracking & privacy',
      paragraphs: ['A retailer or affiliate network may use referral parameters, cookies or other attribution methods when a monetised link is used. The exact method depends on the programme and the services involved.', 'Review the destination service privacy and cookie information before making a purchase. This policy does not claim that any particular tracking technology or affiliate network is currently active on GamerGrid.'],
    },
    {
      id: 'questions', title: 'Report a link or disclosure issue',
      paragraphs: ['If a link appears broken, a listed offer has expired or a commercial disclosure seems unclear, send the article URL and the link or statement involved. Include the retailer and region if that helps explain the problem.', 'Questions about an order, payment or refund should go directly to the retailer that processed the transaction.'],
    },
  ],
  contact: { title: 'Ask about a disclosure', description: 'Contact the team about affiliate-link labelling or an offer on the site. Please include the relevant page URL so the issue can be checked.', label: 'Contact the team', href: '/contact' },
};
