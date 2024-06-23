import Image from "next/image";
import { Carousel } from "flowbite-react";
import { MdOutlineChair } from "react-icons/md";
import { IoLayersOutline } from "react-icons/io5";
import { FaRegThumbsUp } from "react-icons/fa";
import { BsTools } from "react-icons/bs";
import Link from "next/link";

export default async function Home() {

  return (
    <main>
      <div className="h-56 md:h-[560px]">
        <Carousel>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img src="slide_1.jpg" />
          </div>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img src="slide_2.jpg" />
          </div>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img src="slide_3.png" />
          </div>
          <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img src="slide_4.jpg" />
          </div>
        </Carousel>
      </div>


      <div className="mt-16 mb-[96px]">

        <div className="text-center">
          <div className="font-semibold text-sm">FURNITURE COLLECTION</div>
          <div className="mt-2 opacity-[3%] hidden md:block font-bold text-7xl">MARKETPLACE</div>
          <div className="font-semibold text-2xl md:-mt-[52px]">Recommendation Categories</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mt-10 px-20">
          <div>
            <Link href="marketplace?keyword=&category=ACCESSORIES&type=&sort=">
              <Image
                src="/categories/ACCESSORIES.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Accessories</div>
            </Link>
          </div>

          <div>
            <Link href="marketplace?keyword=&category=ALMARI&type=&sort=">
              <Image
                src="/categories/ALMARI.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Almari</div>
            </Link>
          </div>

          <div>
            <Link href="marketplace?keyword=&category=BED&type=&sort=">
              <Image
                src="/categories/BED.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Bed</div>
            </Link>
          </div>

          {/* <div>
            <Link href="marketplace?keyword=&category=BUFFET&type=&sort=">
              <Image
                src="/categories/BUFFET.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Buffet</div>
            </Link>
          </div> */}

          <div>
            <Link href="marketplace?keyword=&category=CHAIR&type=&sort=">
              <Image
                src="/categories/CHAIR.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Chair</div>
            </Link>
          </div>

          <div>
            <Link href="marketplace?keyword=&category=FIREPLACE&type=&sort=">
              <Image
                src="/categories/FIREPLACE.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Fireplace</div>
            </Link>
          </div>

          <div>
            <Link href="marketplace?keyword=&category=SOFA&type=&sort=">
              <Image
                src="/categories/SOFA.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Sofa</div>
            </Link>
          </div>

          <div>
            <Link href="marketplace?keyword=&category=MEJA&type=&sort=">
              <Image
                src="/categories/MEJA.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Meja</div>
            </Link>
          </div>

          <div>
            <Link href="marketplace?keyword=&category=MIRROR&type=&sort=">
              <Image
                src="/categories/MIRROR.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Mirror</div>
            </Link>
          </div>

          <div>
            <Link href="marketplace?keyword=&category=NIGHTSTAND&type=&sort=">
              <Image
                src="/categories/NIGHTSTAND.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Nightstand</div>
            </Link>
          </div>

          <div>
            <Link href="marketplace?keyword=&category=OTHER&type=&sort=">
              <Image
                src="/categories/OTHER.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Other</div>
            </Link>
          </div>

          <div>
            <Link href="marketplace?keyword=&category=RACK&type=&sort=">
              <Image
                src="/categories/RACK.jpg"
                width={0}
                height={0}
                alt=""
                className="w-full h-auto"
                sizes="100vw"

              />
              <div className="text-center mt-3 font-semibold text-xl">Rack</div>
            </Link>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-2 bg-black text-white pb-10">
        <div className="">
          <Image
            src="/home_1.jpg"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-md"
            alt=""
          />
        </div>

        <div className="p-10">
          <div className="font-bold text-2xl md:text-5xl mt-10 ">OUR LOCATION</div>
          <div className="text-stone-400 text-lg md:text-3xl font-light mt-2">STORE LOCATION</div>
          <div className="border-b-2 border-b-emerald-600 w-1/12 mt-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2">

            <div className="text-wrap py-6 pr-7">
              <div className="font-bold"><span className="text-emerald-600 mr-2">1.</span>Lifetime Experience Center</div>
              <div className="text-stone-400 text-sm mt-3">
                Jl. Pangeran Antasari No.70, RW.8, Cilandak Bar., Kec. Cilandak,
                Kota Jakarta Selatan,
                Daerah Khusus Ibukota Jakarta 12430.
              </div>
              <div className="mt-6">
                <span className="border-2 border-stone-400 hover:border-white p-2 cursor-pointer">Visit Us</span>
              </div>
            </div>
            
            <div className="text-wrap py-6 pr-7">
              <div className="font-bold"><span className="text-emerald-600 mr-2">2.</span>Lifetime Design Serpong</div>
              <div className="text-stone-400 text-sm mt-3">
                Ruko Moscow Square A.10, Jl. Gading Serpong Boulevard, West Pakulonan, Kelapa Dua, Tangerang Banten, 15811.
              </div>
              <div className="mt-6">
                <span className="border-2 border-stone-400 hover:border-white p-2 cursor-pointer">Visit Us</span>
              </div>
            </div>

            <div className="text-wrap py-6 pr-7">
              <div className="font-bold"><span className="text-emerald-600 mr-2">3.</span>Lifetime Design Bandung</div>
              <div className="text-stone-400 text-sm mt-3">
                Paskal Hypersquare D2, Jl. Pasirkaliki no. 25-27, Kebon Jeruk, Andir, Bandung City, Jawa Barat, 40181.
              </div>
              <div className="mt-6">
                <span className="border-2 border-stone-400 hover:border-white p-2 cursor-pointer">Visit Us</span>
              </div>
            </div>

            <div className="text-wrap py-6 pr-7">
              <div className="font-bold"><span className="text-emerald-600 mr-2">4.</span>Lifetime Design Jepara</div>
              <div className="text-stone-400 text-sm mt-3">
                Jepara, Jawa Tengah, 12345.
              </div>
              <div className="mt-6">
                <span className="border-2 border-stone-400 hover:border-white p-2 cursor-pointer">Visit Us</span>
              </div>
            </div>

          </div>

          <div className="border-b-2 border-b-emerald-600 w-1/12 mt-6"></div>

          <div className="text-stone-400 text-lg md:text-3xl font-light mt-6">COMPANY OFFICE</div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="text-wrap py-6 pr-7">
              <div className="font-bold"><span className="text-emerald-600 mr-2">1.</span>Haery Building</div>
              <div className="text-stone-400 text-sm mt-3">
                Jl. Kemang Sel. Raya No.151, RT.4/RW.4, Cilandak Tim., Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12560.
              </div>
              <div className="mt-6">
                <span className="border-2 border-stone-400 hover:border-white p-2 cursor-pointer">Visit Us</span>
              </div>
            </div>

            <div className="text-wrap py-6 pr-7">
              <div className="font-bold"><span className="text-emerald-600 mr-2">2.</span>Lifetime Design Office Tower</div>
              <div className="text-stone-400 text-sm mt-3">
                Jl. Kemang Timur No.25, RT.7/RW.4, Bangka, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730.
              </div>
              <div className="mt-6">
                <span className="border-2 border-stone-400 hover:border-white p-2 cursor-pointer">Visit Us</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-[url('/home_1_cropped.png')] bg-cover bg-no-repeat h-[1200px] md:h-[700px]">
        <div className="text-center mt-10">
          <div className="font-semibold text-sm">SOMETHING ABOUT US</div>
          <div className="mt-2 opacity-[3%] hidden md:block font-bold text-7xl">MARKETPLACE</div>
          <div className="font-semibold text-2xl md:-mt-[52px]">Interesting Facts</div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-10 px-10 md:px-32">

          <div className="text-center items-center">
            <div className="grid justify-items-center text-7xl"><MdOutlineChair /></div>
            <div className="font-bold text-lg">MATERIAL</div>
            <div className="font-light text-gray-700 text-sm mt-3">Our furniture is manufactured with the finest materials that goes hand in hand with elegant details.</div>
          </div>

          <div className="text-center items-center">
            <div className="grid justify-items-center text-7xl"><IoLayersOutline /></div>
            <div className="font-bold text-lg">FINISHING</div>
            <div className="font-light text-gray-700 text-sm mt-3">We specialized in washed luxury  finish and is available in matte and high gloss textures.</div>
          </div>

          <div className="text-center items-center">
            <div className="grid justify-items-center text-7xl"><FaRegThumbsUp /></div>
            <div className="font-bold text-lg">QUALITY</div>
            <div className="font-light text-gray-700 text-sm mt-3">We prioritise controlling our quality, and we provide end to end service delivering a complete solution from beginning to end.</div>
          </div>

          <div className="text-center items-center">
            <div className="grid justify-items-center text-7xl"><BsTools /></div>
            <div className="font-bold text-lg">EXCLUSIVE</div>
            <div className="font-light text-gray-700 text-sm mt-3">Our pieces of furniture are limited. each piece are unique and exclusive, along with with warranty, assisted refurbish and replenishment service & more.</div>
          </div>

        </div>
      </div>

    </main>
  );
}
