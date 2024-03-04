import { For, Show, onMount } from "solid-js"
import { createMutable } from "solid-js/store"
import maleImg from './assets/male@2x.png'
import femaleImg from './assets/female@2x.png'
import goldImg from './assets/gold.pic.jpg'
import woodImg from './assets/wood.pic.jpg'
import waterImg from './assets/water.pic.jpg'
import fireImg from './assets/fire.pic.jpg'
import landImg from './assets/land.pic.jpg'
// import downImg from './assets/down@2x.png'

const state = createMutable({
    isLoading: false,
    gender: 'male',
    birthTime: '',
    result: ''
})
const genderImg = () => ({
    male: maleImg,
    female: femaleImg,
})[state.gender]

const resultObj = () => ({
    '': { text: '', img: '' },
    '金': { text: 'Metal', img: goldImg },
    '木': { text: 'Wood', img: woodImg },
    '水': { text: 'Water', img: waterImg },
    '火': { text: 'Fire', img: fireImg },
    '土': { text: 'Land', img: landImg },
})[state.result]

function onSelectGender() {
    if (state.gender === 'male') {
        state.gender = 'female'
    } else {
        state.gender = 'male'
    }
}
function onSelectBirthtime(e: any) {
    state.birthTime = e.target.value
}

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

        var datetime = new Date(state.birthTime);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1; // 月份从0开始，需要加1
        var day = datetime.getDate();
        var hour = datetime.getHours();

        const { hourWuXing } = calculateWuXing(year, month, day, hour)
        console.log({ hourWuXing })
        state.result = hourWuXing

        state.isLoading = false
    }, rndTime)
}

function calculateWuXing(birthYear: number, birthMonth: number, birthDay: number, birthHour: number) {
    // // 十干
    // var gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    // // 十二支
    // var zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    // 五行属性
    var wuXing = ["木", "火", "土", "金", "水"];

    // 计算年份的五行属性
    var yearGanIndex = (birthYear - 4) % 10; // 计算年份对应的十干索引
    var yearZhiIndex = (birthYear - 4) % 12; // 计算年份对应的十二支索引
    var yearWuXingIndex = (yearGanIndex % 5) * 2 + (yearZhiIndex % 5) % 2; // 计算年份的五行属性索引
    var yearWuXing = wuXing[yearWuXingIndex]; // 获取年份的五行属性

    // 计算出生月份的五行属性
    var monthZhiIndex = (birthMonth - 1) % 12; // 计算月份对应的十二支索引
    var monthWuXingIndex = (yearGanIndex % 5) * 2 + (monthZhiIndex % 5) % 2; // 计算月份的五行属性索引
    var monthWuXing = wuXing[monthWuXingIndex]; // 获取月份的五行属性

    // 计算出生日期的五行属性
    var dayZhiIndex = (birthDay - 1) % 12; // 计算日期对应的十二支索引
    var dayWuXingIndex = (yearGanIndex % 5) * 2 + (dayZhiIndex % 5) % 2; // 计算日期的五行属性索引
    var dayWuXing = wuXing[dayWuXingIndex]; // 获取日期的五行属性

    // 计算出生时辰的五行属性
    var hourZhiIndex = (birthHour - 1) % 12; // 计算时辰对应的十二支索引
    var hourWuXingIndex = (yearGanIndex % 5) * 2 + (hourZhiIndex % 5) % 2; // 计算时辰的五行属性索引
    var hourWuXing = wuXing[hourWuXingIndex]; // 获取时辰的五行属性

    // 返回结果
    return {
        yearWuXing,
        monthWuXing,
        dayWuXing,
        hourWuXing,
    }
}

export default function C() {
    return (
        <div class='h-100vh g grid-rows-[1fr_auto] max-w600px mx-auto xbg-gray1 '>
            <div class='pt50px'>
                <div class='ml75px text-15px c-#ccc mb1'>Birthday</div>
                <div class='g aic grid-cols-[75px_auto_55px] mb50px relative'>
                    <Avatar />
                    <BirthtimeSelector />
                </div>
                <div class='ml75px mr55px mb50px rounded h50px bg-main c-white hover:op80 focus:op90 cursor-pointer rcc' onclick={calc}>
                    <LoadingIcon />
                    <div class='text-17px'>Check Five Elements</div>
                </div>

                <div class='rcc mb4 c-main text-24px '>{resultObj()?.text ?? ' '}</div>
                <div class='rcc mb4 c-#ccc text-13px '>Your element</div>
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
                class='flex-auto xbg-red2 relative text-18px c-main pointer-events-none xop50 outline-none border-0 appearance-none px0 tracking-[1px]'
                type="text"
                placeholder="birthday and time?"
                value={state.birthTime}
            />
            {/* <img src={downImg} class='w14px absolute right-0' alt="" /> */}
        </div>
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