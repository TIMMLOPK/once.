import Image from "next/image";
import Icon from "../../components/avatar";
import Title from "../../components/title";

import AlipayHK from "../../public/shop/alipayhk.png";
import FPS from "../../public/shop/fps.svg";
import Payme from "../../public/shop/payme.png";

const Payment = ({ icon, text }) => {
  return (
    <div className="flex items-center p-4">
      <span className="mr-4 flex h-10 w-10 items-center justify-center">
        <Image
          src={icon}
          alt={text}
          width={35}
          height={35}
          className="rounded-full"
        />
      </span>
      <p className="text-md font-semibold">{text}</p>
    </div>
  );
};

const Shop = () => {
  return (
    <main className="m-auto max-w-4xl p-6 md:px-20">
      <section>
        <div className="py-8 md:flex md:space-x-10">
          <div className="mt-8 flex items-center justify-center md:mt-0">
            <Icon src="/shop/icon.webp" />
          </div>
          <section className="ml-1 mt-8">
            <h1 className="my-7 font-serif text-4xl">@murasaki_jpstore</h1>
            <p className="max-w-10 dark:text-neutral-300">
              日本代購🤍💙
              <br />
              出團 6-62算 運費平分
              <br />
              買voice 58~6算(少量) 62算
              <br />
              代購/中古 62-75算
            </p>
          </section>
        </div>
      </section>
      <section>
        <div className="py-14">
          <Title>代購須知</Title>
          <h4 className="mb-4 text-xl">收費</h4>
          <div className="max-w-10 dark:text-zinc-300">
            <p className="mb-4">
              (商品日元價格連稅＋日本國内運費(如有))*(本店匯率)+(手續費)+(國際運費)
            </p>
            <p className="mb-4">
              本月匯率=0.067-0.075(視乎商品日元價格，每月匯率調整)
            </p>
            <div className="my-6">
              <p className="mt-4 text-xl font-semibold dark:text-zinc-200">
                商品日元價格連稅
              </p>
              <ul className="space-y-2 py-2">
                <li>5000日元，手續費=$10</li>
                <li>5000-10000日元，手續費=$0</li>
                <li>10000日元，手續費=$0</li>
              </ul>
            </div>
          </div>
          <div className="max-w-10 mt-4 space-y-3 dark:text-zinc-300">
            <p>
              商品日元價格連稅5000日元,會隨金額提供更優惠的收費匯率，歡迎查詢
            </p>
            <p>以上價格計算以未包含日本國内運費作準</p>
            <p>客人需提供商品網上link/商品名稱</p>
            <p>如商品需在指定時間搶購則以匯率0.1收費</p>
            <p>(本店有專業搶購經驗，15秒內售罄的商品都可搶購，不成功不收費)</p>
          </div>
        </div>
      </section>
      <section>
        <div className="my-5 grid grid-cols-1 gap-2">
          <Title>付款方式</Title>
          <p className="mb-4 dark:text-zinc-300">過數後請傳送永久保存截圖</p>
          <Payment icon={AlipayHK} text="Alipayhk" />
          <Payment icon={Payme} text="PayMe" />
          <Payment icon={FPS} text="FPS" />
        </div>
      </section>
      <section>
        <div className="place-items-center py-14">
          <Title>交收方式</Title>
          <div className="flex-col space-y-4">
            <p className="text-xl font-semibold">1.面交</p>
            <ul className="list-inside list-disc space-y-4 dark:text-zinc-300">
              <li>請與店主約時間</li>
              <li>主要在太子,旺角,油麻地,尖沙咀站</li>
              <li>客服中心位置(閘內/閘外皆可)</li>
              <li>
                ⚠ 如因個人問題無法交收，最遲於1hr前通知，否則下次交收可能有罰款
              </li>
            </ul>
          </div>
          <div className="mt-6 flex flex-col space-y-4">
            <p className="text-xl font-semibold">2.順豐到付</p>
            <ul className="list-inside list-disc space-y-4 dark:text-zinc-300">
              <li>請提供名字,電話,地址/順豐網點代碼</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="place-items-center py-14">
          <Title>運送時效</Title>
          <div className="text-md flex flex-col space-y-4 dark:text-zinc-300">
            <p>貨物運到日本倉後,於一至兩個禮拜內空運到港</p>
            <p>部分網站規管較嚴, 可能要先寄日本地址再轉運日本倉</p>
            <p>運到日本地址後,於兩至三個禮拜內到港</p>
            <p>
              航空禁運品如香水也可以代購,
              只可以行海運,需時21天或以上(試過一個多月)
            </p>
            <p>上述時效為最近抵港需時數據, 抵港時間可能因運輸等情況而延遲</p>
          </div>
        </div>
      </section>
      <section>
        <div className="place-items-center py-14">
          <Title>風險披露</Title>
          <div className="text-md flex flex-col space-y-4 dark:text-zinc-300">
            <p>所有運輸風險(如日運,國際空運,順豐)均由顧客承擔</p>
            <p>-如貨物在運送途中有任何損壞,本店恕不負責</p>
            <p>-易碎品本店會盡力妥善包裝,亦可應顧客要求重新包裝</p>
            <p>
              -香水等空運禁運品雖可海運
              (由日本出口),但仍有一定風險會被香港海關扣留
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="inline-flex items-center justify-center">
          <div className="flex h-10 w-10 flex-col space-y-4">
            <Image
              src="/shop/icon.webp"
              className="rounded-full"
              alt="murasaki_jpstore"
              width={100}
              height={100}
            />
          </div>
          <h1 className="ml-2 text-xl dark:text-zinc-300">
            : 祝各位:購物,追星/追V愉快~
          </h1>
        </div>
      </section>
      <footer className="mt-8 flex items-center justify-center">
        <div className="flex flex-col text-center">
          <p className="text-sm text-zinc-600">
            All reserved by @murasaki_jpstore
          </p>
          <p className="mt-2 text-sm text-zinc-400">Powered by once</p>
        </div>
      </footer>
    </main>
  );
};

export default Shop;
