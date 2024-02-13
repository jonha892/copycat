import config from "../config";



type API = {
    spotlightURL: string;
    blobURL: string;
    gifURL: string;
}

const Api: API = {
    spotlightURL: `${config.serverAddress}/api/spotlights`,
    blobURL: `${config.serverAddress}/api/blobs/`,
    gifURL: `${config.serverAddress}/api/gifs/`
}

const fetcher = (url: string) =>
  fetch(url, { mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } })
    .then((res) => {
      console.log('received response: ', res)
      return res.json()
    })
    .catch((err) => {
      console.error(err)
      return err
    })

export default Api;
export { fetcher };
