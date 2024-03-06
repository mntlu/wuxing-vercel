import { Show } from "solid-js";

export default function BirthdaySelector({state}){
    let ref;
    return (
        <Show when={state.isShowDaySelector} >
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
                            state.birthday = e.detail.value.split('T')[0]
                        })
                        ref.addEventListener('didDismiss', () => {
                            state.isShowDaySelector = false
                        })
                        ref.addEventListener('ionModalWillPresent',()=>{
                            if(window.innerWidth<330){
                                document.querySelector('#datetime')?.shadowRoot.querySelectorAll('.datetime-header, .wheel-order-year-first, .datetime-footer').forEach(e => {
                                    // console.log(e)
                                    e.style.width = window.innerWidth + 'px'
                                })
                            }
                        })
                    }} >
                        <ion-datetime 
                        id="datetime" 
                        attr:show-default-buttons="true"
                        attr:presentation="date" 
                        attr:prefer-wheel="true"
                        >
                            {<span attr:slot="title">Choose birth day</span>}
                        </ion-datetime>
                    </ion-modal>
                </div>
            </Show>
    )
}