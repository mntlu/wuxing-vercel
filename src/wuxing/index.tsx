import { Show, onMount } from "solid-js"
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
import arrowbackImg from './assets/back@2x.png'
import BirthdaySelector from './birthday_selector'
import BirthtimeSelector from './birthtime_selector'

const state = createMutable({
    isLoading: false,
    gender: 'male',
    birthday: '',
    birthtime: '',
    lunli: {},
    result: '',
    isShowDbg: false,
    isShowDaySelector: false,
    isShowTimeSelector: false,
    width1: window.innerWidth,
})

const birthdate = () => state.birthday + 'T' + state.birthtime + ':00'

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

function calc() {
    if (!state.gender) {
        alert('please select gender')
        return
    }
    if (!state.birthday) {
        alert('please select birth day')
        return
    }
    if (!state.birthtime) {
        alert('please select birth time')
        return
    }
    state.isLoading = true
    state.result = ''
    const rndTime = 300 + Math.random() * 700
    setTimeout(() => {
        const lun = lunisolar(new Date(birthdate()))
        state.lunli = {
            luna: lun.lunar,
            char8: lun.char8.toString(),
            e5: lun.char8.day.stem.e5.name,
            width1: state.width1,
            width2: window.innerWidth,
            hislen: window.history.length,
        }
        state.result = lun.char8.day.stem.e5.name
        state.isLoading = false
    }, rndTime)
}
function toggleShowDbg() {
    state.isShowDbg = !state.isShowDbg
}

export default function C() {
    return (
        <div class='h-100vh g grid-rows-[1fr_auto] max-w600px mx-auto xbg-gray1 bg-white'>
            <div class='pt50px'>
                <div class='ml75px text-15px c-#ccc mb1' ondblclick={toggleShowDbg}>Birthday</div>
                <div class='g aic grid-cols-[75px_auto_55px] mb50px relative'>
                    <Avatar />
                    <BirthSelector />
                </div>
                <div class='ml75px mr55px mb50px rounded h50px bg-main c-white hover:op80 focus:op90 cursor-pointer rcc' onclick={calc}>
                    <LoadingIcon />
                    <div class='text-17px text-center'>Check Five Elements</div>
                </div>

                <Show when={state.isShowDbg}>
                    <pre>
                        {JSON.stringify(state.lunli, null, 2)}
                    </pre>
                </Show>

                <div class='rcc mb4 c-main text-24px '>{resultObj()?.text ?? ' '}</div>
                <div class='rcc mb4 c-#ccc text-13px '>Your element</div>
                <Show when={window.history.length > 1} >
                    <div class='rcc mb4' onclick={() => history.back()}>
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
            <div class='xring relative pointer-events-none w40px h40px ccc'>
                <Show when={genderImg()} fallback={'gender?'}>
                    <img class='block w40px h40px' src={genderImg()} alt="" />
                    <div class='text-13px c-#ccc'>{state.gender}</div>
                </Show>
            </div>
        </div>
    )
}


function BirthSelector() {

    const showBirthday = () => { state.isShowDaySelector = true }
    const showBirthtime = () => { state.isShowTimeSelector = true }

    const BirthdayPh = <div class='c-[rgb(117,117,117)] ' onclick={showBirthday}>birthday and time?</div>
    const BirthtimePh = <div class='c-[rgb(117,117,117)] ' onclick={showBirthtime}>birth time?</div>

    return (
        <div class='r aic relative b-b-1 b-b-main b-b-solid py4 text-18px c-main ' >
            <div class='tracking-[1px] rc'>
                <Show when={state.birthday} fallback={BirthdayPh}>
                    <>
                        <div class='mr2' onclick={showBirthday}>{state.birthday}</div>
                        <Show when={state.birthtime} fallback={BirthtimePh}>
                            <div onclick={showBirthtime}>{state.birthtime}</div>
                        </Show>
                    </>
                </Show>
            </div>
            <BirthdaySelector state={state} />
            <BirthtimeSelector state={state} />
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