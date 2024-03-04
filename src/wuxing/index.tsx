import { For, Show, onMount } from "solid-js"
import { createMutable } from "solid-js/store"
import maleImg from './assets/male@2x.png'
import femaleImg from './assets/female@2x.png'
import goldImg from './assets/gold.pic.jpg'
import woodImg from './assets/wood.pic.jpg'
import waterImg from './assets/water.pic.jpg'
import fireImg from './assets/fire.pic.jpg'
import landImg from './assets/land.pic.jpg'
import downImg from './assets/down@2x.png'



const state = createMutable({
    gender: '',
    birthday: '2020-01-30',
    birthTime: '',
    result: ''
})
const genderImg = () => ({
    male: maleImg,
    female: femaleImg,
})[state.gender]

const resultObj = () => ({
    '': { text: '', img: '' },
    'gold': { text: 'Metal', img: goldImg },
    'wood': { text: 'Wood', img: woodImg },
    'water': { text: 'Water', img: waterImg },
    'fire': { text: 'Fire', img: fireImg },
    'land': { text: 'Land', img: landImg },
})[state.result]

function onSelectGender(e) {
    state.gender = e.target.value
}
function onSelectBirthtime(e) {
    state.birthTime = e.target.value
}

function calc() {
    state.result = ['gold', 'wood', 'water', 'fire', 'land'][Math.floor(Math.random() * 5)]
}

export default function C() {
    return (
        <div class='h-100vh g grid-rows-[1fr_auto] max-w600px mx-auto xbg-gray1 pt30px'>
            <div class=''>
                <div class='ml75px text-15px c-#ccc xmb'>Birthday</div>
                <div class='g aic grid-cols-[75px_auto_75px] mb50px relative'>
                    <Avatar />
                    <BirthtimeSelector />
                </div>
                <div class='mx75px mb50px rounded h50px bg-main c-white hover:op80 focus:op90 cursor-pointer rcc' onclick={calc}>
                    Five Elements
                </div>

                <div class='rcc mb4 c-main text-24px '>{resultObj()?.text}</div>
                <div class='rcc mb4 c-#ccc text-13px '>Your element</div>
            </div>
            <img class={resultObj()?.img ? 'block' : 'hidden'} src={resultObj()?.img} alt="" />
            <Imgpreload />
        </div>
    )
}

function Avatar() {
    return (
        <div class='rcc relative h40px'>
            <select onchange={onSelectGender} class='bg-gray3 op.1 absolute left-0 right-0 top-0 bottom-0'>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>
            <div class='xring relative pointer-events-none w40px h40px rcc'>
                <Show when={genderImg()} fallback={'gender?'}>
                    <img class='block w40px h40px' src={genderImg()} alt="" />
                </Show>
            </div>
        </div>
    )
}

function BirthtimeSelector() {
    return (
        <div class='r aic relative b-b-1 b-b-main b-b-solid py4'>

            <div class='r xbg-blue3 absolute left-0 right-0 top-0 bottom-0'>
                <For each={[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]} >
                    {() => <input
                        class='flex-auto xbg-gray3 op.1  hover:bg-none focus:bg-none active:bg-none outline-none border-0 appearance-none'
                        type="datetime-local"
                        value={state.birthTime}
                        oninput={onSelectBirthtime}
                    />}
                </For>
            </div>
            <input
                class='flex-auto xbg-red2 relative text-18px c-main pointer-events-none xop50 outline-none border-0 appearance-none px0'
                type="text"
                placeholder="birthday and time?"
                value={state.birthTime}
            />
            <img src={downImg} class='w14px absolute right-0' alt="" />
        </div>
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