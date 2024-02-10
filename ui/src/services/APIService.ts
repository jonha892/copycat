import config from "../config";
import { Spotlight } from "../models/spotlight";



type API = {
    spotlightURL: string;
}

const Api: API = {
    spotlightURL: `${config.serverAddress}/api/spotlights`
}

const fetcher = (url: string) =>
  fetch(url, { mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } })
    .then((res) => {
      console.log('received response: ', res)
      return res.json() as Promise<Spotlight[]>
    })
    .catch((err) => {
      console.error(err)
      return err
    })

export default Api;
export { fetcher };
