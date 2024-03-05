import { For, Show, createEffect, onMount } from "solid-js"
import { createMutable } from "solid-js/store"
import lunisolar from 'lunisolar'
import maleImg from './assets/male@2x.png'
import femaleImg from './assets/female@2x.png'
import otherImg from './assets/other@2x.png'
import goldImg from './assets/gold.pic.jpg'
import woodImg from './assets/wood.pic.jpg'
import waterImg from './assets/water.pic.jpg'
import fireImg from './assets/fire.pic.jpg'
import landImg from './assets/land.pic.jpg'
// import downImg from './assets/down@2x.png'
import arrowbackImg from './assets/back@2x.png'

const state = createMutable({
    isLoading: false,
    gender: 'male',
    birthTime: '',
    lunli: {},
    result: '',
    isShowLunli: false,
    isShowDatetime: false,
    width1: window.innerWidth,
})
const genderImg = () => ({
    male: maleImg,
    female: femaleImg,
    other: otherImg,
})[state.gender]

const resultObj = () => ({
    '': { text: '', img: '' },
    '金': { text: 'Gold', img: goldImg },
    '木': { text: 'Wood', img: woodImg },
    '水': { text: 'Water', img: waterImg },
    '火': { text: 'Fire', img: fireImg },
    '土': { text: 'Earth', img: landImg },
})[state.result]

function onSelectGender() {
    if (state.gender === 'male') {
        state.gender = 'female'
    } else if (state.gender === 'female') {
        state.gender = 'other'
    } else {
        state.gender = 'male'
    }
}
// function onSelectBirthtime(e: any) {
//     state.birthTime = e.target.value
// }

function calc() {
    if (!state.gender) {
        alert('please select gender')
        return
    }
    if (!state.birthTime) {
        alert('please select birthday and time')
        return
    }
    state.isLoading = true
    state.result = ''
    const rndTime = 300 + Math.random() * 700
    setTimeout(() => {
        // state.result = ['gold', 'wood', 'water', 'fire', 'land'][Math.floor(Math.random() * 5)]

        // var datetime = new Date(state.birthTime);
        // var year = datetime.getFullYear();
        // var month = datetime.getMonth() + 1; // 月份从0开始，需要加1
        // var day = datetime.getDate();
        // var hour = datetime.getHours();

        // const { hourWuXing } = calculateWuXing(year, month, day, hour)
        // console.log({ hourWuXing })
        // state.result = hourWuXing

        const lun = lunisolar(new Date(state.birthTime))
        state.lunli = {
            luna: lun.lunar,
            char8: lun.char8.toString(),
            e5: lun.char8.day.stem.e5.name,
            width1: state.width1,
            width2: window.innerWidth,
        }
        state.result = lun.char8.day.stem.e5.name
        state.isLoading = false
    }, rndTime)
}

export default function C() {
    return (
        <div class='h-100vh g grid-rows-[1fr_auto] max-w600px mx-auto xbg-gray1 '>
            <div class='pt50px'>
                <div class='ml75px text-15px c-#ccc mb1' ondblclick={() => state.isShowLunli = !state.isShowLunli}>Birthday</div>
                {/* <div class='g aic grid-cols-[75px_auto_55px] mb50px relative'>
                    <Avatar />
                    <BirthtimeSelector />
                </div> */}
                <div class='g aic grid-cols-[75px_auto_55px] mb50px relative'>
                    <Avatar />
                    <BirthtimeSelector2 />
                </div>
                <div class='ml75px mr55px mb50px rounded h50px bg-main c-white hover:op80 focus:op90 cursor-pointer rcc' onclick={calc}>
                    <LoadingIcon />
                    <div class='text-17px'>Check Five Elements</div>
                </div>

                <Show when={state.isShowLunli}>
                    <pre>
                        {JSON.stringify(state.lunli, null, 2)}
                    </pre>
                </Show>

                <div class='rcc mb4 c-main text-24px '>{resultObj()?.text ?? ' '}</div>
                <div class='rcc mb4 c-#ccc text-13px '>Your element</div>
                {/* <div>{window.history.length}</div> */}
                <Show when={window.history.length>2} >
                    <div class='rcc mb4' onclick={()=>history.back()}>
                        <img src={arrowbackImg} class='w8px mr2' alt="" />
                        <div class='c-main op80 text-15px'>Click here back to previous page</div>
                    </div>
                </Show>

            </div>
            <img class={resultObj()?.img ? 'block' : 'hidden'} src={resultObj()?.img} alt="" />
            <Imgpreload />

        </div>
    )
}

