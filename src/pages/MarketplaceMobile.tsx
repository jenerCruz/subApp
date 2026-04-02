import React from "react";
import { FeatherHeart } from "@subframe/core";
import { FeatherHome } from "@subframe/core";
import { FeatherMenu } from "@subframe/core";
import { FeatherSearch } from "@subframe/core";
import { FeatherShoppingBag } from "@subframe/core";
import { FeatherStar } from "@subframe/core";
import { FeatherUser } from "@subframe/core";
import { Badge } from "../ui/components/Badge";
import { IconButton } from "../ui/components/IconButton";

function ProductMarketplace() {
  return (
    <div className="flex w-full items-center justify-center bg-neutral-100 h-screen font-body">
      <div className="flex max-w-[448px] grow shrink-0 basis-0 flex-col items-start self-stretch overflow-hidden bg-[#eaeaf4] shadow-[0px_25px_50px_-12px_#00000040] relative mobile:relative mobile:max-w-full">
        <div className="flex w-full items-center justify-between px-6 pt-12 pb-4">
          <IconButton
            variant="neutral-tertiary"
            icon={<FeatherMenu />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          />
          <div className="flex items-center gap-2">
            <span className="text-heading-2 font-heading-2 text-neutral-900">
              Subli
            </span>
            <span className="text-heading-2 font-heading-2 text-[#1a1c2e]">
              Market
            </span>
          </div>
          <div className="flex items-start relative">
            <IconButton
              variant="neutral-tertiary"
              icon={<FeatherShoppingBag />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            <div className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-error-500 absolute right-1 top-1 text-[10px] font-bold text-white">
              <span className="font-['Inter'] text-[10px] font-[700] leading-[15px] text-white">
                2
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-8 pt-2 pb-32 grow overflow-y-auto scrollbar-hide">
          <div className="flex w-full flex-col items-start px-6">
            <span className="text-heading-1 font-heading-1 text-neutral-900">
              Catálogo
            </span>
            <span className="text-body font-body text-neutral-500">
              Encuentra los mejores blancos
            </span>
          </div>
          <div className="flex items-center gap-3 px-6 pb-2 no-scrollbar -mx-6 overflow-x-auto">
            <div className="flex h-10 items-center justify-center rounded-full bg-[#1a1c2e] px-6 shadow-sm shrink-0 cursor-pointer text-body-bold font-body-bold text-white transition-colors hover:bg-neutral-800">
              <span className="text-body-bold font-body-bold text-white">
                Todos
              </span>
            </div>
            <div className="flex h-10 items-center justify-center rounded-full bg-white px-6 shadow-sm shrink-0 cursor-pointer text-body-bold font-body-bold text-neutral-600 transition-colors hover:bg-neutral-50">
              <span className="text-body-bold font-body-bold text-neutral-600">
                Tazas
              </span>
            </div>
            <div className="flex h-10 items-center justify-center rounded-full bg-white px-6 shadow-sm shrink-0 cursor-pointer text-body-bold font-body-bold text-neutral-600 transition-colors hover:bg-neutral-50">
              <span className="text-body-bold font-body-bold text-neutral-600">
                Textiles
              </span>
            </div>
            <div className="flex h-10 items-center justify-center rounded-full bg-white px-6 shadow-sm shrink-0 cursor-pointer text-body-bold font-body-bold text-neutral-600 transition-colors hover:bg-neutral-50">
              <span className="text-body-bold font-body-bold text-neutral-600">
                Gorras
              </span>
            </div>
            <div className="flex h-10 items-center justify-center rounded-full bg-white px-6 shadow-sm shrink-0 cursor-pointer text-body-bold font-body-bold text-neutral-600 transition-colors hover:bg-neutral-50">
              <span className="text-body-bold font-body-bold text-neutral-600">
                Termos
              </span>
            </div>
          </div>
          <div className="flex w-full items-start px-6">
            <div className="flex grow shrink-0 basis-0 flex-col items-start overflow-hidden rounded-[32px] bg-white px-5 py-5 cursor-pointer transition-shadow hover:shadow-md">
              <div className="flex h-56 w-full flex-none items-center justify-center overflow-hidden rounded-3xl bg-neutral-50 relative">
                <Badge
                  className="absolute left-4 top-4 z-10 bg-success-100 text-success-700"
                  variant="success"
                >
                  Más vendido
                </Badge>
                <img
                  className="min-w-[0px] grow shrink-0 basis-0 self-stretch object-cover mix-blend-multiply"
                  src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600"
                />
              </div>
              <div className="flex w-full flex-col items-start gap-1 mt-5">
                <span className="text-heading-3 font-heading-3 text-neutral-900">
                  Taza Blanca Premium 11oz
                </span>
                <div className="flex w-full items-center justify-between mt-1">
                  <span className="text-heading-2 font-heading-2 text-error-600">
                    $ 35.00
                  </span>
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-neutral-50 text-neutral-400 transition-colors hover:bg-error-50 hover:text-error-500">
                    <FeatherHeart className="text-body font-body text-default-font h-5 w-5" />
                  </div>
                </div>
                <span className="text-caption font-caption text-neutral-400 text-right">
                  Caja con 36 piezas
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4 px-6">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-neutral-900">
                Novedades
              </span>
              <span className="text-caption-bold font-caption-bold text-error-600 cursor-pointer hover:text-error-700">
                Ver todas
              </span>
            </div>
            <div className="w-full items-start gap-4 grid grid-cols-2">
              <div className="flex flex-col items-start overflow-hidden rounded-3xl bg-white px-3 py-3 cursor-pointer transition-shadow hover:shadow-md">
                <div className="flex h-32 w-full flex-none items-center justify-center overflow-hidden rounded-2xl bg-neutral-50 relative mb-3">
                  <div className="flex items-start rounded-full px-2 py-0.5 shadow-sm absolute right-2 top-2 z-10 bg-white/90 text-[10px] font-bold text-error-600 backdrop-blur-sm">
                    <span className="font-['Inter'] text-[10px] font-[700] leading-[15px] text-error-600">
                      15% off
                    </span>
                  </div>
                  <img
                    className="min-w-[0px] grow shrink-0 basis-0 self-stretch object-cover mix-blend-multiply"
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400"
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-0.5">
                  <span className="line-clamp-1 text-body-bold font-body-bold text-neutral-900">
                    Playera Algodón
                  </span>
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-warning-400 h-3 w-3 fill-warning-400" />
                    <span className="font-['Inter'] text-[10px] font-[500] leading-[15px] text-neutral-400">
                      4.9 (1k review)
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-body-bold font-body-bold text-error-600">
                      $ 85.00
                    </span>
                    <FeatherHeart className="text-body font-body text-neutral-900 h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start overflow-hidden rounded-3xl bg-white px-3 py-3 cursor-pointer transition-shadow hover:shadow-md">
                <div className="flex h-32 w-full flex-none items-center justify-center overflow-hidden rounded-2xl bg-neutral-50 relative mb-3">
                  <div className="flex items-start rounded-full px-2 py-0.5 shadow-sm absolute right-2 top-2 z-10 bg-white/90 text-[10px] font-bold text-brand-600 backdrop-blur-sm">
                    <span className="font-['Inter'] text-[10px] font-[700] leading-[15px] text-brand-600">
                      Nuevo
                    </span>
                  </div>
                  <img
                    className="min-w-[0px] grow shrink-0 basis-0 self-stretch object-cover mix-blend-multiply"
                    src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=400"
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-0.5">
                  <span className="line-clamp-1 text-body-bold font-body-bold text-neutral-900">
                    Gorra Trucker
                  </span>
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-warning-400 h-3 w-3 fill-warning-400" />
                    <span className="font-['Inter'] text-[10px] font-[500] leading-[15px] text-neutral-400">
                      4.7 (500 review)
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-body-bold font-body-bold text-error-600">
                      $ 32.00
                    </span>
                    <FeatherHeart className="text-body font-body text-error-500 h-4 w-4 fill-error-500" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start overflow-hidden rounded-3xl bg-white px-3 py-3 cursor-pointer transition-shadow hover:shadow-md">
                <div className="flex h-32 w-full flex-none items-center justify-center overflow-hidden rounded-2xl bg-neutral-50 relative mb-3">
                  <img
                    className="min-w-[0px] grow shrink-0 basis-0 self-stretch object-cover mix-blend-multiply"
                    src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400"
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-0.5">
                  <span className="line-clamp-1 text-body-bold font-body-bold text-neutral-900">
                    Termo Acero 20oz
                  </span>
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-warning-400 h-3 w-3 fill-warning-400" />
                    <span className="font-['Inter'] text-[10px] font-[500] leading-[15px] text-neutral-400">
                      4.8 (850 review)
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-body-bold font-body-bold text-error-600">
                      $ 115.00
                    </span>
                    <FeatherHeart className="text-body font-body text-neutral-900 h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start overflow-hidden rounded-3xl bg-white px-3 py-3 cursor-pointer transition-shadow hover:shadow-md">
                <div className="flex h-32 w-full flex-none items-center justify-center overflow-hidden rounded-2xl bg-neutral-50 relative mb-3">
                  <img
                    className="min-w-[0px] grow shrink-0 basis-0 self-stretch object-cover mix-blend-multiply"
                    src="https://images.unsplash.com/photo-1597484661643-2f5fef640df1?auto=format&fit=crop&q=80&w=400"
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-0.5">
                  <span className="line-clamp-1 text-body-bold font-body-bold text-neutral-900">
                    Tote Bag Canvas
                  </span>
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-warning-400 h-3 w-3 fill-warning-400" />
                    <span className="font-['Inter'] text-[10px] font-[500] leading-[15px] text-neutral-400">
                      4.6 (320 review)
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-body-bold font-body-bold text-error-600">
                      $ 42.00
                    </span>
                    <FeatherHeart className="text-body font-body text-neutral-900 h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-20 w-full flex-none rounded-t-[32px] bg-white px-6 pb-2 shadow-[0px_-10px_40px_-10px_#0000000d] absolute bottom-0 left-0 z-50 items-center justify-around">
          <div className="flex flex-col items-center justify-center px-2 py-2 cursor-pointer text-neutral-900 transition-colors">
            <FeatherHome className="text-body font-body text-neutral-900 h-6 w-6 fill-neutral-900" />
          </div>
          <div className="flex flex-col items-center justify-center px-2 py-2 cursor-pointer text-neutral-400 transition-colors hover:text-neutral-900">
            <FeatherSearch className="text-body font-body text-default-font h-6 w-6" />
          </div>
          <div className="flex flex-col items-center justify-center px-2 py-2 cursor-pointer text-neutral-400 transition-colors hover:text-neutral-900">
            <FeatherHeart className="text-body font-body text-default-font h-6 w-6" />
          </div>
          <div className="flex flex-col items-center justify-center px-2 py-2 cursor-pointer text-neutral-400 transition-colors hover:text-neutral-900">
            <FeatherUser className="text-body font-body text-default-font h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductMarketplace;
