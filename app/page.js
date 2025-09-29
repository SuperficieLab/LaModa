'use client'

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const prize = [
    {
        coupon: '<span class="text-[24vw] leading-[20vw] md:text-8xl md:leading-24">10%</span><span class="text-[14vw] md:text-4xl md:leading-8 md:pb-10 pb-2">OFF</span>',
        code: 'MELISSA'
    },
    {
        coupon: '<span class="text-[24vw] leading-[20vw] md:text-8xl md:leading-24">5%</span><span class="text-[14vw] md:text-4xl md:leading-8 md:pb-10 pb-2">OFF</span>',
        code: 'MELISSA'
    },
    {
        coupon: '<span class="text-[13vw] leading-[8vw] md:text-5xl md:leading-6 text-center md:pb-6 pb-4">Frete grátis*</span><span class="text-[4.5vw] leading-5 md:text-lg md:leading-5.5 md:pb-6 pb-1 px-10 text-center">*Para compras com estoque da loja ou site. Não válido para pedidos de outros canais.</span>',
        code: 'MELISSA'
    },
]

const wallpapers = ['wallpaper-01.png', 'wallpaper-02.png', 'wallpaper-03.png', 'wallpaper-04.png']

export default function Roleta(){
      return (
        <Suspense fallback={<div></div>}>
          <Prize/>
        </Suspense>
      );
}