function Avatar() {
    return (
        <div class='rcc relative h40px' onclick={onSelectGender}>
            {/* <select onchange={onSelectGender} class='bg-gray3 op.1 absolute left-0 right-0 top-0 bottom-0'>
                <option value="male">male</option>
                <option value="female">female</option>
            </select> */}
            <div class='xring relative pointer-events-none w40px h40px ccc'>
                <Show when={genderImg()} fallback={'gender?'}>
                    <img class='block w40px h40px' src={genderImg()} alt="" />
                    <div class='text-13px c-#ccc'>{state.gender}</div>
                </Show>
            </div>
        </div>
    )
}

// function BirthtimeSelector() {
//     return (
//         <div class='r aic relative b-b-1 b-b-main b-b-solid py4'>

//             <div class='r xbg-blue3 absolute left-0 right-0 top-0 bottom-0'>
//                 <For each={[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]} >
//                     {() => <input
//                         class='flex-auto xbg-gray3 op.1  hover:bg-none focus:bg-none active:bg-none outline-none border-0 appearance-none'
//                         type="datetime-local"
//                         value={state.birthTime}
//                         oninput={onSelectBirthtime}
//                     />}
//                 </For>
//             </div>
//             <input
//                 class='flex-auto xbg-red2 relative text-18px c-main pointer-events-none xop50 outline-none border-0 appearance-none px0 tracking-[1px]'
//                 type="text"
//                 placeholder="birthday and time?"
//                 value={state.birthTime}
//             />
//             {/* <img src={downImg} class='w14px absolute right-0' alt="" /> */}
//         </div>
//     )
// }


function BirthtimeSelector2() {
    let ref;

    return (
        <div class='r aic relative b-b-1 b-b-main b-b-solid py4' >
            <div class='tracking-[1px] rc' onclick={() => state.isShowDatetime = true}>
                <Show when={!state.birthTime} fallback={<div class='text-18px c-main'>{state.birthTime}</div>}>
                    <div class='c-[rgb(117,117,117)] text-18px'>birthday and time?</div>
                </Show>
            </div>
            <Show when={state.isShowDatetime} >
                <div class='absolute right-0 w0 h0 overflow-auto'>
                    <div class='absolute w0 h0 overflow-hidden'>
                       <ion-datetime-button datetime="datetime"></ion-datetime-button>
                    </div>
                    <ion-modal ref={ref => {
                        ref.isOpen = true

                        const enterAnimation = (baseEl) => {
                            const root = baseEl.shadowRoot;

                            const backdropAnimation = createAnimation()
                                .addElement(root.querySelector('ion-backdrop'))
                                .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

                            const wrapperAnimation = createAnimation()
                                .addElement(root.querySelector('.modal-wrapper'))
                                .keyframes([
                                    { offset: 0, opacity: '0', transform: 'scale(0)' },
                                    { offset: 1, opacity: '0.99', transform: 'scale(1)' },
                                ]);

                            return createAnimation()
                                .addElement(baseEl)
                                .easing('ease-out')
                                .duration(100)
                                .addAnimation([backdropAnimation, wrapperAnimation]);
                        };

                        const leaveAnimation = (baseEl) => enterAnimation(baseEl).direction('reverse');

                        ref.enterAnimation = enterAnimation;
                        ref.leaveAnimation = leaveAnimation;
                        ref.addEventListener('ionChange',e=>{
                            state.birthTime = e.detail.value
                        })

                        ref.addEventListener('didDismiss', () => {
                            state.isShowDatetime = false
                        })
                    }} >
                        <ion-datetime id="datetime" attr:show-default-buttons="true"></ion-datetime>
                    </ion-modal>
                </div>
            </Show>

            {/* <img src={downImg} class='w14px absolute right-0' alt="" /> */}
        </div >
    )
}
function LoadingIcon() {
    return (
        <Show when={state.isLoading} >
            <div class='w0 relative translate-x--30px'>
                <svg class='w16px xhidden ' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
            </div>
        </Show>
    )
}

function Imgpreload() {
    const state = createMutable({ isShow: false })
    onMount(() => {
        setTimeout(() => { state.isShow = true }, 1000)
    })
    return (
        <Show when={state.isShow} >
            <div class='w0 h0 overflow-hidden grid [&>*]:w50px '>
                <img src={maleImg} />
                <img src={femaleImg} />
                <img src={goldImg} />
                <img src={woodImg} />
                <img src={waterImg} />
                <img src={fireImg} />
                <img src={landImg} />
            </div>
        </Show>
    )
}