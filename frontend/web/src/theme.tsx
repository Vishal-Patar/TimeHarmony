import { createTheme } from '@mui/material/styles';
import { useTheme as useMUITheme, Theme as MUITheme } from '@mui/material/styles';
interface CustomPaletteOptions {
    sidebar:{
        background: string,
        text: string,
        icon: string,
        hoverBackground:  string,
        activeBackground: string,
        subIcon: string,
        subMenuActiveBackground: string
    },
    header:{
        background: string,
        text: string,
        icon: string
    },
}

interface CustomTheme extends MUITheme {
    customColor: CustomPaletteOptions;
}

export const colors = {
    darkBlue: '#1C4E80',
    coral: '#D32D41',
    lightGray: '#F1F1F1',
    darkGray: '#202020',
    accent1: '#7E909A',
    accent2: '#A5D8DD',
    highlight: '#0091D5',
    white: '#fff',
    grayBase: '#323a59',
    gray100: '#f3f4f7',
    gray200: '#e7eaee',
    gray300: '#dbdfe6',
    gray400: '#cfd4de',
    gray500: '#aab3c5',
    gray600: '#6d7d9c',
    gray700: '#4a566d',
    gray800: '#323a497d',
    gray850: '#323a49',
    gray900: '#212631',
    black: '#080a0c',

}

const theme = createTheme({
    palette: {
        primary: {
            main: colors.gray900,
        },
        secondary: {
            main: colors.coral,
        },
        background: {
            default: colors.lightGray,
        },
        text: {
            primary: colors.darkGray,
        },
    },
    typography:{
        h6:{
            color: colors.darkGray
        }
    },
    customColor: {
        sidebar:{
            background: colors.gray900,
            text: colors.gray200,
            icon: colors.gray500,
            hoverBackground: colors.gray800,
            activeBackground: colors.gray850,
            subIcon: colors.highlight,
            subMenuActiveBackground: colors.grayBase
        },
        header:{
            background: colors.white,
            text: colors.darkGray,
            icon: colors.gray900,
        },
    }
} as CustomTheme);

export const useTheme = () => useMUITheme() as CustomTheme;


export default theme;