function Prize(){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const code = searchParams.get("code");

    const router = useRouter();
    const [index, setIndex] = useState(2);
    const [openResult, setOpenResult] = useState(false);
    const [openWallpaper, setOpenWallpaper] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loadedImages, setLoadedImages] = useState(null);
    const [isMounted, setIsMounted] = useState(null);
    const wheel = useRef(null);
    const result = useRef(null);
    const noPrize = useRef(null);
    const botao = useRef(null);


      useEffect(() => {
    const imagesToPreload = [
      '/images/icons/roleta.svg',
      '/images/icons/roleta-bg.svg',
      '/images/icons/seta-roleta.svg',
      '/images/icons/seta-roleta-bg.svg',
    ];

    const preloadImages = imagesToPreload.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setLoadedImages((prevCount) => prevCount + 1);
          resolve();
        };
        img.onerror = reject;
      });
    });

    Promise.all(preloadImages)
      .then(() => setIsMounted(true))
      .catch((error) => console.error("Error loading images:", error));


    if (code) {
        const decoded = atob(code);
        if( decoded == "wallpaper"){
            setOpenWallpaper(true);
        } else {
            setOpenResult(true);
            setIndex(atob(code));
        }
    }

  }, []);

    const handlePrize = () => {
        if (!openResult) {
                const r = Math.random();
                if (r < 0.5) {
                    wheel.current.classList.add('rotate-1440');
                    setOpenResult(true);
                    setIndex(0);
                } else if (r < 1){
                    wheel.current.classList.add('rotate-1710');
                    setOpenResult(true);
                    setIndex(1);
                } else if (r < 1.5){
                    wheel.current.classList.add('rotate-1620');
                    setOpenResult(true);
                    setIndex(0);
                } else {
                    wheel.current.classList.add('rotate-1530');
                    setOpenWallpaper(true);
                }
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prize[index].code);
            alert('Cupom copiado!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    useEffect(() => {
        if(openResult) {
            if (code) {
                result.current.classList.replace('hidden', 'grid');
            } else {
                const params = new URLSearchParams(searchParams.toString());
                params.set('code', btoa(index.toString()));
                //router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                setTimeout(() => {
                    result.current.classList.replace('hidden', 'grid');
                }, 2500);
            }
        }
    }, [openResult]);

        useEffect(() => {
        if(openWallpaper) {
            if (code) {
                noPrize.current.classList.replace('hidden', 'grid');
            } else {
                const params = new URLSearchParams(searchParams.toString());
                params.set('code', encodeURIComponent(btoa('wallpaper')));
                //router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                setTimeout(() => {
                    noPrize.current.classList.replace('hidden', 'grid');
                }, 2500);
            }
        }
    }, [openWallpaper]);

    const handleDownload = () => {
        setTimeout(() => {
            router.push(`/end?id=${encodeURIComponent(id)}`);
        }, 2000);
    }

    return(
        <div className="h-full w-full bg-blue grid grid-rows-7 px-5 relative grid-cols-1">
            <div className="row-start-2 justify-center items-center row-span-1 flex flex-col text-white font-vag-rounded">
                <span className="text-[5vw] md:text-lg leading-5">VAMOS DESCOBRIR O SEU PRÊMIO?</span>
                <span className="text-[5vw] md:text-lg">Gire a roleta e garanta o seu!</span>
            </div>
            <div className="row-start-3 row-end-6 h-full w-full relative flex flex-col justify-center items-center">
                {isMounted && <div className="h-full w-full relative flex flex-col justify-center items-center">
                    <img src="/images/icons/roleta-bg.svg" className="h-[85%] aspect-square rounded-full shadow-3xl">
                    </img>
                    <img ref={wheel} src="/images/icons/roleta.svg" className="transition-all ease-[cubic-bezier(0.3,0.1,0.4,1)] duration-1700 h-[82%] absolute z-10 top-1/2 left-1/2 -translate-1/2">
                    </img>
                    <img src="/images/icons/seta-roleta-bg.svg" className="h-[15%] absolute z-0 top-0 left-1/2 -translate-x-1/2">
                    </img>
                </div>}
                <img src="/images/icons/seta-roleta.svg" className="h-[18%] absolute z-10 top-[0.5vh] left-1/2 -translate-x-1/2"></img>
            </div>
            <div className="row-start-6 row-end-7 w-full flex flex-row gap-4 items-center justify-center">
            <button disabled={openResult || openWallpaper ? true : false} ref={botao} onClick={handlePrize} className="w-1/2 max-w-72 cursor-pointer py-4 h-fit col-start-2 col-end-4 rounded-xl self-center text-[6vw] md:text-2xl text-center text-white bg-pink border-2 shadow-3xl border-wine-pink font-vag-rounded active:bg-dark-pink disabled:bg-dark-pink">
                Girar roleta
            </button>
        </div>
        <div ref={result} className="absolute z-10 bg-blue h-full w-full hidden grid-rows-7 px-5">
            <div className="flex flex-col justify-center items-center row-start-2 row-end-3">
                <div className="flex flex-row justify-center items-center gap-4">
                    <img src="/images/icons/star.svg" className="h-1/2"></img>
                    <span className="font-vag-rounded text-white text-[8vw] md:text-2xl">VOCÊ GANHOU</span>
                    <img src="/images/icons/heart.svg" className="h-1/2"></img>
                </div>
                <div className="text-[4.5vw] font-vag-rounded text-white leading-5 md:text-xl md:leading-5.5 md:pb-6 pb-1 px-10 text-center">Tire uma captura da tela e <br></br>guarde seu cupom!</div>
            </div>
            <div className="row-start-3 row-end-6 h-full w-full relative">
                <img src="/images/icons/coupon.svg" className="h-full w-full row-span-3"></img>
                <div className="font-vag-rounded text-white absolute z-20 row-start-1 row-end-2 top-0 left-0 w-full h-full grid grid-rows-3 gap-0">
                    <div className="row-start-1 row-end-2 justify-center items-end flex flex-row">
                        <div className="bg-wine-pink py-1.5 tracking-wider text-2xl mb-[2.5vh] md:mb-[2.5vh] rounded-full px-4 flex flex-row justify-center items-center gap-2">
                            {prize[index].code}
                            <button onClick={handleCopy} className="cursor-pointer rounded-full h-9 w-fit flex flex-row justify-center items-center">
                                <img src="/images/icons/copy-icon 1.svg" className="h-3/5"></img>
                            </button>
                        </div>
                    </div>
                    <div className="row-start-2 row-end-4 justify-center items-center flex flex-col" dangerouslySetInnerHTML={{__html: prize[index].coupon}}></div>
                </div>
            </div>
            <div className="row-start-6 row-end-7 w-full flex flex-row gap-x-4 gap-y-0 items-center justify-center">
            </div>
        </div>
        <div ref={noPrize} className="absolute top-0 left-0 z-10 bg-blue h-full w-full hidden grid-rows-7 grid-cols-1">
            <div className="row-start-2 row-span-1 text-center text-white w-full px-5 font-vag-rounded text-[10vw] md:text-3xl leading-10">
                Uau, você ganhou um mimo!
            </div>
            <div className="row-start-3 row-end-6 flex flex-col gap-3 w-full">
            </div>
            <div className="row-start-6 row-end-7 w-full flex flex-row gap-4 items-center justify-center px-5">
            </div>
        </div>
        </div>
    )
}