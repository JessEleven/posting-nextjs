import UserPosts from '@/components/UserPosts'

export default function HomePage () {
  return (
    <div>
      <p className='my-4 text-neutral-200 text-center font-bold text-lg'>Mis publicaciones</p>

      <UserPosts />
    </div>
  )
}
