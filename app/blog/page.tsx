import { BlogIndex, blogIndexMetadata } from '../_components/BlogIndex';

export const metadata = blogIndexMetadata('en');

export default function Page() {
  return <BlogIndex lang="en" />;
}
