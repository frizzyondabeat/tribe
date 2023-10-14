import React from 'react';

type LogoProps = {
    width?: number;
    height?: number;
}

const Logo = ({width=130, height=130, ...props}: LogoProps) => {
    return (
        // <Image src="logo.svg" alt={"logo"} width={width} height={height} {...props} />
        <h1 {...props}>tribe</h1>
    );
};

export default Logo;