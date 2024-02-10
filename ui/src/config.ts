

type Config = {
    serverAddress: string;
}

const localConfig: Config = {
    serverAddress: 'http://localhost:1234'
}

const productionConfig: Config = {
    serverAddress: 'something else'
}


const config: Config = import.meta.env.MODE === 'development' ? localConfig : productionConfig

export default config;