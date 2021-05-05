export const handlePath = (urls) => {
    let pathnames = []
    urls.forEach(link => {
        const name = link.split("?")
        pathnames.push(name)
    });
    return pathnames;
}

export const handleExtension =(urls) =>{
    const paths = handlePaths(urls);

    paths.forEach
}


