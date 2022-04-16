const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_ID, process.env.PINATA_KEY);

const metadata = (imgHash) => {
    return {
        name: "Lor",
        description: "Deserted wasteland",
        image: `https://gateway.pinata.cloud/ipfs/${imgHash}`,
        attributes: [
            {
                trait_type: "Size",
                value: "M"
            },
            {
                trait_type: "Color",
                value: "Red"
            },
            {
                trait_type: "Diameter",
                value: 6
            },
        ]
    }
}


pinata.testAuthentication().then(async (result) => {
    //handle successful authentication here
    console.log(result);
    // upload our image
    const file = await pinFile('./test.jpg')
    // if image uploaded successfully 
    if (file) {
        // upload metadata with file 
        await pinJson(metadata(file.IpfsHash))
    }
}).catch((err) => {
    //handle error here
    console.log(err);
});

const pinFile = (url) => {
    // const sourcePath = '/Users/me/builds/my-awesome-website/';
    return pinata.pinFromFS(url).then((result) => {
        //handle results here
        console.log(result);
        return result
    }).catch((err) => {
        //handle error here
        console.log(err);
        return undefined
    });
}
const pinJson = (jsn) => {
    return pinata.pinJSONToIPFS(jsn).then((result) => {
        //handle results here
        console.log(result);
        return result
    }).catch((err) => {
        //handle error here
        console.log(err);
        return undefined
    });
}