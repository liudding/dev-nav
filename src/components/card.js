import React from "react"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby';
import Img from "gatsby-image"
import Label from "./label"
import Link from "./link"


const Card = ({ card, ...props }) => {

    // let featuredImgFluid = card.logo_image.childImageSharp.fluid
    // const image = getImage(card.logo_image)

    // if (card.logo.indexOf('http')) {

    // }

    return (<React.Fragment>
        <div className="relative block p-6 max-w-sm bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer" style={{ width: 250 }}>
            <div className="logo flex justify-between items-center relative">
                {/* <Img fluid={featuredImgFluid} style={{ width: 40, height: 40 }} /> */}

                {
                    card.logo && card.logo.indexOf('http') >= 0 && <img src={card.logo} style={{ height: 40 }} />
                }

                {!card.logo && (<div style={{ width: 40, height: 40 }} className="flex flex-col justify-around items-center bg-gray-100 rounded-full text-center">
                    <div className="uppercase font-bold text-lg">{card.name.substring(0, 1)}</div>
                </div>
                )}

                <div className="text-gray-500 text-sm"></div>

            </div>

            <div className="mt-5 text-xl dark:text-white">
                <strong>{card.name}</strong>
            </div>

            <div className="mt-4 flex">{card.tags && card.tags.map((tag) => (
                <Label className="mr-1" key={tag}>{tag}</Label>
            ))}</div>

            <div className="excerpt mt-4 text-xs text-gray-500 line-clamp-3 leading-normal" style={{height: 54}}>{card.desc}</div>

            <div className="w-100 b-0 mt-5 flex justify-between items-center">
                {card.slug ? <Link to={card.slug} className="text-sm p-2 px-7 border border-black rounded-2xl hover:bg-sky-700">介绍</Link> : <div></div>}
                {card.url && <Link to={card.url} target="_blank" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-7 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">直达</Link>}
            </div>

        </div>

    </React.Fragment>)
}

export default Card