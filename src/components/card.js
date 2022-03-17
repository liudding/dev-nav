import React from "react"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby';
import Img from "gatsby-image"
import Label from "./label"
import Link from "./link"


const Card = ({ card, ...props }) => {

    // let featuredImgFluid = card.logo_image.childImageSharp.fluid
    // const image = getImage(card.logo_image)

    return (<React.Fragment>
        <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer" style={{ width: 250 }}>
            <div className="logo flex justify-between items-center">
                {/* <Img fluid={featuredImgFluid} style={{ width: 40, height: 40 }} /> */}

                <div className="text-gray-500 text-sm">777</div>
            
            </div>

            <div className="mt-5 text-2xl">
                <strong>{card.name}</strong>
            </div>

            <div className="mt-4 flex">{card.tags && card.tags.map((tag) => (
                <Label className="mr-1" key={tag}>{tag}</Label>
            ))}</div>

            <div className="excerpt mt-4 text-xs text-gray-500 line-clamp-3">{card.excerpt}</div>

            <div className="mt-4 flex justify-between items-center">
               {card.slug ? <Link to={card.slug}  className="text-sm p-2 px-7 border border-black rounded-2xl hover:bg-sky-700">介绍</Link> : <div></div>}
               { card.url && <Link to={card.url} target="_blank" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">直达</Link>}
            </div>

        </div>

    </React.Fragment>)
}

export default Card