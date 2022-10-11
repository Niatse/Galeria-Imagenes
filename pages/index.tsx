import Image from 'next/image';
import {useState} from 'react';
import {createClient} from '@supabase/supabase-js';
import Head from 'next/head'

export async function getStaticProps() {
  
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )

  const { data } = await supabaseAdmin.from('images').select('*').order('id')
  return {
    props: {
      images: data,
    },
  }
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Image = {
  id: number
  href: string
  imageSrc: string
  auto: string
  username: string
}

export default function Gallery({images}: {images: Image[]}){
  return (
        <html lang="es">
    <><Head>
      <title>Cars Uruguay</title>

      <meta
        name="description" content="Lugar donde podras publicar y ver fotos de autos vistos en Uruguay" />
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="Autos,Uruguay,Autos Uruguay,BMW,VOLKSWAGEN,FIAT,FERRARI,PORSCHE,CORVETTE,MCLAREN" />
      <meta name="robots" content="index" />

      
      
    </Head><><div className="bg-white-py-12"></div><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center">

        <h1 className="mt-2 text-3xl text-center font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          Cars Uruguay
        </h1>
        <p className="mt-3 text-center max-w-2l text-xl text-gray-500 lg:mx-auto">
          ¡Un lugar donde puedes publicar fotos propias de autos vistos en Uruguay!
        </p>
      </div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {images.map((image) => (
            <BlurImage key={image.id} image={image} />
          ))}
        </div>
        <p className="mt-3 text-center font-bold max-w-2l text-xl text-gray-900 lg:mx-auto">
          Contactame para publicar tu auto!
        </p>
        <a
          href="mailto:gameerseba@gmail.com"
          className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
        >
          Enviar Correo
        </a>
      </div></div></></>    
</html>
  )
}

function BlurImage({image}: {image: Image}){
  const [isLoading, setLoading] = useState(true);
  return(
    <a href={image.href} className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
        alt=""
        src={image.imageSrc}
        layout="fill"
        objectFit="cover"
        className={cn(
          'group-hover:opacity-75 duration-700 ease-in-out',
          isLoading
          ? 'grayscale blur-2xl scale-110'
          : 'grayscale-0 blur-0 scale-100'
        )}
        onLoadingComplete={()  => setLoading(false)}
        />
      </div>
      
      <h2 className="mt-4 text-sm text-gray-700">{image.auto}</h2>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.username}</p>
    </a>
  )
}