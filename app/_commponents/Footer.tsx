'use client'
import { useUser } from '@clerk/nextjs';

export default function Footer() {
  const {user} = useUser();
  return user && (
    <div>Footer</div>
  )
}
