import React from "react"


const Label = ({ url, name, className }) => {
    if (url && url.startsWith('@appicons')) {
        url = url.replace('@appicons/', '/images/app-logos/')
    } else if (url && url.startsWith('@logos')) {
        url = url.replace('@logos/', '/images/app-logos/')
    }

    return (
        <div className="logo flex items-center relative dark:text-white">
            {/* <Img fluid={featuredImgFluid} style={{ width: 40, height: 40 }} /> */}

            {
                url && (url.startsWith('http') || url.startsWith('/')) && <img src={url} style={{ height: 40 }} alt={`${name} logo`} className="object-contain" />
            }

            {!url && (<div style={{ width: 40, height: 40 }} className="flex flex-col justify-around items-center bg-gray-100 rounded-full text-center object-contain">
                <div className="uppercase font-bold text-lg text-gray-700">{name && name.substring(0, 1)}</div>
            </div>
            )}
        </div>
    );
}

export default Label;