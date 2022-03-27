import React from "react"


const Label = ({ url, name, className }) => {
    return (
        <div className="logo flex items-center relative">
            {/* <Img fluid={featuredImgFluid} style={{ width: 40, height: 40 }} /> */}

            {
                url && (url.startsWith('http') || url.startsWith('/')) && <img src={url} style={{ height: 40 }} alt={`${name} logo`} />
            }

            {!url && (<div style={{ width: 40, height: 40 }} className="flex flex-col justify-around items-center bg-gray-100 rounded-full text-center">
                <div className="uppercase font-bold text-lg">{name && name.substring(0, 1)}</div>
            </div>
            )}
        </div>
    );
}

export default Label;