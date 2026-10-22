import { redirect } from 'next/navigation';

export default function GuestPostPage() {
  redirect('/submit-post');
}
