import { Show } from "solid-js";

export default function BirthtimeSelector({state}){
    
    let mRef;
    return (
        <>
        <Show when={state.isShowTimeSelector} >
                <div class='absolute right-0 w0 h0 overflow-auto'>
                    <div class='absolute w0 h0 overflow-hidden'>
                       <ion-datetime-button datetime="btime"></ion-datetime-button>
                    </div>
                    <ion-modal ref={ref => {
                        mRef = ref
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
                            state.birthtime = e.detail.value.split('T')[1].slice(0,-3)
                        })

                        ref.addEventListener('didDismiss', () => {
                            state.isShowTimeSelector = false
                            // hide()
                        })
                    }} >
                        <ion-datetime 
                            id="btime" 
                            attr:show-default-buttons="true"
                            attr:presentation="time" 
                            attr:prefer-wheel="true"
                            >
                            {<div attr:slot="title" class='rc jcb'>
                                <div class='mr-30px'>Birth time</div>
                                <div class='text-14px c-[#3880FF]' onclick={()=>{
                                    state.isShowTimeSelector = false
                                    state.birthtime = '--:--'
                                    mRef.dismiss()
                                }}>I don’t know</div>
                                </div>}
                        </ion-datetime>
                    </ion-modal>
                </div>
            </Show>
            </>
    )
}