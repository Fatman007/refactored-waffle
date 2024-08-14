import { useTranslation } from "react-i18next"

export default function Locate({ data, keygen, lang })
{
    const {t} = useTranslation()

    return lang === 'en' ? data : t(keygen)
}
