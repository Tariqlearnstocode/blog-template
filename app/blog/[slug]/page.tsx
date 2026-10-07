import { BlogPost, blogPostMetadata, blogPostParams } from '../../_components/BlogPost';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPostParams('en');
}

export async function generateMetadata({ params }: Props) {
  return blogPostMetadata('en', (await params).slug);
}

export default async function Page({ params }: Props) {
  return <BlogPost lang="en" slug={(await params).slug} />;
}
