import type { Metadata } from 'next';
import { LegalPage } from '../_components/LegalPage';
import { site } from '@/site.config';

// Starter terms for a content site. Review for each site; not legal advice.
export const metadata: Metadata = { title: `Terms of Use | ${site.name}` };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="2026-10-07">
      <p>
        By using {site.name} ({site.url}) you agree to these terms. If you do not agree, please do not use the site.
      </p>
      <h2>Content</h2>
      <p>
        Articles are for general information. They are written carefully but may be incomplete or out of date, and they
        are not professional advice for your specific situation. Use your own judgment before acting on them.
      </p>
      <h2>Ownership</h2>
      <p>
        The articles, design, and branding on this site belong to {site.legalName}. You may share links and short
        quotes with attribution; please do not republish whole articles without permission.
      </p>
      <h2>Links</h2>
      <p>We link to other websites for convenience and are not responsible for their content or practices.</p>
      <h2>Liability</h2>
      <p>
        The site is provided as is. To the extent the law allows, {site.legalName} is not liable for losses arising
        from your use of it.
      </p>
      <h2>Contact</h2>
      <p>
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
      </p>
    </LegalPage>
  );
}
