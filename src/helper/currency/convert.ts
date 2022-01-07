export const formatCurrency = (value: any, locale: string) => {
    switch (locale) {
        case "vnd": {
            return Number(value).toLocaleString('it-IT', { style: 'currency', currency: 'vnd' })

        }
        default: {
            return Number(value).toLocaleString()
        }
    }
}
