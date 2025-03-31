import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="mt-10 flex items center justify-center h-screen">
          <SignUp />
    </div>
  )
}