import { Show, onMount } from "solid-js"
import { createMutable } from "solid-js/store"
import goldImg from './assets/gold.pic.jpg'
import woodImg from './assets/wood.pic.jpg'
import waterImg from './assets/water.pic.jpg'
import fireImg from './assets/fire.pic.jpg'
import landImg from './assets/land.pic.jpg'

export default function () {
    return (
        <div style={{'max-width': '600px', margin: '0 auto', background: '#ccc'}}>
            <div></div>
            <div>Five Elements</div>
            <div>imgs</div>
            <Imgpreload />
        </div>
    )
}


function Imgpreload() {
    const state = createMutable({
        isShow: false
    })
    onMount(() => {
        setTimeout(() => {
            state.isShow = true
        }, 5000)
    })
    return (
        <Show when={state.isShow} >
            <div>
                <div style={{
                    'display': 'grid',
                    'grid-auto-flow': 'column',
                }}>
                    <img src={goldImg} />
                    <img src={woodImg} />
                    <img src={waterImg} />
                    <img src={fireImg} />
                    <img src={landImg} />
                </div>
            </div>
        </Show>
    )
}