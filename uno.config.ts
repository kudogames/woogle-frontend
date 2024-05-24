import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'
import transformerCompileClass from '@unocss/transformer-compile-class'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            collections: {
                svg: FileSystemIconLoader('./assets/svg'),
            },
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                exo: {
                    name: 'Exo',
                },
            },
        }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()],
    shortcuts: [
        ['wh-full', 'w-full h-full'],
        ['flex-center', 'flex justify-center items-center'],
    ],
    rules: [
        [
            'header-text-shadow',
            {
                'text-shadow': '#000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0',
            },
        ],
    ],
    theme: {
        breakpoints: {
            xs: '320px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            xxl: '1536px',
            xxxl: '1920px',
        },
        colors: {
            bg1: '#000',
            bg2: '#01074B',
            color1: '#194574',
            color2: '#f1f9ff',
            color3: '#ffffff',
            color4: '#ffd751',
            color5: '#aecdff',
            color6: '#d83e2d',
            color7: '#6a8ac0',
            color8: '#6ec7ff',
            color9: '#e86187',
        },
    },
})
