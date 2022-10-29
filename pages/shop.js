const Payment = ({ icon, text }) => {
  return (
    <div className="flex items-center p-4">
      <img
        src={icon}
        alt={text}
        className="flex justify-center items-center w-10 h-10 mr-3 rounded-full transition"
      />
      <p className="text-md font-semibold">{text}</p>
    </div>
  );
};

const Shop = () => {
  return (
    <main className="m-auto p-6 max-w-4xl md:p-10 md:px-20">
      <section>
        <div className="inline-block space-evenly py-8 md:flex">
          <img
            className="inline-block rounded-full md:m-12 md:mt-14 mt-8 w-[172px] h-[172px]"
            src="https://lionceu-timmlopk.vercel.app/shopicon.jpg"
            width={172}
            height={172}
            alt="murasaki_jpstore"
          />
          <section className="ml-1 mt-8">
            <h1 className="text-4xl font-semibold my-7">@murasaki_jpstore</h1>
            <p className="max-w-10 dark:text-zinc-300">
              日本代購🤍💙
              <br />
              出團 7-75算 運費平分
              <br />
              買voice 68~7算(少量) 72算
              <br />
              代購/中古 7-75算
            </p>
          </section>
        </div>
      </section>
      <section>
        <div className="py-14">
          <h1 className="text-3xl mb-8">代購須知</h1>
          <h4 className="text-xl mb-4">收費</h4>
          <div className="max-w-10 dark:text-zinc-300">
            <p className="mb-4">
              (商品日元價格連稅＋日本國内運費(如有))*(本店匯率)+(手續費)+(國際運費)
            </p>
            <p className="mb-4">
              本月匯率=0.07-0.075(視乎商品日元價格，每月匯率調整)
            </p>
            商品日元價格連稅
            <ul className="ml-4 py-2">
              <li className="mb-4">5000日元，手續費=$10</li>
              <li className="mb-4">5000-10000日元，手續費=$0</li>
              <li className="mb-4">10000日元，手續費=$0</li>
            </ul>
          </div>
          <div className="max-w-10 dark:text-zinc-300">
            <ul className="list-disc ml-4 list-outside py-2">
              <li className="mb-4">
                商品日元價格連稅5000日元,會隨金額提供更優惠的收費匯率，歡迎查詢
              </li>
              <li className="mb-4">以上價格計算以未包含日本國内運費作準</li>
              <li className="mb-4">客人需提供商品網上link/商品名稱</li>
              <li className="mb-4">如商品需在指定時間搶購則以匯率0.1收費</li>
              <li className="mb-4">
                (本店有專業搶購經驗，15秒內售罄的商品都可搶購，不成功不收費)
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="grid gap-2 grid-cols-1 my-5">
          <h1 className="text-4xl my-6 dark:text-white">付款方式</h1>
          <p>過數後請傳送永久保存截圖</p>
          <Payment icon="/alipayhk.png" text="Alipayhk" />
          <Payment
            icon="https://lionceu-timmlopk.vercel.app/shop/payme.svg"
            text="PayMe"
          />
          <Payment
            icon="https://lionceu-timmlopk.vercel.app/shop/fps.svg"
            text="FPS"
          />
        </div>
      </section>
      <section>
        <div className="py-14 place-items-center">
          <h1 className="text-3xl mb-8">交收方式</h1>
          <div className="flex-col space-y-4">
            <p className="text-xl font-semibold">1.面交</p>
            <ul className="list-disc list-inside">
              <li className="mb-4">請與店主約時間</li>
              <li className="mb-4">主要在太子,旺角,油麻地,尖沙咀站</li>
              <li className="mb-4">客服中心位置(閘內/閘外皆可)</li>
              <li className="mb-4">
                ⚠ 如因個人問題無法交收，最遲於1hr前通知，否則下次交收可能有罰款
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="text-xl font-semibold">2.順豐到付</p>
            <ul className="list-disc list-inside">
              <li className="mb-4">請提供名字,電話,地址/順豐網點代碼</li>
              <li className="mb-4">
                順豐網點目前只提供自寄自取, 不能上門送貨,詳情請參考:
              </li>
              <li className="mb-4">
                順境疫境 與您同行｜網點自寄自取 取件零接觸
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="py-14 place-items-center">
          <h1 className="text-3xl mb-8">運送時效</h1>
          <div className="flex flex-col space-y-4 text-md">
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
        <div className="py-14 place-items-center">
          <h1 className="text-3xl mb-8">風險披露</h1>
          <div className="flex flex-col space-y-4 text-md">
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
          <img
            src="https://lionceu-timmlopk.vercel.app/shopicon.jpg"
            className="w-10 h-10 rounded-full"
            alt="murasaki_jpstore"
          />
          <h1 className="text-xl ml-4">:祝各位:購物,追星/追V愉快~</h1>
        </div>
      </section>
      <footer className="flex items-center justify-center mt-8">
        <p className="text-sm text-zinc-200">
          All reserved by @murasaki_jpstore
        </p>
        <p className="text-sm ml-3 text-zinc-400">Powered by once</p>
      </footer>
    </main>
  );
};

export default Shop;
