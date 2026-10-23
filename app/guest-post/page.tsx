import { permanentRedirect } from 'next/navigation';

export default function GuestPostPage() {
  permanentRedirect('/submit-post');
}
