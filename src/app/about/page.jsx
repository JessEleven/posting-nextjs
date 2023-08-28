export default function AboutPage () {
  return (
    <div className='mt-4 rounded-lg text-neutral-200 bg-violet-800 bg-opacity-20 mx-4 md:mx-0 p-5'>
      <p className='text-center font-bold text-lg'>Acerca del sitio (*_*)</p>
      <p className='text-sm 2xl:text-base text-justify mt-2 dark:text-slate-300 text-black'>
        Esta aplicación fue desarrollada en el Framework de {' '}
        <span className='underline underline-offset-4 decoration-cyan-400 text-cyan-400 font-semibold'>
          Next.js 13
        </span>
        {' '} usando el App Router y como DB <span className='underline underline-offset-4 decoration-cyan-400 text-cyan-400 font-semibold'>Firebase</span> {' '}
        y finalmente se deplego en el sitio de {' '}
        <span className='underline underline-offset-4 decoration-cyan-400 text-cyan-400 font-semibold'>
          Vercel
        </span> {' '}
        🚀🚀🚀
      </p>
    </div>
  )
}
