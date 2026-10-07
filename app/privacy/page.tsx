import type { Metadata } from 'next';
import { LegalPage } from '../_components/LegalPage';
import { site } from '@/site.config';

// Starter policy for a content site with analytics and ads. Review it for each
// site (and whenever you add a tracking or ad tag); it is not legal advice.
export const metadata: Metadata = { title: `Privacy Policy | ${site.name}` };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="2026-10-07">
      <p>
        This policy explains what information {site.name} ({site.url}) collects when you read the site and how it
        is used. We publish articles; we do not ask you to create an account or submit personal details to read them.
      </p>
      <h2>What we collect</h2>
      <p>
        Like most websites, we collect standard usage data through analytics tools: pages viewed, approximate location
        (country or city), device and browser type, and how you arrived at the site. This data is aggregated and used
        to understand which articles are useful.
      </p>
      <h2>Cookies and advertising</h2>
      <p>
        Analytics and advertising partners, such as Google, may set cookies or use similar technology to measure visits
        and, where ads are shown, to serve and measure ads. Google&apos;s use of advertising cookies lets it and its
        partners serve ads based on your visits to this and other sites. You can manage ad personalization in your
        Google account settings and control cookies in your browser.
      </p>
      <h2>Links to other sites</h2>
      <p>
        Articles link to other websites, including our own products. Those sites have their own privacy policies, which
        apply once you leave this one.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
