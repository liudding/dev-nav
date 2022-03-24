import React from "react"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby';
import Img from "gatsby-image"
import Label from "./label"
import Link from "./link"
import ChinaFlag from "./icons/china-flag"
import Apple from "./icons/apple"
import Windows from "./icons/windows"

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
        <div className={"relative block flex flex-col items-center justify-between p-6 max-w-sm rounded-lg border antialiased border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer " + className}>
            <div className="relative block w-full">
                <div className="logo flex justify-between items-center relative">
                    {/* <Img fluid={featuredImgFluid} style={{ width: 40, height: 40 }} /> */}

                    {
                        card.logo && (card.logo.startsWith('http') || card.logo.startsWith('/')) && <img src={card.logo} style={{ height: 40 }} />
                    }

                    {!card.logo && (<div style={{ width: 40, height: 40 }} className="flex flex-col justify-around items-center bg-gray-100 rounded-full text-center">
                        <div className="uppercase font-bold text-lg">{card.name.substring(0, 1)}</div>
                    </div>
                    )}

                    <div className="text-gray-500 text-sm">
                        {card.domestic && <ChinaFlag></ChinaFlag>}
                    </div>

                </div>

                <div className="mt-5 text-xl dark:text-white">
                    <strong>{card.name}</strong>
                </div>

                <div className="mt-4 flex items-center">{card.labels && card.labels.map((tag) => (
                    typeof tag === 'string' ? <Label key={tag}>{tag}</Label> : <div className="flex items items-center justify-around" style={{ width: 20, height: 20 }}>{tag}</div>
                ))}</div>

                <div className="excerpt mt-4 text-xs text-gray-500 line-clamp-3 leading-normal" style={{ height: 54, maxHeight: 54 }}>{card.desc}</div>

            </div>
            <div className="w-full mt-5 flex justify-between items-center">
                {card.slug ? <Link to={card.slug} className="text-sm p-2 px-7 border border-black rounded-2xl hover:bg-sky-700">介绍</Link> : <div></div>}
                {card.url && <Link to={card.url} target="_blank" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-7 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">直达</Link>}
            </div>

        </div>

    </React.Fragment>)
}

export default Card