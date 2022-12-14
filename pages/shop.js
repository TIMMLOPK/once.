import Image from "next/image";

const Payment = ({ icon, text }) => {
  return (
    <div className="flex items-center p-4">
      <span className="flex justify-center items-center w-10 h-10 mr-4">
        <Image
          src={icon}
          alt={text}
          width={50}
          height={50}
          className="rounded-full"
        />
      </span>
      <p className="text-md font-semibold">{text}</p>
    </div>
  );
};

const Shop = () => {
  return (
    <main className="m-auto max-w-4xl md:px-20 p-6">
      <section>
        <div className="inline-block py-8 md:flex md:space-x-10">
          <div className="flex flex-col items-center justify-center mt-8">
            <Image
              src="https://lionceu-timmlopk.vercel.app/shopicon.jpg"
              alt="murasaki_jpstore"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
          <section className="ml-1 mt-8">
            <h1 className="text-4xl my-7 font-serif">@murasaki_jpstore</h1>
            <p className="max-w-10 dark:text-neutral-300">
              æ¥æ¬ä»£è³¼ð¤ð
              <br />
              åºå 6-62ç® éè²»å¹³å
              <br />
              è²·voice 58~6ç®(å°é) 62ç®
              <br />
              ä»£è³¼/ä¸­å¤ 62-75ç®
            </p>
          </section>
        </div>
      </section>
      <section>
        <div className="py-14">
          <h1 className="text-3xl mb-8">ä»£è³¼é ç¥</h1>
          <h4 className="text-xl mb-4">æ¶è²»</h4>
          <div className="max-w-10 dark:text-zinc-300">
            <p className="mb-4">
              (ååæ¥åå¹æ ¼é£ç¨ï¼æ¥æ¬ååéè²»(å¦æ))*(æ¬åºå¯ç)+(æçºè²»)+(åééè²»)
            </p>
            <p className="mb-4">
              æ¬æå¯ç=0.058-0.065(è¦ä¹ååæ¥åå¹æ ¼ï¼æ¯æå¯çèª¿æ´)
            </p>
            <div className="my-6">
              <p className="mt-4 text-xl font-semibold dark:text-zinc-200">
                ååæ¥åå¹æ ¼é£ç¨
              </p>
              <ul className="py-2 space-y-2">
                <li>5000æ¥åï¼æçºè²»=$10</li>
                <li>5000-10000æ¥åï¼æçºè²»=$0</li>
                <li>10000æ¥åï¼æçºè²»=$0</li>
              </ul>
            </div>
          </div>
          <div className="max-w-10 dark:text-zinc-300 mt-4 space-y-3">
            <p>
              ååæ¥åå¹æ ¼é£ç¨5000æ¥å,æé¨éé¡æä¾æ´åªæ çæ¶è²»å¯çï¼æ­¡è¿æ¥è©¢
            </p>
            <p>ä»¥ä¸å¹æ ¼è¨ç®ä»¥æªåå«æ¥æ¬ååéè²»ä½æº</p>
            <p>å®¢äººéæä¾ååç¶²ä¸link/åååç¨±</p>
            <p>å¦ååéå¨æå®æéæ¶è³¼åä»¥å¯ç0.1æ¶è²»</p>
            <p>(æ¬åºæå°æ¥­æ¶è³¼ç¶é©ï¼15ç§å§å®ç½çååé½å¯æ¶è³¼ï¼ä¸æåä¸æ¶è²»)</p>
          </div>
        </div>
      </section>
      <section>
        <div className="grid gap-2 grid-cols-1 my-5">
          <h1 className="text-4xl mt-6 dark:text-white">ä»æ¬¾æ¹å¼</h1>
          <p className="mb-4 dark:text-zinc-300">éæ¸å¾è«å³éæ°¸ä¹ä¿å­æªå</p>
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
          <h1 className="text-3xl mb-8">äº¤æ¶æ¹å¼</h1>
          <div className="flex-col space-y-4">
            <p className="text-xl font-semibold">1.é¢äº¤</p>
            <ul className="list-disc list-inside space-y-4 dark:text-zinc-300">
              <li>è«èåºä¸»ç´æé</li>
              <li>ä¸»è¦å¨å¤ªå­,æºè§,æ²¹éº»å°,å°æ²åç«</li>
              <li>å®¢æä¸­å¿ä½ç½®(éå§/éå¤çå¯)</li>
              <li>
                â  å¦å åäººåé¡ç¡æ³äº¤æ¶ï¼æé²æ¼1hråéç¥ï¼å¦åä¸æ¬¡äº¤æ¶å¯è½æç½°æ¬¾
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4 mt-6">
            <p className="text-xl font-semibold">2.é è±å°ä»</p>
            <ul className="list-disc list-inside space-y-4 dark:text-zinc-300">
              <li>è«æä¾åå­,é»è©±,å°å/é è±ç¶²é»ä»£ç¢¼</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="py-14 place-items-center">
          <h1 className="text-3xl mb-8">ééææ</h1>
          <div className="flex flex-col space-y-4 text-md dark:text-zinc-300">
            <p>è²¨ç©éå°æ¥æ¬åå¾,æ¼ä¸è³å©åç¦®æå§ç©ºéå°æ¸¯</p>
            <p>é¨åç¶²ç«è¦ç®¡è¼å´, å¯è½è¦åå¯æ¥æ¬å°ååè½éæ¥æ¬å</p>
            <p>éå°æ¥æ¬å°åå¾,æ¼å©è³ä¸åç¦®æå§å°æ¸¯</p>
            <p>
              èªç©ºç¦éåå¦é¦æ°´ä¹å¯ä»¥ä»£è³¼,
              åªå¯ä»¥è¡æµ·é,éæ21å¤©æä»¥ä¸(è©¦éä¸åå¤æ)
            </p>
            <p>ä¸è¿°ææçºæè¿æµæ¸¯éææ¸æ, æµæ¸¯æéå¯è½å éè¼¸ç­ææ³èå»¶é²</p>
          </div>
        </div>
      </section>
      <section>
        <div className="py-14 place-items-center">
          <h1 className="text-3xl mb-8">é¢¨éªæ«é²</h1>
          <div className="flex flex-col space-y-4 text-md dark:text-zinc-300">
            <p>ææéè¼¸é¢¨éª(å¦æ¥é,åéç©ºé,é è±)åç±é¡§å®¢æ¿æ</p>
            <p>-å¦è²¨ç©å¨éééä¸­æä»»ä½æå£,æ¬åºæä¸è² è²¬</p>
            <p>-æç¢åæ¬åºæç¡åå¦¥ååè£,äº¦å¯æé¡§å®¢è¦æ±éæ°åè£</p>
            <p>
              -é¦æ°´ç­ç©ºéç¦éåéå¯æµ·é
              (ç±æ¥æ¬åºå£),ä½ä»æä¸å®é¢¨éªæè¢«é¦æ¸¯æµ·éæ£ç
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="inline-flex items-center justify-center">
          <div className="flex flex-col space-y-4 w-10 h-10">
            <Image
              src="https://lionceu-timmlopk.vercel.app/shopicon.jpg"
              className="rounded-full"
              alt="murasaki_jpstore"
              width={100}
              height={100}
            />
          </div>
          <h1 className="text-xl ml-2 dark:text-zinc-300">
            : ç¥åä½:è³¼ç©,è¿½æ/è¿½Væå¿«~
          </h1>
        </div>
      </section>
      <footer className="flex items-center justify-center mt-8">
        <div className="flex flex-col text-center">
          <p className="text-md text-zinc-200">
            All reserved by @murasaki_jpstore
          </p>
          <p className="text-md text-zinc-400 mt-2">Powered by once</p>
        </div>
      </footer>
    </main>
  );
};

export default Shop;
