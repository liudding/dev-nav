import React from "react"
import Label from "./label"
import Link from "./link"
import ChinaFlag from "./icons/china-flag"
import Apple from "./icons/apple"
import Windows from "./icons/windows"
import AppLogo from "./app-logo"

const Card = ({ card, className, ...props }) => {

    // let featuredImgFluid = card.logo_image.childImageSharp.fluid
    // const image = getImage(card.logo_image)

    // if (card.logo.indexOf('http')) {

    // }

    card.labels = [];
    if (card.free) {
        card.labels.push('免费')
    }



    if (card.win) {
        card.labels.push((<Windows size="12"></Windows>))
    }

    if (card.mac) {
        card.labels.push((<Apple size="12"></Apple>))
    }

    if (card.android) {
        card.labels.push('安卓')
    }

    if (card.ios) {
        card.labels.push('iOS')
    }

    if (card.web) {
        card.labels.push('Web')
    }

    return (<React.Fragment>
        <Link to={card.url} target="_blank" className={"relative block overflow-hidden flex flex-col items-center justify-between p-6 max-w-sm rounded-lg border antialiased border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer " + className}>
            <div className="relative block w-full">
                <div className="logo flex justify-between items-center relative">
                    <AppLogo url={card.logo} name={card.name}></AppLogo>

                    <div className="text-gray-500 text-sm">
                        {card.domestic ? <ChinaFlag></ChinaFlag> : ''}
                    </div>

                </div>

                <div className="mt-5 text-xl dark:text-white">
                    <strong>{card.name}</strong>
                </div>

                <div className="mt-4 flex items-center">{card.labels && card.labels.map((tag, index) => (
                    typeof tag === 'string' ? <Label key={index}>{tag}</Label> : <div className="flex items items-center justify-around" style={{ width: 20, height: 20 }} key={index}>{tag}</div>
                ))}</div>

                <div className="excerpt mt-4 text-xs text-gray-500 line-clamp-3 leading-normal" style={{ height: 54, maxHeight: 54 }}>{card.desc}</div>

            </div>
            <div className="w-full mt-5 flex justify-between items-center">
                {card.slug ? <Link to={card.slug} nested={true} className="text-sm p-1 px-6.5 border border-black rounded-2xl hover:bg-sky-700">介绍</Link> : <div></div>}
                {card.url && <Link to={card.url} nested={true} target="_blank" className="text-white bg-primary hover:bg-blue-500 font-medium rounded-full text-sm px-6 py-1.5 text-center dark:hover:bg-blue-500">直达</Link>}
            </div>

        </Link>

    </React.Fragment>)
}

export default Card