// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'

export default defineConfig({
    shortcuts: [
        // ...
        {
            'r': 'flex',                                 // 行 
            'c': 'flex flex-col',                        // 列 
            'g': 'grid',                                 // grid

            'rc': 'flex items-center',                          // 
            'rcc': 'flex items-center justify-center',          // 
            'cc': 'flex flex-col items-center',                 //
            'ccc': 'flex flex-col items-center justify-center', // 

            'jcs': 'justify-start',                      // justify-content: start
            'jcc': 'justify-center',                     // justify-content: center
            'jce': 'justify-end',                        // justify-content: end
            'jcb': 'justify-between',                   // justify-content: space-between
            'jca': 'justify-around',                    // justify-content: space-around

            'aic': 'items-center',                       // align-items: center
            'aie': 'items-end',                          // align-items: end

            'absfull': 'absolute top-0 left-0 right-0 bottom-0',               // 
            'fixfull': 'fixed top-0 left-0 right-0 bottom-0',                  //

        },
    ],
    theme: {
        colors: {
            // ...
            // main: 'rgb(74,168,157)',
            main: '#00A99D',
        }
    },
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
            fonts: {
                // ...
            },
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})