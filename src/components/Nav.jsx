'use client'

import Link from 'next/link'
import { auth } from '@/utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SvgAddPost, SvgHome, SvgHomeUser } from './assets/SvgOptions'
import Image from 'next/image'
import Logo from '../../public/logo-app.png'

export default function Nav () {
  const [user] = useAuthState(auth)
  return (
    <nav className='mx-4 md:mx-0'>
      <div className='h-12 md:h-16 mx-auto flex items-center justify-between'>
        <Link translate='no' href='/' className='flex items-center gap-x-1.5'>
          <Image
            width={32}
            height={32}
            src={Logo}
            alt='Logo'
            priority
          />
          <p className='text-transparent md:font-bold md:text-2xl md:text-violet-400'>
            Posting
          </p>
        </Link>

        {user && (
          <Link href='/' className='p-1.5 bg-white bg-opacity-10 rounded-md'>
            <SvgHome className='w-5 h-5 text-neutral-200' />
          </Link>
        )}

        <ul className='text-neutral-200'>
          <li className='flex items-center gap-x-2.5'>
            {user
              ? (
                <div className='flex items-center gap-x-2.5'>
                  <Link href='/home' className='p-1.5 bg-white bg-opacity-10 rounded-md'>
                    <SvgHomeUser className='w-5 h-5' />
                  </Link>

                  <Link href='/post' className='p-1.5 bg-white bg-opacity-10 rounded-md'>
                    <SvgAddPost className='w-5 h-5' />
                  </Link>

                  <Link href='/profile'>
                    <Image
                      className='rounded-full object-contain'
                      width={30}
                      height={30}
                      src={user.photoURL}
                      alt='avatar'
                      priority
                    />
                  </Link>
                </div>
                )
              : (
                <>
                  <Link href='/about' className='text-sm font-medium underline underline-offset-4 decoration-cyan-400'>
                    Acerca de!
                  </Link>
                  <Link href='/login' className='text-sm font-medium underline underline-offset-4 decoration-cyan-400'>
                    Login
                  </Link>
                </>
                )}
          </li>
        </ul>

      </div>
    </nav>
  )
}
