import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';

type MetadataProps = {
  params: Promise<{ id: string }>;
};

type NotesProps = {
  params: {
    id: string
  }
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const title = `Note: ${note.title}`;
  const description = note.content.slice(0, 30);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/${id}`,
      images: [
        {
          url: 'https://09-auth-five-nu.vercel.app/notehub-og-meta.jpg',
          alt: 'NoteHub – modern note-taking app',
          width: 1200,
          height: 630
        }
      ]
    }
  };
}

export default async function Notes({params}: NotesProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={params.id}/>
    </HydrationBoundary>
  );
}
