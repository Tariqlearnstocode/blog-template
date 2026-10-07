import { BlogIndex, blogIndexMetadata } from '../../_components/BlogIndex';

export const metadata = blogIndexMetadata('es');

export default function Page() {
  return <BlogIndex lang="es" />;
}
