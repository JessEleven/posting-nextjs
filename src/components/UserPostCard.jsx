import Image from 'next/image'

export default function UserPostCard ({ children, username, avatar, createdAt, description }) {
  return (
    <div className='bg-[#303030] text-neutral-200 p-4 rounded-lg mb-5 mx-4 md:mx-0'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2.5'>
          <Image
            className='rounded-full'
            width={30}
            height={30}
            src={avatar}
            alt='avatar'
            priority
          />
          <p className='text-base font-medium'>{username}</p>
        </div>
        <div className='flex items-center gap-x-1.5'>
          <p className='text-sm pt-[1px] text-neutral-200 font-medium'>26/8/2023</p>
          {children}
        </div>
      </div>
      <div className='mt-2.5'>
        <p className='break-all text-sm font-medium'>{description}</p>
      </div>
    </div>
  )
}
